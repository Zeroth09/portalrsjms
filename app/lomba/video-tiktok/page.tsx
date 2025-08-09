'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Video, Upload, CheckCircle2, AlertCircle, ExternalLink, Users, Calendar, Trophy, Clock, Smartphone, Camera } from 'lucide-react'
import Link from 'next/link'
import VideoUpload from '../../components/VideoUpload'

interface FormData {
  usernameAkun: string
  asalInstansi: string
  teleponPenanggungJawab: string
  linkTikTok: string
  buktiFollow: string
  videoFile?: File
}

export default function VideoTikTokPage() {
  const [formData, setFormData] = useState<FormData>({
    usernameAkun: '',
    asalInstansi: '',
    teleponPenanggungJawab: '',
    linkTikTok: '',
    buktiFollow: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Google Drive Upload States
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [uploadError, setUploadError] = useState('')
  const [driveFileId, setDriveFileId] = useState<string>('')
  const [driveFileUrl, setDriveFileUrl] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileSelect = (file: File) => {
    setFormData(prev => ({ ...prev, videoFile: file }))
    setUploadStatus('idle')
    setUploadError('')
    setDriveFileId('')
    setDriveFileUrl('')
  }

  const handleFileRemove = () => {
    setFormData(prev => ({ ...prev, videoFile: undefined }))
    setUploadStatus('idle')
    setUploadProgress(0)
    setUploadError('')
    setDriveFileId('')
    setDriveFileUrl('')
  }

  // Simplified upload to Google Drive via our API (chunked)
  const uploadToGoogleDrive = async (file: File): Promise<{ fileId: string; webViewLink: string } | null> => {
    try {
      setUploadStatus('uploading')
      setUploadProgress(0)

      // Prepare form data for multipart upload
      const uploadFormData = new FormData()
      uploadFormData.append('video', file)
      uploadFormData.append('usernameAkun', formData.usernameAkun)
      uploadFormData.append('asalInstansi', formData.asalInstansi)
      uploadFormData.append('teleponPenanggungJawab', formData.teleponPenanggungJawab)
      uploadFormData.append('linkTikTok', formData.linkTikTok)
      uploadFormData.append('buktiFollow', formData.buktiFollow)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      console.log('🚀 Uploading to Google Drive via server...')

      const response = await fetch('/api/upload-video', {
        method: 'POST',
        body: uploadFormData
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      const result = await response.json()

      if (result.success) {
        setUploadStatus('success')
        console.log('✅ Upload successful:', result.data?.fileId)
        return {
          fileId: result.data?.fileId || '',
          webViewLink: result.data?.webViewLink || ''
        }
      } else {
        setUploadStatus('error')
        setUploadError(result.error || 'Upload gagal')
        console.error('❌ Upload failed:', result.error)
        return null
      }
    } catch (error) {
      setUploadStatus('error')
      setUploadError('Terjadi kesalahan saat upload. Coba dengan file yang lebih kecil.')
      setUploadProgress(0)
      console.error('❌ Upload error:', error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Validate required fields
      if (!formData.usernameAkun || !formData.teleponPenanggungJawab || !formData.linkTikTok || !formData.buktiFollow) {
        setSubmitStatus('error')
        setErrorMessage('Semua field wajib diisi')
        return
      }

      // Upload video to Google Drive if file is selected
      let uploadResult = null
      if (formData.videoFile) {
        console.log('🎬 Starting video upload...')
        uploadResult = await uploadToGoogleDrive(formData.videoFile)
        
        if (!uploadResult) {
          setSubmitStatus('error')
          setErrorMessage('Upload video gagal. Silakan coba lagi.')
          return
        }

        setDriveFileId(uploadResult.fileId)
        setDriveFileUrl(uploadResult.webViewLink)
      }

      // Register data to spreadsheet
      const registrationData = {
        usernameAkun: formData.usernameAkun,
        asalInstansi: formData.asalInstansi,
        teleponPenanggungJawab: formData.teleponPenanggungJawab,
        linkTikTok: formData.linkTikTok,
        buktiFollow: formData.buktiFollow,
        jenisLomba: 'Video TikTok',
        driveFileId: uploadResult?.fileId || '',
        driveFileUrl: uploadResult?.webViewLink || ''
      }

      const response = await fetch('/api/pendaftaran', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          usernameAkun: '',
          asalInstansi: '',
          teleponPenanggungJawab: '',
          linkTikTok: '',
          buktiFollow: '',
          videoFile: undefined
        })
        handleFileRemove()
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || 'Terjadi kesalahan')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Terjadi kesalahan pada jaringan')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-hijau-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-hijau-600 via-purple-500 to-hijau-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <Video className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Video TikTok</h1>
              <p className="text-white/80">Buat konten TikTok bertema kemerdekaan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar Lomba Video TikTok</h2>
            
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-green-800 font-medium">Pendaftaran Berhasil!</p>
                  <p className="text-green-700 text-sm">Data Anda telah tersimpan dan video berhasil diupload ke Google Drive.</p>
                  {driveFileUrl && (
                    <a 
                      href={driveFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1 mt-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Lihat Video di Google Drive
                    </a>
                  )}
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-red-800 font-medium">Gagal Mendaftar</p>
                  <p className="text-red-700 text-sm">{errorMessage}</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Akun TikTok */}
              <div>
                <label htmlFor="usernameAkun" className="block text-sm font-medium text-gray-700 mb-2">
                  Username Akun TikTok *
                </label>
                <input
                  type="text"
                  id="usernameAkun"
                  name="usernameAkun"
                  value={formData.usernameAkun}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="@username"
                  required
                />
              </div>

              {/* Asal Instansi */}
              <div>
                <label htmlFor="asalInstansi" className="block text-sm font-medium text-gray-700 mb-2">
                  Asal Instansi (Optional)
                </label>
                <input
                  type="text"
                  id="asalInstansi"
                  name="asalInstansi"
                  value={formData.asalInstansi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Nama instansi/sekolah"
                />
              </div>

              {/* Telepon Penanggung Jawab */}
              <div>
                <label htmlFor="teleponPenanggungJawab" className="block text-sm font-medium text-gray-700 mb-2">
                  Telepon Penanggung Jawab *
                </label>
                <input
                  type="tel"
                  id="teleponPenanggungJawab"
                  name="teleponPenanggungJawab"
                  value={formData.teleponPenanggungJawab}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="08xxxxxxxxxx"
                  required
                />
              </div>

              {/* Link Postingan TikTok */}
              <div>
                <label htmlFor="linkTikTok" className="block text-sm font-medium text-gray-700 mb-2">
                  Link Postingan TikTok *
                </label>
                <input
                  type="url"
                  id="linkTikTok"
                  name="linkTikTok"
                  value={formData.linkTikTok}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://tiktok.com/@username/video/..."
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Pastikan video sudah diupload di TikTok dengan hashtag #rsj_mutiarasukma dan #merdekajiwarsrsjms
                </p>
              </div>

              {/* Link Screenshot Bukti Follow */}
              <div>
                <label htmlFor="buktiFollow" className="block text-sm font-medium text-gray-700 mb-2">
                  Link Screenshot Bukti Follow *
                </label>
                <input
                  type="url"
                  id="buktiFollow"
                  name="buktiFollow"
                  value={formData.buktiFollow}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://drive.google.com/..."
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload screenshot bukti follow akun sosial media RSJ Mutiara Sukma (Instagram/Facebook/TikTok)
                </p>
              </div>

              {/* Upload Video */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Video (Optional)
                </label>
                <VideoUpload
                  onFileSelect={handleFileSelect}
                  onFileRemove={handleFileRemove}
                  uploadProgress={uploadProgress}
                  isUploading={uploadStatus === 'uploading'}
                  uploadStatus={uploadStatus}
                  errorMessage={uploadError}
                  disabled={isSubmitting}
                />
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Petunjuk Upload Video:
                  </h4>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Video akan disimpan secara privat di Google Drive</li>
                    <li>• Hanya admin yang dapat mengakses folder video</li>
                    <li>• Pastikan video sudah diupload di TikTok sebelum submit</li>
                    <li>• Sertakan link TikTok yang valid</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Upload video sebagai backup. Video akan disimpan aman di Google Drive privat.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || uploadStatus === 'uploading'}
                className="w-full bg-gradient-to-r from-hijau-600 via-purple-500 to-hijau-600 text-white py-4 px-6 rounded-lg font-medium hover:from-hijau-700 hover:via-purple-600 hover:to-hijau-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Mendaftar...' : uploadStatus === 'uploading' ? 'Mengupload Video...' : 'Daftar Sekarang'}
              </button>
            </form>
          </motion.div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Info Lomba */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-600" />
                Info Lomba
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-hijau-600" />
                  <span>Deadline: 18 Agustus 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>Peserta: Masyarakat Umum (tidak termasuk CHRSJMS)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  <span>Hadiah: Menarik untuk pemenang</span>
                </div>
              </div>
            </div>

            {/* Ketentuan Lomba */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ketentuan Lomba</h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Tema:</h4>
                  <p>Konten kreatif bertema kemerdekaan Indonesia yang menginspirasi dan menghibur</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Syarat:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Video berdurasi maksimal 60 detik</li>
                    <li>Konten original dan kreatif</li>
                    <li>Menggunakan hashtag #rsj_mutiarasukma dan #merdekajiwarsrsjms</li>
                    <li>Follow akun sosial media RSJ Mutiara Sukma</li>
                    <li>Masyarakat umum (tidak termasuk CHRSJMS)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Kriteria Penilaian:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Kreativitas dan originalitas</li>
                    <li>Kesesuaian dengan tema kemerdekaan</li>
                    <li>Kualitas video dan audio</li>
                    <li>Engagement (like, comment, share)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Narahubung */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Narahubung</h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium">Regina Salsa Gandi, S.Kep., Ns (Dahlia)</p>
                <a 
                  href="https://wa.me/6287862236921"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hijau-600 hover:text-hijau-800 flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  087862236921
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 