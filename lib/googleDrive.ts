import { google } from 'googleapis';

// Interface untuk file upload
export interface UploadVideoData {
  file: Buffer
  filename: string
  mimeType: string
  username: string
  jenisLomba: string
  metadata: {
    usernameAkun: string
    asalInstansi?: string
    teleponPenanggungJawab: string
    linkTikTok: string
    tanggalUpload: string
  }
}

// Interface untuk response upload
export interface UploadResponse {
  success: boolean
  fileId?: string
  fileName?: string
  error?: string
  webViewLink?: string
}

class GoogleDriveService {
  private drive: any
  private auth: any

  constructor() {
    this.initializeAuth()
  }

  private initializeAuth() {
    try {
      console.log('=== Google Drive Auth Debug ===')
      
      // Check for required environment variables
      const requiredEnvVars = [
        'GOOGLE_SERVICE_ACCOUNT_EMAIL',
        'GOOGLE_PRIVATE_KEY',
        'GOOGLE_DRIVE_FOLDER_ID'
      ]

      for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
          console.error(`❌ Missing required environment variable: ${envVar}`)
          return
        } else {
          console.log(`✅ ${envVar}: Available`)
        }
      }

      // Clean and format private key
      let privateKey = process.env.GOOGLE_PRIVATE_KEY!
      console.log('🔧 Cleaning private key...')
      
      // Remove quotes and normalize line breaks
      privateKey = privateKey.replace(/^"|"$/g, '') // Remove surrounding quotes
      privateKey = privateKey.replace(/\\n/g, '\n')
      privateKey = privateKey.replace(/\\r/g, '\r')
      privateKey = privateKey.replace(/\\t/g, '\t')
      
