import { NextRequest, NextResponse } from 'next/server'
import { googleDriveService, UploadVideoData } from '../../../lib/googleDrive'

// Next.js 14 App Router route segment config
export const runtime = 'nodejs'
export const maxDuration = 300 // 5 minutes timeout for Vercel Pro
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

    // Parse form data with better error handling for large files
    let formData: FormData
    try {
      // Set a reasonable timeout for form parsing
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Form parsing timeout')), 60000) // 1 minute
      })
      
      const formDataPromise = request.formData()
      formData = await Promise.race([formDataPromise, timeoutPromise]) as FormData
      console.log('📝 Form data parsed successfully')
    } catch (error) {
      console.error('❌ Error parsing form data:', error)
      if (error instanceof Error && error.message.includes('timeout')) {
        return NextResponse.json(
          { success: false, error: 'Upload timeout. File mungkin terlalu besar atau koneksi lambat.' },
          { status: 408 }
        )
      }
      return NextResponse.json(
        { success: false, error: 'File terlalu besar atau format tidak valid. Maksimal 100MB.' },
        { status: 413 }
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
        { success: false, error: 'Invalid file type. Only MP4, MOV, and AVI files are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 100MB but recommend smaller)
    const maxSize = 100 * 1024 * 1024 // 100MB in bytes
    const recommendedSize = 50 * 1024 * 1024 // 50MB recommended
    
    if (file.size > maxSize) {
      console.error(`❌ File too large: ${file.size} bytes`)
      return NextResponse.json(
        { success: false, error: 'File size too large. Maximum size is 100MB.' },
        { status: 413 }
      )
    }

    if (file.size > recommendedSize) {
      console.warn(`⚠️ Large file detected: ${file.size} bytes. Upload may take longer.`)
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
      console.error('Fields:', { usernameAkun: !!usernameAkun, teleponPenanggungJawab: !!teleponPenanggungJawab, linkTikTok: !!linkTikTok, buktiFollow: !!buktiFollow })
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Convert file to buffer with better error handling
    console.log('🔄 Converting file to buffer...')
    let buffer: Buffer
    try {
      const bytes = await file.arrayBuffer()
      buffer = Buffer.from(bytes)
      console.log(`✅ Buffer created: ${buffer.length} bytes`)
    } catch (error) {
      console.error('❌ Error converting file to buffer:', error)
      return NextResponse.json(
        { success: false, error: 'Error processing file. Please try again.' },
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
    // Upload to Google Drive with timeout
    const uploadPromise = googleDriveService.uploadVideo(uploadData)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Google Drive upload timeout')), 240000) // 4 minutes
    })
    
    const uploadResult = await Promise.race([uploadPromise, timeoutPromise]) as any

    if (uploadResult.success) {
      console.log('✅ Upload successful:', uploadResult.fileId)
      return NextResponse.json({
        success: true,
        message: 'Video berhasil diupload ke Google Drive',
        data: {
          fileId: uploadResult.fileId,
          fileName: uploadResult.fileName,
          webViewLink: uploadResult.webViewLink
        }
      })
    } else {
      console.error('❌ Upload failed:', uploadResult.error)
      return NextResponse.json(
        { success: false, error: uploadResult.error || 'Upload failed' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Error in upload-video API:', error)
    
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      
      // Handle specific timeout errors
      if (error.message.includes('timeout')) {
        return NextResponse.json(
          { success: false, error: 'Upload timeout. Silakan coba lagi dengan file yang lebih kecil.' },
          { status: 408 }
        )
      }
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
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
    },
  })
} 