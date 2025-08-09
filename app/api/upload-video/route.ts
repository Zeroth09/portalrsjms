import { NextRequest, NextResponse } from 'next/server'
import { googleDriveService, UploadVideoData } from '../../../lib/googleDrive'

// Next.js 14 App Router route segment config - increase limits for 100MB support
export const runtime = 'nodejs'
export const maxDuration = 300 // Increase to 5 minutes for larger files
export const preferredRegion = 'auto'

export async function POST(request: NextRequest) {
  try {
    console.log('🎬 Upload video API called')
    console.log('📋 Request URL:', request.url)
    console.log('📋 Request method:', request.method)
    
    // Check if Google Drive is properly configured
    if (!process.env.GOOGLE_DRIVE_FOLDER_ID) {
      console.error('❌ GOOGLE_DRIVE_FOLDER_ID not configured')
      return NextResponse.json(
        { success: false, error: 'Google Drive not configured' },
        { status: 500 }
      )
    }

    // Get content type to determine upload method
    const contentType = request.headers.get('content-type') || ''
    console.log(`📋 Content-Type: ${contentType}`)

    let videoData: Buffer
    let filename: string
    let mimeType: string
    let usernameAkun: string
    let asalInstansi: string = ''
    let teleponPenanggungJawab: string
    let linkTikTok: string
    let buktiFollow: string

    try {
      if (contentType.includes('application/json')) {
        // Handle Base64 upload method
        console.log('📄 Processing Base64 upload...')
        
        const body = await request.json()
        console.log('📝 JSON body parsed successfully')
        
        // Validate required fields
        const requiredFields = ['videoBase64', 'filename', 'mimeType', 'usernameAkun', 'teleponPenanggungJawab', 'linkTikTok', 'buktiFollow']
        for (const field of requiredFields) {
          if (!body[field]) {
            console.error(`❌ Missing field: ${field}`)
            return NextResponse.json(
              { success: false, error: `Field ${field} wajib diisi` },
              { status: 400 }
            )
          }
        }

        // Extract data from JSON body
        filename = body.filename
        mimeType = body.mimeType
        usernameAkun = body.usernameAkun
        asalInstansi = body.asalInstansi || ''
        teleponPenanggungJawab = body.teleponPenanggungJawab
        linkTikTok = body.linkTikTok
        buktiFollow = body.buktiFollow

        // Decode Base64 video data
        try {
          const base64Data = body.videoBase64.replace(/^data:video\/[a-z]+;base64,/, '')
          videoData = Buffer.from(base64Data, 'base64')
          console.log(`✅ Base64 decoded: ${Math.round(videoData.length / 1024 / 1024)}MB`)
        } catch (decodeError) {
          console.error('❌ Error decoding Base64:', decodeError)
          return NextResponse.json(
            { success: false, error: 'Error memproses data video. Format Base64 tidak valid.' },
            { status: 400 }
          )
        }

      } else if (contentType.includes('multipart/form-data')) {
        // Handle traditional FormData upload (fallback)
        console.log('📄 Processing FormData upload...')
        
        const formData = await request.formData()
        console.log('📝 FormData parsed successfully')
        console.log('📝 FormData keys:', Array.from(formData.keys()))
        
        // Get file from form data
        const file = formData.get('video') as File
        if (!file) {
          console.error('❌ No video file found in FormData')
          return NextResponse.json(
            { success: false, error: 'No video file provided' },
            { status: 400 }
          )
        }

        console.log('📁 File received:', file.name, 'Size:', file.size)

        // Extract metadata
        const metadataString = formData.get('metadata') as string
        console.log('📝 Raw metadata string:', metadataString ? metadataString.substring(0, 100) + '...' : 'null')
        
        let metadata: any = {}
        
        if (metadataString) {
          try {
            metadata = JSON.parse(metadataString)
            console.log('📝 Metadata parsed successfully:', Object.keys(metadata))
          } catch (error) {
            console.error('❌ Error parsing metadata JSON:', error)
            console.error('❌ Metadata string was:', metadataString)
            return NextResponse.json(
              { success: false, error: 'Metadata tidak valid' },
              { status: 400 }
            )
          }
        }

        filename = file.name
        mimeType = file.type
        usernameAkun = metadata.usernameAkun || formData.get('usernameAkun') as string
        asalInstansi = metadata.asalInstansi || formData.get('asalInstansi') as string || ''
        teleponPenanggungJawab = metadata.teleponPenanggungJawab || formData.get('teleponPenanggungJawab') as string
        linkTikTok = metadata.linkTikTok || formData.get('linkTikTok') as string || ''
        buktiFollow = metadata.buktiFollow || formData.get('buktiFollow') as string || ''

        console.log('👤 Extracted data:', {
          filename,
          mimeType,
          usernameAkun,
          asalInstansi,
          teleponPenanggungJawab
        })

        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        videoData = Buffer.from(bytes)
        console.log(`✅ FormData processed: ${Math.round(videoData.length / 1024 / 1024)}MB`)

      } else {
        return NextResponse.json(
          { success: false, error: 'Unsupported content type. Use JSON with Base64 or FormData.' },
          { status: 400 }
        )
      }

    } catch (parseError) {
      console.error('❌ Error parsing request:', parseError)
      
      if (parseError instanceof Error) {
        if (parseError.message.includes('PayloadTooLargeError') || 
            parseError.message.includes('413') ||
            parseError.message.includes('Request entity too large')) {
          return NextResponse.json(
            { success: false, error: 'File terlalu besar. Maksimal 100MB untuk upload.' },
            { status: 413 }
          )
        }
      }
      
      return NextResponse.json(
        { success: false, error: 'Error memproses request. Silakan coba lagi.' },
        { status: 400 }
      )
    }

    console.log(`👤 Upload by: ${usernameAkun}`)

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime']
    if (!allowedTypes.includes(mimeType)) {
      console.error(`❌ Invalid file type: ${mimeType}`)
      return NextResponse.json(
        { success: false, error: 'Hanya file video MP4, MOV, atau AVI yang diperbolehkan.' },
        { status: 400 }
      )
    }

    // Update file size validation to 100MB
    const maxFileSize = 100 * 1024 * 1024 // 100MB as requested
    const warningSize = 50 * 1024 * 1024 // 50MB warning
    
    if (videoData.length > maxFileSize) {
      console.error(`❌ File too large: ${videoData.length} bytes`)
      return NextResponse.json(
        { 
          success: false, 
          error: `File terlalu besar (${Math.round(videoData.length / 1024 / 1024)}MB). Maksimal 100MB.` 
        },
        { status: 413 }
      )
    }

    if (videoData.length > warningSize) {
      console.warn(`⚠️ Large file detected: ${Math.round(videoData.length / 1024 / 1024)}MB. Processing with care...`)
    }

    // Validate required metadata fields - only require basic info for upload
    if (!usernameAkun || !teleponPenanggungJawab) {
      console.error('❌ Missing required metadata fields')
      return NextResponse.json(
        { success: false, error: 'Username dan nomor telepon wajib diisi' },
        { status: 400 }
      )
    }

    // Prepare upload data
    const uploadData: UploadVideoData = {
      file: videoData,
      filename: filename,
      mimeType: mimeType,
      username: usernameAkun,
      jenisLomba: 'Video TikTok',
      metadata: {
        usernameAkun,
        asalInstansi: asalInstansi || '',
        teleponPenanggungJawab,
        linkTikTok: linkTikTok || '',
        buktiFollow: buktiFollow || '',
        tanggalUpload: new Date().toISOString()
      }
    }

    console.log('🚀 Starting Google Drive upload...')
    
    // Upload to Google Drive with longer timeout for large files
    const uploadPromise = googleDriveService.uploadVideo(uploadData)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Google Drive upload timeout')), 240000) // 4 minutes for large files
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
      
      if (error.message.includes('timeout') || error.message.includes('TimeoutError')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Upload timeout. File mungkin terlalu besar atau koneksi lambat.' 
          },
          { status: 408 }
        )
      }
      
      if (error.message.includes('413') || error.message.includes('PayloadTooLarge')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'File terlalu besar untuk diproses. Maksimal 100MB.' 
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