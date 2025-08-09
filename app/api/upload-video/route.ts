import { NextRequest, NextResponse } from 'next/server'
import { googleDriveService, UploadVideoData } from '../../../lib/googleDrive'

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

    // Parse form data
    const formData = await request.formData()
    console.log('📝 Form data parsed')
    
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

    // Validate file size (max 100MB)
    const maxSize = 100 * 1024 * 1024 // 100MB in bytes
    if (file.size > maxSize) {
      console.error(`❌ File too large: ${file.size} bytes`)
      return NextResponse.json(
        { success: false, error: 'File size too large. Maximum size is 100MB.' },
        { status: 400 }
      )
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

    // Convert file to buffer
    console.log('🔄 Converting file to buffer...')
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log(`✅ Buffer created: ${buffer.length} bytes`)

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
    // Upload to Google Drive
    const uploadResult = await googleDriveService.uploadVideo(uploadData)

    if (uploadResult.success) {
      console.log('✅ Upload successful:', uploadResult.fileId)
      return NextResponse.json({
        success: true,
        message: 'Video uploaded successfully',
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
      console.error('Stack trace:', error.stack)
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