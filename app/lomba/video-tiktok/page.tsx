'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Smartphone, CheckCircle, AlertCircle, Phone, Calendar, Video, Hash } from 'lucide-react'
import Link from 'next/link'

interface FormData {
  namaTim: string
  unit: string
  teleponPenanggungJawab: string
}

export default function VideoTikTokPage() {
  const [formData, setFormData] = useState<FormData>({
    namaTim: '',
    unit: '',
    teleponPenanggungJawab: ''
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
          jenisLomba: 'Video Pendek TikTok'
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          namaTim: '',
          unit: '',
          teleponPenanggungJawab: ''
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-putih to-pink-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
            <Link href="/admin" className="text-white hover:text-gray-200 transition-colors text-sm underline">
              Admin Panel
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Smartphone className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Video Pendek TikTok</h1>
              <p className="text-purple-100">Lomba Kreatif untuk Masyarakat Umum</p>
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
                    <p className="text-green-700 text-sm">Video TikTok Anda telah terdaftar. Jangan lupa upload video dengan hashtag yang ditentukan!</p>
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
                <label htmlFor="namaTim" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Tim/Kreator *
                </label>
                <input
                  type="text"
                  id="namaTim"
                  name="namaTim"
                  value={formData.namaTim}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan nama tim atau nama kreator"
                />
              </div>

              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                  Asal/Instansi *
                </label>
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan asal instansi atau komunitas"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan nomor telepon"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <Video className="w-6 h-6 text-purple-600" />
                Ketentuan Lomba
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Peserta adalah masyarakat umum (bukan pegawai RSJMS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Video berdurasi maksimal 60 detik</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Wajib follow akun resmi RSJ Mutiara Sukma</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Gunakan hashtag #rsj_mutiarasukma dan #merdekajiwarsjms</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Video bebas dari unsur politik dan SARA</span>
                </li>
              </ul>
            </div>

            {/* Tema Video */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tema Video</h3>
              <div className="space-y-3 text-gray-600">
                <p className="font-semibold text-purple-600">"Rayakan Kemerdekaan dengan Kesehatan Jiwa"</p>
                <p>• Kegiatan dalam upaya meningkatkan kesehatan jiwa</p>
                <p>• Bisa dilakukan di rumah, lingkungan sekitar, atau tempat kerja</p>
                <p>• Kreativitas dalam menyampaikan pesan kesehatan jiwa</p>
                <p>• Video harus orisinil dan belum pernah diikutkan lomba lain</p>
              </div>
            </div>

            {/* Kriteria Penilaian */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Kriteria Penilaian</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Kreativitas</span>
                  <span className="font-semibold text-purple-600">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Kesesuaian dengan tema</span>
                  <span className="font-semibold text-purple-600">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Kualitas video & audio</span>
                  <span className="font-semibold text-purple-600">25%</span>
                </div>
              </div>
            </div>

            {/* Hashtag Info */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Hash className="w-6 h-6" />
                Wajib Hashtag
              </h3>
              <div className="space-y-2">
                <p className="text-2xl font-bold">#rsj_mutiarasukma</p>
                <p className="text-2xl font-bold">#merdekajiwarsjms</p>
                <p className="text-purple-100 text-sm">Pastikan kedua hashtag ini ada di caption video!</p>
              </div>
            </div>

            {/* Narahubung */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Phone className="w-6 h-6" />
                Narahubung
              </h3>
              <div className="space-y-2">
                <p className="font-semibold">Regina Salsa Gandi, S.Kep., Ns</p>
                <p className="text-pink-100">(Dahlia)</p>
                <p className="text-2xl font-bold">087862236921</p>
              </div>
            </div>

            {/* Batas Pendaftaran */}
            <div className="bg-gradient-to-r from-hijau-500 to-hijau-600 text-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Batas Pendaftaran
              </h3>
              <p className="text-2xl font-bold">15 Agustus 2025</p>
              <p className="text-hijau-100 text-sm">Jangan sampai terlambat!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 