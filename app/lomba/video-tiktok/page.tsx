'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Smartphone, CheckCircle, AlertCircle, Phone, Calendar, Video, Hash, Link as LinkIcon } from 'lucide-react'
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
          jenisLomba: 'Video TikTok',
          catatan: `Link TikTok: ${formData.linkTikTok} | Bukti Follow: ${formData.buktiFollow}`
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
    <div className="min-h-screen bg-gradient-to-br from-hijau-50 via-putih to-hijau-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-hijau-600 to-hijau-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Smartphone className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Video TikTok</h1>
              <p className="text-hijau-100">Buat konten TikTok bertema kemerdekaan</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Form Pendaftaran</h2>
            
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">Pendaftaran Berhasil!</h3>
                    <p className="text-green-700 text-sm">Data pendaftaran telah tersimpan. Tim kami akan menghubungi Anda segera.</p>
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
                  <AlertCircle className="w-6 h-6 text-red-600" />
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
                  Username Akun *
                </label>
                <input
                  type="text"
                  id="usernameAkun"
                  name="usernameAkun"
                  value={formData.usernameAkun}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan username TikTok"
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
                <div className="relative">
                  <input
                    type="url"
                    id="linkTikTok"
                    name="linkTikTok"
                    value={formData.linkTikTok}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau-500 focus:border-transparent transition-colors"
                    placeholder="https://www.tiktok.com/@username/video/..."
                  />
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Pastikan video sudah diupload di TikTok dan gunakan hashtag #rsj_mutiarasukma
                </p>
              </div>

              <div>
                <label htmlFor="buktiFollow" className="block text-sm font-medium text-gray-700 mb-2">
                  Link Screenshot Bukti Follow *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    id="buktiFollow"
                    name="buktiFollow"
                    value={formData.buktiFollow}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hijau-500 focus:border-transparent transition-colors"
                    placeholder="https://drive.google.com/file/d/... atau link screenshot lainnya"
                  />
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Upload screenshot bukti follow akun sosial media RSJ Mutiara Sukma (Instagram/Facebook/TikTok)
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-hijau-600 to-hijau-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-hijau-700 hover:to-hijau-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang'}
              </button>
            </form>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Ketentuan */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-hijau-500" />
                Ketentuan Lomba
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Peserta:</strong> Masyarakat Umum (tidak termasuk CHRSJMS)</li>
                <li>• Durasi 15-60 detik</li>
                <li>• Tema kemerdekaan Indonesia</li>
                <li>• Upload di TikTok</li>
                <li>• Tag @rsjmutiarasukma</li>
                <li>• Gunakan hashtag #rsj_mutiarasukma</li>
                <li>• Video bebas dari unsur politik dan SARA</li>
                <li>• <strong>Wajib follow</strong> akun sosial media RSJ Mutiara Sukma</li>
                <li>• Upload screenshot bukti follow sebagai syarat pendaftaran</li>
              </ul>
            </div>

            {/* Kriteria Penilaian */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-oranye-500" />
                Kriteria Penilaian
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Kreativitas (40%)</li>
                <li>• Viralitas (30%)</li>
                <li>• Pesan dan Makna (20%)</li>
                <li>• Teknik Pengambilan (10%)</li>
              </ul>
            </div>

            {/* Narahubung */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-hijau-500" />
                Narahubung
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>• Regina Salsa Gandi, S.Kep., Ns</p>
                <p>• Unit: Dahlia</p>
                <p>• Telepon: <a href="https://wa.me/6287862236921" target="_blank" rel="noopener noreferrer" className="text-hijau-600 hover:text-hijau-700 font-semibold underline">087862236921</a></p>
              </div>
            </div>

            {/* Batas Pendaftaran */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Batas Pendaftaran
              </h3>
              <div className="text-gray-600">
                <p className="text-lg font-semibold text-red-600">15 Agustus 2024</p>
                <p className="text-sm text-gray-500 mt-1">Pendaftaran ditutup pada pukul 23:59 WITA</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 