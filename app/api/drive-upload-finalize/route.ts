import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(request: NextRequest) {
  try {
    console.log('🏁 Finalizing Google Drive upload...')
    
    // Check environment variables
    if (!process.env.GOOGLE_DRIVE_FOLDER_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error('❌ Missing Google Drive environment variables')
      return NextResponse.json(
        { success: false, error: 'Google Drive not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { fileId, metadata } = body

    if (!fileId || !metadata) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    console.log(`📄 Finalizing file: ${fileId}`)

    // Initialize Google Drive API
    let privateKey = process.env.GOOGLE_PRIVATE_KEY
    privateKey = privateKey.replace(/\\n/g, '\n')
    
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      undefined,
      privateKey,
      ['https://www.googleapis.com/auth/drive.file']
    )

    const drive = google.drive({ version: 'v3', auth })

    // Get file info
    const fileResponse = await drive.files.get({
      fileId: fileId,
      fields: 'id, name, size, mimeType, createdTime, webViewLink, parents'
    })

    const fileInfo = fileResponse.data
    console.log(`✅ File info retrieved: ${fileInfo.name} (${Math.round(parseInt(fileInfo.size || '0') / 1024 / 1024)}MB)`)

    // Create metadata file in the same folder
    const metadataContent = JSON.stringify({
      ...metadata,
      fileId: fileInfo.id,
      fileName: fileInfo.name,
      fileSize: fileInfo.size,
      uploadTime: new Date().toISOString(),
      webViewLink: fileInfo.webViewLink
    }, null, 2)

    const metadataFilename = `${metadata.usernameAkun}_${new Date().toISOString().replace(/[:.]/g, '-')}_metadata.json`
    
    // Fix TypeScript error by using proper requestBody structure
    const metadataFileResponse = await drive.files.create({
      requestBody: {
        name: metadataFilename,
        parents: fileInfo.parents || []
      },
      media: {
        mimeType: 'application/json',
        body: metadataContent
      },
      fields: 'id, name'
    })

    console.log(`✅ Metadata file created: ${metadataFileResponse.data.id}`)

    return NextResponse.json({
      success: true,
      fileId: fileInfo.id,
      fileName: fileInfo.name,
      fileSize: fileInfo.size,
      webViewLink: fileInfo.webViewLink,
      metadataFileId: metadataFileResponse.data.id
    })

  } catch (error) {
    console.error('❌ Error finalizing upload:', error)
    
    let errorMessage = 'Failed to finalize upload'
    if (error instanceof Error) {
      errorMessage = error.message
      console.error('Error details:', error.stack)
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
} 