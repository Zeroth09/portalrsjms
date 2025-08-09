'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, CheckCircle, AlertCircle, Video, FileText } from 'lucide-react'

interface VideoUploadProps {
  onFileSelect: (file: File) => void
  onFileRemove: () => void
  uploadProgress: number
  isUploading: boolean
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error'
  errorMessage?: string
  disabled?: boolean
}

export default function VideoUpload({
  onFileSelect,
  onFileRemove,
  uploadProgress,
  isUploading,
  uploadStatus,
  errorMessage,
  disabled = false
}: VideoUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Allowed file types and max size - back to 100MB as requested
  const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime']
  const maxSize = 100 * 1024 * 1024 // 100MB as requested

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return 'Hanya file video MP4, MOV, atau AVI yang diperbolehkan'
    }

    // Check file size - back to 100MB
    if (file.size > maxSize) {
      return `Ukuran file terlalu besar (${formatFileSize(file.size)}). Maksimal 100MB.`
    }

    // Warning for large files (>50MB)
    if (file.size > 50 * 1024 * 1024) {
      console.warn(`⚠️ Large file detected: ${formatFileSize(file.size)}. Upload might take longer.`)
    }

    return null
  }

  const handleFileSelect = (file: File) => {
    const error = validateFile(file)
    if (error) {
      alert(error)
      return
    }

    setSelectedFile(file)
    onFileSelect(file)
  }

  const handleFileRemove = () => {
    setSelectedFile(null)
    onFileRemove()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true)
    }
  }

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case 'uploading':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
      default:
        return <Upload className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = () => {
    if (disabled) return 'border-gray-200 bg-gray-50'
    if (dragActive) return 'border-blue-500 bg-blue-50'
    if (uploadStatus === 'error') return 'border-red-300 bg-red-50'
    if (uploadStatus === 'success') return 'border-green-300 bg-green-50'
    return 'border-gray-300 bg-white hover:border-gray-400'
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 ${getStatusColor()}`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/mov,video/avi,video/quicktime"
          onChange={handleInputChange}
          disabled={disabled || isUploading}
          className="hidden"
        />

        {!selectedFile ? (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                {getStatusIcon()}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Upload Video TikTok
              </h3>
              
              <p className="text-sm text-gray-500 mb-4">
                Drag & drop video ke sini atau{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled || isUploading}
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  pilih file
                </button>
              </p>
              
              <div className="text-xs text-gray-400 space-y-1">
                <p>• Format: MP4, MOV, AVI</p>
                <p>• Maksimal: 100MB (untuk upload yang stabil)</p>
                <p>• Durasi maksimal: 60 detik</p>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Selected File Info */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Video className="w-6 h-6 text-blue-600 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(selectedFile.size)} • {selectedFile.type}
                </p>
              </div>
              {!isUploading && uploadStatus !== 'success' && (
                <button
                  type="button"
                  onClick={handleFileRemove}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Mengupload...</span>
                  <span className="text-blue-600 font-medium">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {/* Success Message */}
            {uploadStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-green-600 text-sm font-medium"
              >
                <CheckCircle className="w-4 h-4" />
                Video berhasil diupload ke Google Drive!
              </motion.div>
            )}

            {/* Error Message */}
            {uploadStatus === 'error' && errorMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-2 text-red-600 text-sm"
              >
                <AlertCircle className="w-4 h-4 mt-0.5" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Upload Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
      >
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Petunjuk Upload Video:</p>
            <ul className="space-y-1 text-xs">
              <li>• Video akan disimpan secara privat di Google Drive</li>
              <li>• Hanya admin yang dapat mengakses folder video</li>
              <li>• Pastikan video sudah diupload di TikTok sebelum submit</li>
              <li>• Sertakan link TikTok yang valid</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 