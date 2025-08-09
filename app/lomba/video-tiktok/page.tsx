'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Video, Upload, CheckCircle2, AlertCircle, ExternalLink, Users, Calendar, Trophy, Clock, Smartphone, Camera, FileVideo, Link2, Shield, Zap, X, Check } from 'lucide-react'
import Link from 'next/link'
import VideoUpload from '../../components/VideoUpload'

interface FormData {
  usernameAkun: string
  asalInstansi: string
  teleponPenanggungJawab: string
  linkTikTok: string
  buktiFollow: string
}

export default function VideoTikTokPage() {
  const [formData, setFormData] = useState<FormData>({
    usernameAkun: '',
    asalInstansi: '',
    teleponPenanggungJawab: '',
    linkTikTok: '',
    buktiFollow: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [showVideoUpload, setShowVideoUpload] = useState(false)

  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [uploadError, setUploadError] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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

      // Register data to spreadsheet
      const registrationData = {
        usernameAkun: formData.usernameAkun,
        asalInstansi: formData.asalInstansi,
        teleponPenanggungJawab: formData.teleponPenanggungJawab,
        linkTikTok: formData.linkTikTok,
        buktiFollow: formData.buktiFollow,
        jenisLomba: 'Video TikTok'
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
          buktiFollow: ''
        })
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

  // Google Forms URL untuk upload video - actual form yang sudah dibuat
  const googleFormsVideoUploadUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeRHJEg7tyrwdDb9vpE3IbBdxQPzrbnMDL-RlQk9DJmMvbBFg/viewform"

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
                  <p className="text-green-700 text-sm">Data Anda telah tersimpan. Jangan lupa upload video melalui form Google di bawah!</p>
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
                  placeholder="https://www.tiktok.com/@username/video/..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Paste link video TikTok yang sudah diupload
                </p>
                
                {/* Google Forms Upload Button */}
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Upload className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-blue-800 mb-1">
                        Upload Video Backup
                      </h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Upload copy video Anda sebagai backup menggunakan Google Forms. 
                        Simple, reliable, dan 100% aman!
                      </p>
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeRHJEg7tyrwdDb9vpE3IbBdxQPzrbnMDL-RlQk9DJmMvbBFg/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                      >
                        <Upload className="w-4 h-4" />
                        Upload via Google Forms
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <div className="mt-2 flex items-center gap-2 text-xs text-blue-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Recommended untuk file besar</span>
                      </div>
                    </div>
                  </div>
                </div>
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



              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-hijau-600 via-purple-500 to-hijau-600 text-white py-4 px-6 rounded-lg font-medium hover:from-hijau-700 hover:via-purple-600 hover:to-hijau-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang'}
              </button>
            </form>

            {/* Video Upload Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FileVideo className="w-5 h-5 text-purple-600" />
                  Upload Video (Backup)
                </h3>
                <button
                  type="button"
                  onClick={() => setShowVideoUpload(!showVideoUpload)}
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  {showVideoUpload ? 'Sembunyikan' : 'Tampilkan Form'}
                </button>
              </div>

              {showVideoUpload && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                   <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6">
                     <div className="flex items-center justify-between mb-6">
                       <h4 className="text-lg font-semibold text-purple-800 flex items-center gap-2">
                         <FileVideo className="w-6 h-6" />
                         Upload Video TikTok
                       </h4>
                       <div className="flex items-center gap-2 text-sm text-purple-600">
                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                         <span>Direct Upload</span>
                       </div>
                     </div>

                     {/* Enhanced Upload Area */}
                     <VideoUpload 
                       onUploadSuccess={(fileInfo) => {
                         setUploadStatus('success')
                         setUploadError('')
                         console.log('Upload success:', fileInfo)
                       }}
                       onUploadError={(error) => {
                         setUploadStatus('error')
                         setUploadError(error)
                       }}
                       onUploadProgress={(progress) => {
                         setUploadProgress(progress)
                         if (progress > 0 && progress < 100) {
                           setUploadStatus('uploading')
                         }
                       }}
                       formData={{
                         usernameAkun: formData.usernameAkun,
                         asalInstansi: formData.asalInstansi,
                         teleponPenanggungJawab: formData.teleponPenanggungJawab
                       }}
                     />

                     {/* Upload Status */}
                     {uploadStatus === 'uploading' && (
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                       >
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                           <div className="flex-1">
                             <p className="text-sm font-medium text-blue-800">
                               Uploading video... {uploadProgress}%
                             </p>
                             <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                               <div 
                                 className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                 style={{ width: `${uploadProgress}%` }}
                               ></div>
                             </div>
                           </div>
                         </div>
                       </motion.div>
                     )}

                     {uploadStatus === 'success' && (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                       >
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                             <Check className="w-4 h-4 text-white" />
                           </div>
                           <div>
                             <p className="text-sm font-medium text-green-800">
                               ✨ Video berhasil diupload!
                             </p>
                             <p className="text-xs text-green-600 mt-1">
                               Video tersimpan aman di Google Drive
                             </p>
                           </div>
                         </div>
                       </motion.div>
                     )}

                     {uploadStatus === 'error' && uploadError && (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                       >
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                             <X className="w-4 h-4 text-white" />
                           </div>
                           <div>
                             <p className="text-sm font-medium text-red-800">
                               Upload gagal
                             </p>
                             <p className="text-xs text-red-600 mt-1">
                               {uploadError}
                             </p>
                           </div>
                         </div>
                       </motion.div>
                     )}

                     {/* Enhanced Benefits */}
                     <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="p-4 bg-white/60 rounded-lg border border-purple-100">
                         <h5 className="text-sm font-medium text-purple-800 mb-2 flex items-center gap-2">
                           <Shield className="w-4 h-4" />
                           100% Secure
                         </h5>
                         <p className="text-xs text-purple-600">
                           Direct upload ke Google Drive yang private dan terenkripsi
                         </p>
                       </div>
                       
                       <div className="p-4 bg-white/60 rounded-lg border border-purple-100">
                         <h5 className="text-sm font-medium text-purple-800 mb-2 flex items-center gap-2">
                           <Zap className="w-4 h-4" />
                           Fast & Reliable
                         </h5>
                         <p className="text-xs text-purple-600">
                           Upload langsung tanpa limit size, progress real-time
                         </p>
                       </div>
                     </div>

                     {/* Fallback Link */}
                     <div className="mt-6 pt-4 border-t border-purple-200">
                       <div className="flex items-center justify-between">
                         <div>
                           <h5 className="text-sm font-medium text-purple-800">
                             Butuh bantuan upload?
                           </h5>
                           <p className="text-xs text-purple-600">
                             Gunakan Google Forms sebagai backup option
                           </p>
                         </div>
                         <a
                           href={googleFormsVideoUploadUrl}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1"
                         >
                           Backup Upload
                           <ExternalLink className="w-3 h-3" />
                         </a>
                       </div>
                     </div>
                   </div>
                </motion.div>
              )}

                             <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                 <h4 className="text-sm font-medium text-gray-800 mb-2">🎯 Why Google Forms is Perfect:</h4>
                 <ul className="text-sm text-gray-600 space-y-1">
                   <li>• <strong>Simple</strong>: Cukup upload video, no complex forms</li>
                   <li>• <strong>Reliable</strong>: 100% menggunakan infrastruktur Google</li>
                   <li>• <strong>No Limits</strong>: Upload file besar tanpa masalah</li>
                   <li>• <strong>Secure</strong>: Langsung tersimpan di Google Drive yang aman</li>
                 </ul>
               </div>
            </div>
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

            {/* Upload Method Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-green-600" />
                Metode Upload Video
              </h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">1. Upload di TikTok (Wajib):</h4>
                  <p>Upload video dengan hashtag yang sudah ditentukan</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">2. Upload Backup via Google Forms:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Menggunakan sistem Google Forms yang reliable</li>
                    <li>Tidak ada masalah ukuran file atau timeout</li>
                    <li>Langsung tersimpan di Google Drive yang aman</li>
                    <li>Backup untuk keperluan penilaian panitia</li>
                  </ul>
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