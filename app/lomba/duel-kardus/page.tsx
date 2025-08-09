'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Car, CheckCircle, AlertCircle, Phone, Calendar, Trophy, Users, Smartphone, Shirt, Clock, Shield, Target, Play, Zap, X } from 'lucide-react'
import Link from 'next/link'

interface FormData {
  namaTim: string
  unit: string
  teleponPenanggungJawab: string
}

export default function DuelKardusPage() {
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
          jenisLomba: 'Duel Kardus Cerdas'
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-putih to-hijau-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
            
          </div>
          <div className="flex items-center gap-4">
            <Car className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Duel Kardus Cerdas</h1>
              <p className="text-purple-100">Lomba duel kecerdasan dengan aktivitas fisik menggunakan kardus</p>
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
                    <p className="text-green-700 text-sm">Tim Anda telah terdaftar untuk lomba Duel Kardus Cerdas. Tim kami akan menghubungi untuk briefing teknis.</p>
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
                  Nama Tim *
                </label>
                <input
                  type="text"
                  id="namaTim"
                  name="namaTim"
                  value={formData.namaTim}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan nama tim"
                />
              </div>

              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                  Unit *
                </label>
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan nama unit"
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
            {/* Info Lomba */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Car className="w-6 h-6" />
                Info Lomba
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span><strong>Tim:</strong> 5 orang per tim</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span><strong>Jenis:</strong> Lomba beregu dengan kecerdasan</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span><strong>Pendaftaran:</strong> Sampai 12 Agustus 2025</span>
                </div>
              </div>
            </div>

            {/* Ketentuan Umum */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-purple-600" />
                📋 Ketentuan Umum
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-purple-800">Tim Beregu</p>
                    <p className="text-sm text-purple-700">Lomba bersifat beregu, terdiri dari <strong>5 orang per tim</strong></p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-800">Smartphone Wajib</p>
                    <p className="text-sm text-blue-700">Setiap anggota tim <strong>wajib membawa smartphone</strong> masing-masing</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">Dress Code</p>
                    <p className="text-sm text-green-700">Peserta <strong>wajib menggunakan pakaian olahraga</strong></p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-orange-800">Briefing Teknis</p>
                    <p className="text-sm text-orange-700">Seluruh peserta wajib hadir <strong>30 menit sebelum pertandingan</strong> untuk briefing teknis</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-red-800">Keputusan Mutlak</p>
                    <p className="text-sm text-red-700">Keputusan juri dan wasit bersifat <strong>mutlak dan tidak dapat diganggu gugat</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Teknis Permainan */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-green-600" />
                🎯 Teknis Permainan
              </h3>
              
              {/* Tujuan */}
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Tujuan
                </h4>
                <p className="text-green-700">
                  Masing-masing tim berbaris di sisi berlawanan dari jalur kardus. 
                  <strong> Tujuan: menjadi tim pertama yang berhasil mengirimkan satu pemainnya sampai ke kardus terakhir di area tim lawan.</strong>
                </p>
              </div>

              {/* Alur Permainan */}
              <div>
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Alur Permainan
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <p className="text-sm">Permainan dimulai dengan satu pemain dari masing-masing tim melompat di jalur kardus menuju area lawan</p>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <p className="text-sm">Saat kedua pemain berpapasan di jalur yang sama, mereka akan berhenti</p>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p className="text-sm font-semibold text-yellow-800">Fase Kuis</p>
                      <p className="text-sm text-yellow-700">Sebuah pertanyaan akan dikirimkan ke smartphone masing-masing pemain</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <p className="text-sm font-semibold text-green-800">Pemenang Putaran</p>
                      <p className="text-sm text-green-700">Pemain yang menjawab <strong>benar dan paling cepat</strong> berhak melanjutkan lompatannya menuju area tim lawan</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                    <div>
                      <p className="text-sm font-semibold text-red-800">Konsekuensi</p>
                      <p className="text-sm text-red-700">Pemain yang menjawab salah atau kalah cepat harus <strong>kembali ke garis awal timnya</strong></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                    <p className="text-sm">Jika pemain yang menang berhasil melewati satu kardus, pemain kedua dari tim yang kalah akan memulai lompatannya</p>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300">
                    <div className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold">🏆</div>
                    <div>
                      <p className="font-bold text-yellow-800">Kondisi Menang</p>
                      <p className="text-sm text-yellow-700">Pemenang adalah tim yang salah satu pemainnya berhasil mencapai <strong>kardus terakhir di area lawan</strong> lebih dulu. Begitu satu pemain sampai, permainan selesai!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Larangan */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <X className="w-6 h-6 text-red-600" />
                🚫 Larangan & Sanksi
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-800">Kontak Fisik Kasar</p>
                    <p className="text-sm text-red-700">Tidak diperkenankan melakukan kontak fisik kasar, mendorong, atau menjatuhkan lawan</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-orange-800">Keluar Jalur</p>
                    <p className="text-sm text-orange-700">Pemain yang keluar dari jalur kardus dianggap harus <strong>mengulang lompatan</strong> di kardus yang sama</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-red-100 rounded-lg border-2 border-red-300">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-red-800">Diskualifikasi</p>
                    <p className="text-sm text-red-700">Menghina wasit atau tim lain akan dikenai sanksi <strong>DISKUALIFIKASI</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Narahubung */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Phone className="w-6 h-6" />
                Narahubung
              </h3>
              <div className="space-y-2">
                <p className="font-semibold">Muhammad Rizkyawansyah</p>
                <p className="text-purple-100">(SIRS)</p>
                <p className="text-2xl font-bold">
                  <a href="https://wa.me/6285155380066" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    085155380066
                  </a>
                </p>
              </div>
            </div>

            {/* Batas Pendaftaran */}
            <div className="bg-gradient-to-r from-hijau-500 to-hijau-600 text-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Batas Pendaftaran
              </h3>
              <p className="text-2xl font-bold">12 Agustus 2025</p>
              <p className="text-hijau-100 text-sm">Jangan sampai terlambat!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 