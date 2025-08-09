import { NextRequest, NextResponse } from 'next/server'
import { googleDriveService, UploadVideoData } from '../../../lib/googleDrive'

export async function POST(request: NextRequest) {
  try {
    // Check if Google Drive is properly configured
    if (!process.env.GOOGLE_DRIVE_FOLDER_ID) {
      return NextResponse.json(
        { success: false, error: 'Google Drive not configured' },
        { status: 500 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    
    // Get file from form data
    const file = formData.get('video') as File
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No video file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only MP4, MOV, and AVI files are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 100MB)
    const maxSize = 100 * 1024 * 1024 // 100MB in bytes
    if (file.size > maxSize) {
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

    // Validate required fields
    if (!usernameAkun || !teleponPenanggungJawab || !linkTikTok || !buktiFollow) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

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

    // Upload to Google Drive
    const uploadResult = await googleDriveService.uploadVideo(uploadData)

    if (uploadResult.success) {
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
      return NextResponse.json(
        { success: false, error: uploadResult.error || 'Upload failed' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Error in upload-video API:', error)
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