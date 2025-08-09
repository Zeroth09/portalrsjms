'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Video, Upload, CheckCircle2, AlertCircle, ExternalLink, Users, Calendar, Trophy, Clock, Smartphone, Camera, FileVideo, Link2 } from 'lucide-react'
import Link from 'next/link'

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
                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                     <h4 className="text-sm font-medium text-blue-800 flex items-center gap-2 mb-3">
                       <Upload className="w-4 h-4" />
                       Upload Video via Google Forms
                     </h4>
                     <p className="text-sm text-blue-700 mb-4">
                       Upload video backup menggunakan Google Forms - simple dan 100% reliable!
                     </p>
                     
                     {/* Direct Link to Google Forms */}
                     <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                       <div className="flex flex-col items-center gap-4">
                         <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                           <FileVideo className="w-8 h-8 text-white" />
                         </div>
                         
                         <div>
                           <h3 className="text-lg font-semibold text-gray-800 mb-2">
                             Upload Video TikTok
                           </h3>
                           <p className="text-gray-600 mb-4">
                             Klik tombol di bawah untuk membuka Google Forms dan upload video Anda
                           </p>
                         </div>

                         <a
                           href={googleFormsVideoUploadUrl}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                         >
                           <Upload className="w-5 h-5" />
                           Buka Google Forms Upload
                           <ExternalLink className="w-4 h-4" />
                         </a>

                         <div className="flex items-center gap-2 text-sm text-gray-500">
                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                           <span>Secure & Direct ke Google Drive</span>
                         </div>
                       </div>
                     </div>

                     <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                       <h5 className="text-sm font-medium text-green-800 mb-2">✨ Mengapa Google Forms?</h5>
                       <ul className="text-sm text-green-700 space-y-1">
                         <li>• <strong>Simple</strong>: Langsung upload video, no complex forms</li>
                         <li>• <strong>Reliable</strong>: 100% menggunakan infrastruktur Google</li>
                         <li>• <strong>No Limits</strong>: Upload file besar tanpa masalah</li>
                         <li>• <strong>Secure</strong>: Automatic save ke Google Drive yang aman</li>
                       </ul>
                     </div>

                     <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                       <h5 className="text-sm font-medium text-yellow-800 mb-2">📋 Langkah Upload:</h5>
                       <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                         <li>Klik tombol "Buka Google Forms Upload" di atas</li>
                         <li>Form akan terbuka di tab baru</li>
                         <li>Upload video Anda di Google Forms</li>
                         <li>Setelah selesai, kembali ke tab ini</li>
                         <li>Submit form pendaftaran utama</li>
                       </ol>
                     </div>

                     <div className="mt-4 flex items-center justify-between">
                       <div className="flex items-center gap-2 text-sm text-gray-600">
                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                         <span>Powered by Google</span>
                       </div>
                       <div className="flex items-center gap-2 text-sm text-gray-600">
                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                         <span>100% Secure</span>
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