      // Ensure proper format
      if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
        console.log('🔧 Adding private key headers...')
        privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`
      }

      // Validate private key format
      if (!privateKey.includes('-----BEGIN PRIVATE KEY-----') || !privateKey.includes('-----END PRIVATE KEY-----')) {
        console.error('❌ Invalid private key format')
        return
      }

      console.log('✅ Private key format validated')
      console.log('📧 Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
      console.log('📁 Drive Folder ID:', process.env.GOOGLE_DRIVE_FOLDER_ID)

      // Initialize JWT auth
      this.auth = new google.auth.JWT(
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        undefined,
        privateKey,
        ['https://www.googleapis.com/auth/drive.file']
      )

      // Initialize Drive API
      this.drive = google.drive({ version: 'v3', auth: this.auth })
      console.log('✅ Google Drive service initialized')

    } catch (error) {
      console.error('❌ Error initializing Google Drive auth:', error)
      if (error instanceof Error) {
        console.error('Error details:', error.message)
        console.error('Stack trace:', error.stack)
      }
    }
  }

  // Test authentication
  async testAuth(): Promise<boolean> {
    try {
      console.log('🧪 Testing Google Drive authentication...')
      
      if (!this.drive || !this.auth) {
        console.error('❌ Drive service not initialized')
        return false
      }

      // Try to access the main folder
      const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID!
      const response = await this.drive.files.get({
        fileId: folderId,
        fields: 'id, name, mimeType'
      })

      console.log('✅ Auth test successful. Folder info:', response.data)
      return true
    } catch (error) {
      console.error('❌ Auth test failed:', error)
      if (error instanceof Error) {
        console.error('Error message:', error.message)
      }
      return false
    }
  }

  // Create folder for specific competition if not exists
  private async ensureFolderExists(folderName: string, parentFolderId: string): Promise<string> {
    try {
      console.log(`📁 Ensuring folder exists: ${folderName} in parent: ${parentFolderId}`)
      
      // Check if folder already exists
      const query = `name='${folderName}' and parents in '${parentFolderId}' and mimeType='application/vnd.google-apps.folder' and trashed=false`
      
      const response = await this.drive.files.list({
        q: query,
        fields: 'files(id, name)'
      })

      if (response.data.files && response.data.files.length > 0) {
        console.log(`✅ Folder exists: ${response.data.files[0].id}`)
        return response.data.files[0].id
      }

      console.log(`🔧 Creating new folder: ${folderName}`)
      // Create folder if it doesn't exist
      const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentFolderId]
      }

      const folder = await this.drive.files.create({
        resource: folderMetadata,
        fields: 'id'
      })

      console.log(`✅ Folder created: ${folder.data.id}`)
      return folder.data.id
    } catch (error) {
      console.error('❌ Error ensuring folder exists:', error)
      throw error
    }
  }

  // Upload video file to Google Drive
  async uploadVideo(uploadData: UploadVideoData): Promise<UploadResponse> {
    try {
      console.log('🚀 Starting video upload process...')
      
      if (!this.drive || !this.auth) {
        const errorMsg = 'Google Drive service not initialized properly'
        console.error('❌', errorMsg)
        return {
          success: false,
          error: errorMsg
        }
      }

      // Test authentication first
      const authTest = await this.testAuth()
      if (!authTest) {
        return {
          success: false,
          error: 'Authentication failed. Please check service account permissions.'
        }
      }

      // Main folder ID from environment
      const mainFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID!
      console.log('📁 Main folder ID:', mainFolderId)

      // Create/get competition folder
      const competitionFolderName = `Video TikTok - ${new Date().getFullYear()}`
      const competitionFolderId = await this.ensureFolderExists(competitionFolderName, mainFolderId)

      // Create/get user folder
      const userFolderName = `${uploadData.username}_${new Date().toISOString().split('T')[0]}`
      const userFolderId = await this.ensureFolderExists(userFolderName, competitionFolderId)

      // Generate unique filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const cleanFilename = uploadData.filename.replace(/[^a-zA-Z0-9.-]/g, '_')
      const finalFilename = `${uploadData.username}_${timestamp}_${cleanFilename}`

      console.log('📄 Final filename:', finalFilename)

      // File metadata
      const fileMetadata = {
        name: finalFilename,
        parents: [userFolderId],
        description: `Video TikTok upload dari ${uploadData.metadata.usernameAkun} - ${uploadData.metadata.tanggalUpload}`
      }

      // Upload file
      const media = {
        mimeType: uploadData.mimeType,
        body: Buffer.from(uploadData.file)
      }

      console.log('⬆️ Uploading file to Google Drive...')
      const response = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id, name, webViewLink, size'
      })

      console.log('✅ File uploaded successfully:', response.data.id)

      // Create metadata file
      const metadataContent = JSON.stringify({
        ...uploadData.metadata,
        fileId: response.data.id,
        fileName: finalFilename,
        uploadTime: new Date().toISOString(),
        fileSize: response.data.size
      }, null, 2)

      const metadataFilename = `${uploadData.username}_${timestamp}_metadata.json`
      
      await this.drive.files.create({
        resource: {
          name: metadataFilename,
          parents: [userFolderId]
        },
        media: {
          mimeType: 'application/json',
          body: metadataContent
        }
      })

      console.log('✅ Metadata file created')

      return {
        success: true,
        fileId: response.data.id,
        fileName: finalFilename,
        webViewLink: response.data.webViewLink
      }

    } catch (error) {
      console.error('❌ Error uploading video to Google Drive:', error)
      
      let errorMessage = 'Unknown error occurred'
      if (error instanceof Error) {
        errorMessage = error.message
        console.error('Error details:', error.stack)
      }

      // Check for specific Google API errors
      if (typeof error === 'object' && error !== null) {
        const googleError = error as any
        if (googleError.code) {
          console.error('Google API Error Code:', googleError.code)
          switch (googleError.code) {
            case 403:
              errorMessage = 'Permission denied. Please check service account has access to the folder.'
              break
            case 404:
              errorMessage = 'Folder not found. Please check GOOGLE_DRIVE_FOLDER_ID is correct.'
              break
            case 401:
              errorMessage = 'Authentication failed. Please check service account credentials.'
              break
            default:
              errorMessage = `Google API Error (${googleError.code}): ${googleError.message}`
          }
        }
      }

      return {
        success: false,
        error: errorMessage
      }
    }
  }

  // Get file info
  async getFileInfo(fileId: string) {
    try {
      const response = await this.drive.files.get({
        fileId: fileId,
        fields: 'id, name, size, mimeType, createdTime, webViewLink'
      })
      return response.data
    } catch (error) {
      console.error('Error getting file info:', error)
      throw error
    }
  }

  // List files in folder
  async listFilesInFolder(folderId: string) {
    try {
      const response = await this.drive.files.list({
        q: `parents in '${folderId}' and trashed=false`,
        fields: 'files(id, name, size, mimeType, createdTime, webViewLink)',
        orderBy: 'createdTime desc'
      })
      return response.data.files
    } catch (error) {
      console.error('Error listing files:', error)
      throw error
    }
  }
}

// Export singleton instance
export const googleDriveService = new GoogleDriveService()
export default googleDriveService 