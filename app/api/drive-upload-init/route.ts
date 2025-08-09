import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Initializing Google Drive upload...')
    
    // Check environment variables
    if (!process.env.GOOGLE_DRIVE_FOLDER_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error('❌ Missing Google Drive environment variables')
      return NextResponse.json(
        { success: false, error: 'Google Drive not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { filename, mimeType, fileSize, metadata } = body

    if (!filename || !mimeType || !fileSize) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    console.log(`📄 File: ${filename} (${Math.round(fileSize / 1024 / 1024)}MB)`)

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

    // Get main folder ID
    const mainFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID

    // Create/get competition folder
    const competitionFolderName = `Video TikTok - ${new Date().getFullYear()}`
    
    const competitionFolderQuery = `name='${competitionFolderName}' and parents in '${mainFolderId}' and mimeType='application/vnd.google-apps.folder' and trashed=false`
    const competitionFolderResponse = await drive.files.list({
      q: competitionFolderQuery,
      fields: 'files(id, name)'
    })

    let competitionFolderId: string
    if (competitionFolderResponse.data.files && competitionFolderResponse.data.files.length > 0) {
      competitionFolderId = competitionFolderResponse.data.files[0].id!
      console.log(`✅ Competition folder exists: ${competitionFolderId}`)
    } else {
      const newCompetitionFolder = await drive.files.create({
        resource: {
          name: competitionFolderName,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [mainFolderId]
        },
        fields: 'id'
      })
      competitionFolderId = newCompetitionFolder.data.id!
      console.log(`✅ Competition folder created: ${competitionFolderId}`)
    }

    // Create/get user folder
    const userFolderName = `${metadata.usernameAkun}_${new Date().toISOString().split('T')[0]}`
    
    const userFolderQuery = `name='${userFolderName}' and parents in '${competitionFolderId}' and mimeType='application/vnd.google-apps.folder' and trashed=false`
    const userFolderResponse = await drive.files.list({
      q: userFolderQuery,
      fields: 'files(id, name)'
    })

    let userFolderId: string
    if (userFolderResponse.data.files && userFolderResponse.data.files.length > 0) {
      userFolderId = userFolderResponse.data.files[0].id!
      console.log(`✅ User folder exists: ${userFolderId}`)
    } else {
      const newUserFolder = await drive.files.create({
        resource: {
          name: userFolderName,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [competitionFolderId]
        },
        fields: 'id'
      })
      userFolderId = newUserFolder.data.id!
      console.log(`✅ User folder created: ${userFolderId}`)
    }

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const cleanFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
    const finalFilename = `${metadata.usernameAkun}_${timestamp}_${cleanFilename}`

    // Create file metadata
    const fileMetadata = {
      name: finalFilename,
      parents: [userFolderId],
      description: `Video TikTok upload dari ${metadata.usernameAkun} - ${new Date().toISOString()}`
    }

    // Create file entry in Google Drive (without content)
    const fileResponse = await drive.files.create({
      resource: fileMetadata,
      fields: 'id, name, webViewLink'
    })

    const fileId = fileResponse.data.id!
    console.log(`✅ File entry created: ${fileId}`)

    // Generate resumable upload URL
    const uploadResponse = await drive.files.create({
      resource: fileMetadata,
      media: {
        mimeType: mimeType,
        body: '' // Empty body for getting upload URL
      },
      uploadType: 'resumable',
      fields: 'id, name, webViewLink'
    })

    // Get the upload URL from the location header
    const uploadUrl = uploadResponse.config?.headers?.['location'] || uploadResponse.headers?.['location']

    if (!uploadUrl) {
      console.error('❌ Failed to get upload URL')
      return NextResponse.json(
        { success: false, error: 'Failed to initialize upload' },
        { status: 500 }
      )
    }

    console.log('✅ Upload URL generated successfully')

    return NextResponse.json({
      success: true,
      uploadUrl: uploadUrl,
      fileId: fileId,
      filename: finalFilename
    })

  } catch (error) {
    console.error('❌ Error initializing upload:', error)
    
    let errorMessage = 'Failed to initialize upload'
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