import { NextRequest, NextResponse } from 'next/server'
import { googleDriveService, UploadVideoData } from '../../../lib/googleDrive'

// Next.js 14 App Router route segment config - optimize for Vercel Hobby
export const runtime = 'nodejs'
export const maxDuration = 60 // Reduce to 1 minute for Hobby plan
export const preferredRegion = 'auto'

export async function POST(request: NextRequest) {
  try {
    console.log('🎬 Upload video API called')
    
    // Check if Google Drive is properly configured
    if (!process.env.GOOGLE_DRIVE_FOLDER_ID) {
      console.error('❌ GOOGLE_DRIVE_FOLDER_ID not configured')
      return NextResponse.json(
        { success: false, error: 'Google Drive not configured' },
        { status: 500 }
      )
    }

    // Get content length to check size early
    const contentLength = request.headers.get('content-length')
    if (contentLength) {
      const size = parseInt(contentLength)
      console.log(`📏 Content-Length: ${size} bytes`)
      
      // Strict size limit for Vercel Hobby plan
      const maxSize = 25 * 1024 * 1024 // 25MB for Hobby plan
      if (size > maxSize) {
        console.error(`❌ Request too large: ${size} bytes`)
        return NextResponse.json(
          { success: false, error: 'File terlalu besar. Maksimal 25MB untuk upload yang stabil.' },
          { status: 413 }
        )
      }
    }

    // Parse form data with strict timeout
    let formData: FormData
    try {
      // Shorter timeout for Hobby plan
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 seconds
      
      try {
        formData = await request.formData()
        clearTimeout(timeoutId)
        console.log('📝 Form data parsed successfully')
      } catch (parseError) {
        clearTimeout(timeoutId)
        throw parseError
      }
    } catch (error) {
      console.error('❌ Error parsing form data:', error)
      
      if (error instanceof Error) {
        if (error.name === 'AbortError' || error.message.includes('timeout')) {
          return NextResponse.json(
            { success: false, error: 'Upload timeout. Silakan coba dengan file yang lebih kecil (max 25MB).' },
            { status: 408 }
          )
        }
        
        if (error.message.includes('PayloadTooLargeError') || error.message.includes('413')) {
          return NextResponse.json(
            { success: false, error: 'File terlalu besar. Maksimal 25MB.' },
            { status: 413 }
          )
        }
      }
      
      return NextResponse.json(
        { success: false, error: 'Error memproses file. Silakan coba lagi dengan file yang lebih kecil.' },
        { status: 400 }
      )
    }
    
    // Get file from form data
    const file = formData.get('video') as File
    if (!file) {
      console.error('❌ No video file provided')
      return NextResponse.json(
        { success: false, error: 'No video file provided' },
        { status: 400 }
      )
    }

    console.log(`📄 File info: ${file.name} (${file.size} bytes, ${file.type})`)

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime']
    if (!allowedTypes.includes(file.type)) {
      console.error(`❌ Invalid file type: ${file.type}`)
      return NextResponse.json(
        { success: false, error: 'Hanya file video MP4, MOV, atau AVI yang diperbolehkan.' },
        { status: 400 }
      )
    }

    // Strict file size validation for better stability
    const maxFileSize = 25 * 1024 * 1024 // 25MB strict limit
    const warningSize = 15 * 1024 * 1024 // 15MB warning
    
    if (file.size > maxFileSize) {
      console.error(`❌ File too large: ${file.size} bytes`)
      return NextResponse.json(
        { 
          success: false, 
          error: `File terlalu besar (${Math.round(file.size / 1024 / 1024)}MB). Maksimal 25MB untuk upload yang stabil.` 
        },
        { status: 413 }
      )
    }

    if (file.size > warningSize) {
      console.warn(`⚠️ Large file detected: ${Math.round(file.size / 1024 / 1024)}MB. Processing with care...`)
    }

    // Get metadata from form
    const usernameAkun = formData.get('usernameAkun') as string
    const asalInstansi = formData.get('asalInstansi') as string || ''
    const teleponPenanggungJawab = formData.get('teleponPenanggungJawab') as string
    const linkTikTok = formData.get('linkTikTok') as string
    const buktiFollow = formData.get('buktiFollow') as string

    console.log(`👤 Upload by: ${usernameAkun}`)

    // Validate required fields
    if (!usernameAkun || !teleponPenanggungJawab || !linkTikTok || !buktiFollow) {
      console.error('❌ Missing required fields')
      return NextResponse.json(
        { success: false, error: 'Semua field wajib diisi' },
        { status: 400 }
      )
    }

    // Convert file to buffer with progress tracking
    console.log('🔄 Converting file to buffer...')
    let buffer: Buffer
    try {
      const bytes = await file.arrayBuffer()
      buffer = Buffer.from(bytes)
      console.log(`✅ Buffer created: ${Math.round(buffer.length / 1024 / 1024)}MB`)
    } catch (error) {
      console.error('❌ Error converting file to buffer:', error)
      return NextResponse.json(
        { success: false, error: 'Error memproses file. File mungkin corrupt atau terlalu besar.' },
        { status: 500 }
      )
    }

    // Prepare upload data
    const uploadData: UploadVideoData = {
      file: buffer,
      filename: file.name,
      mimeType: file.type,
      username: usernameAkun,
      jenisLomba: 'Video TikTok',
      metadata: {
        usernameAkun,
        asalInstansi,
        teleponPenanggungJawab,
        linkTikTok,
        tanggalUpload: new Date().toISOString()
      }
    }

    console.log('🚀 Starting Google Drive upload...')
    
    // Upload to Google Drive with shorter timeout for Hobby plan
    const uploadPromise = googleDriveService.uploadVideo(uploadData)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Google Drive upload timeout')), 45000) // 45 seconds
    })
    
    const uploadResult = await Promise.race([uploadPromise, timeoutPromise]) as any

    if (uploadResult && uploadResult.success) {
      console.log('✅ Upload successful:', uploadResult.fileId)
      return NextResponse.json({
        success: true,
        message: '🎉 Video berhasil diupload ke Google Drive!',
        data: {
          fileId: uploadResult.fileId,
          fileName: uploadResult.fileName,
          webViewLink: uploadResult.webViewLink
        }
      }, { status: 200 })
    } else {
      console.error('❌ Upload failed:', uploadResult?.error)
      return NextResponse.json(
        { 
          success: false, 
          error: uploadResult?.error || 'Upload ke Google Drive gagal. Silakan coba lagi.' 
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Critical error in upload-video API:', error)
    
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      
      // Handle specific error types
      if (error.message.includes('timeout') || error.message.includes('TimeoutError')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Upload timeout. Coba gunakan file yang lebih kecil atau koneksi yang lebih stabil.' 
          },
          { status: 408 }
        )
      }
      
      if (error.message.includes('413') || error.message.includes('PayloadTooLarge')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'File terlalu besar untuk diproses. Maksimal 25MB.' 
          },
          { status: 413 }
        )
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Terjadi kesalahan server. Silakan coba lagi nanti.' 
      },
      { status: 500 }
    )
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
} 