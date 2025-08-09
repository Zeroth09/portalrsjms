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
    buktiFollow?: string
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
      console.log(`