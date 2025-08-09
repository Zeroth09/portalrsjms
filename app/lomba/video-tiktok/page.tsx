'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Video, Calendar, MapPin, Phone, Star, ArrowLeft, Users, Clock, AlertTriangle, Hash, Instagram } from 'lucide-react'
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/pendaftaran', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          jenisLomba: 'Video TikTok'
        }),
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
            initial={{ opacity: 0, x: -50, scale: 0.9 }} 
            animate={{ opacity: 1, x: 0, scale: 1 }} 
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }} 
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-4"
              >
                <Star className="w-12 h-12 text-hijau-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Daftar Lomba Video TikTok</h2>
              <p className="text-gray-600">Pendaftaran dilakukan melalui form online</p>
            </div>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">Pendaftaran Berhasil!</h3>
                    <p className="text-green-700 text-sm">Video TikTok Anda telah terdaftar. Tim kami akan menghubungi untuk informasi selanjutnya.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <div>
                    <h3 className="font-semibold text-red-800">Gagal Mendaftar</h3>
                    <p className="text-red-700 text-sm">{errorMessage}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan username akun TikTok"
                />
              </div>

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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan asal instansi (opsional)"
                />
              </div>

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
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan nomor telepon"
                />
              </div>

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
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau-500 focus:border-transparent transition-colors"
                  placeholder="https://www.tiktok.com/@username/video/..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Pastikan video sudah diupload dengan hashtag #rsj_mutiarasukma dan #merdekajiwarsjms
                </p>
              </div>

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
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau-500 focus:border-transparent transition-colors"
                  placeholder="https://drive.google.com/file/d/... atau link screenshot lainnya"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload screenshot bukti follow akun sosial media RSJ Mutiara Sukma (Instagram/Facebook/TikTok)
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-hijau-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-hijau-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang'}
              </button>
            </form>
          </motion.div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }} 
            animate={{ opacity: 1, x: 0, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }} 
            className="space-y-6"
          >
            {/* Tema */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-hijau-600" />
                Tema Lomba
              </h3>
              <p className="text-gray-700 italic">
                "Rayakan Kemerdekaan dengan Kesehatan Jiwa"
              </p>
            </motion.div>

            {/* Peserta */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Peserta
              </h3>
              <p className="text-gray-700">
                Masyarakat Umum (tidak termasuk CHRSJMS)
              </p>
              <p className="text-sm text-red-600 mt-2 font-semibold">
                ⚠️ Tidak diperbolehkan untuk pegawai RSJMS
              </p>
            </motion.div>

            {/* Ketentuan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-hijau-600" />
                Ketentuan
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-hijau-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Video berdurasi maksimal <strong>60 detik</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Sebelum mengupload video wajib <strong>follow akun resmi RSJ Mutiara Sukma</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-hijau-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Wajib mencantumkan hashtag <strong>#rsj_mutiarasukma</strong> dan <strong>#merdekajiwarsjms</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Video berisi kegiatan dalam upaya meningkatkan kesehatan jiwa baik dirumah, lingkungan sekitar maupun di tempat kerja</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-hijau-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Video harus <strong>orisinil</strong> dan belum pernah diikutkan dalam lomba lain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Video harus bebas dari unsur <strong>politik dan SARA</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-hijau-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Video paling lambat diupload ke akun TikTok dan dikirim ke panitia paling lambat tanggal <strong>18 Agustus 2025</strong></span>
                </li>
              </ul>
            </motion.div>

            {/* Kriteria Penilaian */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600" />
                Kriteria Penilaian
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Kreativitas</span>
                  <span className="font-bold text-hijau-600">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Kesesuaian dengan tema</span>
                  <span className="font-bold text-purple-600">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Kualitas video & audio</span>
                  <span className="font-bold text-blue-600">25%</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-hijau-600 to-purple-600 text-white rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Narahubung
              </h3>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Regina Salsa Gandi, S.Kep., Ns (Dahlia)</p>
                <p className="text-2xl font-bold">
                  <a href="https://wa.me/6287862236921" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    087862236921
                  </a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 