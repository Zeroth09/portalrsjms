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
      // Check for required environment variables
      const requiredEnvVars = [
        'GOOGLE_SERVICE_ACCOUNT_EMAIL',
        'GOOGLE_PRIVATE_KEY',
        'GOOGLE_DRIVE_FOLDER_ID'
      ]

      for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
          console.error(`Missing required environment variable: ${envVar}`)
          return
        }
      }

      // Clean and format private key
      let privateKey = process.env.GOOGLE_PRIVATE_KEY!
      privateKey = privateKey.replace(/\\n/g, '\n')
      privateKey = privateKey.replace(/"/g, '')
      
      // Ensure proper format
      if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
        privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`
      }

      // Initialize JWT auth
      this.auth = new google.auth.JWT(
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        undefined,
        privateKey,
        ['https://www.googleapis.com/auth/drive.file']
      )

      // Initialize Drive API
      this.drive = google.drive({ version: 'v3', auth: this.auth })

    } catch (error) {
      console.error('Error initializing Google Drive auth:', error)
    }
  }

  // Create folder for specific competition if not exists
  private async ensureFolderExists(folderName: string, parentFolderId: string): Promise<string> {
    try {
      // Check if folder already exists
      const query = `name='${folderName}' and parents in '${parentFolderId}' and mimeType='application/vnd.google-apps.folder' and trashed=false`
      
      const response = await this.drive.files.list({
        q: query,
        fields: 'files(id, name)'
      })

      if (response.data.files && response.data.files.length > 0) {
        return response.data.files[0].id
      }

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

      return folder.data.id
    } catch (error) {
      console.error('Error ensuring folder exists:', error)
      throw error
    }
  }

  // Upload video file to Google Drive
  async uploadVideo(uploadData: UploadVideoData): Promise<UploadResponse> {
    try {
      if (!this.drive || !this.auth) {
        return {
          success: false,
          error: 'Google Drive service not initialized properly'
        }
      }

      // Main folder ID from environment
      const mainFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID!

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

      // File metadata
      const fileMetadata = {
        name: finalFilename,
        parents: [userFolderId],
        description: `Video TikTok upload dari ${uploadData.metadata.usernameAkun} - ${uploadData.metadata.tanggalUpload}`
      }

      // Upload file
      const media = {
        mimeType: uploadData.mimeType,
        body: uploadData.file
      }

      const response = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id, name, webViewLink, size'
      })

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

      return {
        success: true,
        fileId: response.data.id,
        fileName: finalFilename,
        webViewLink: response.data.webViewLink
      }

    } catch (error) {
      console.error('Error uploading video to Google Drive:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
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