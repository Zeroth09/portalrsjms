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
        requestBody: {
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
        requestBody: {
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

    // Create file metadata for upload
    const fileMetadata = {
      name: finalFilename,
      parents: [userFolderId],
      description: `Video TikTok upload dari ${metadata.usernameAkun} - ${new Date().toISOString()}`
    }

    // Initialize resumable upload session
    try {
      // Use simple upload approach for better compatibility
      const uploadResponse = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await auth.getAccessToken().then(token => token.token)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fileMetadata)
      })

      if (!uploadResponse.ok) {
        throw new Error(`Failed to initialize upload: ${uploadResponse.statusText}`)
      }

      const uploadUrl = uploadResponse.headers.get('location')
      if (!uploadUrl) {
        throw new Error('No upload URL received from Google Drive')
      }

      // Create placeholder file entry to get file ID
      const placeholderFile = await drive.files.create({
        requestBody: fileMetadata,
        fields: 'id, name, webViewLink'
      })

      console.log('✅ Upload URL generated successfully')

      return NextResponse.json({
        success: true,
        uploadUrl: uploadUrl,
        fileId: placeholderFile.data.id,
        filename: finalFilename
      })

    } catch (uploadError) {
      console.error('❌ Error creating upload session:', uploadError)
      
      // Fallback: create file entry without upload URL (for now)
      const fileResponse = await drive.files.create({
        requestBody: fileMetadata,
        fields: 'id, name, webViewLink'
      })

      return NextResponse.json({
        success: true,
        uploadUrl: '', // Will need to implement alternative approach
        fileId: fileResponse.data.id,
        filename: finalFilename,
        fallback: true
      })
    }

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