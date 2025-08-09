'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Calendar, MapPin, Phone, Star, ArrowLeft, Users, Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface FormData {
  namaTim: string
  unit: string
  teleponPenanggungJawab: string
}

export default function GobakSodorPage() {
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
          jenisLomba: 'Gobak Sodor'
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
    <div className="min-h-screen bg-gradient-to-br from-oranye-50 via-white to-merah-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-oranye-600 via-merah-500 to-oranye-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Gobak Sodor</h1>
              <p className="text-white/80">Lomba tradisional gobak sodor antar unit</p>
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
                <Star className="w-12 h-12 text-oranye-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Daftar Lomba Gobak Sodor</h2>
              <p className="text-gray-600">Pendaftaran dilakukan melalui form online</p>
            </div>

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
                    <p className="text-green-700 text-sm">Tim Anda telah terdaftar untuk lomba Gobak Sodor. Tim kami akan menghubungi untuk briefing teknis.</p>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oranye-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan nama tim (5 orang)"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oranye-500 focus:border-transparent transition-colors"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oranye-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan nomor telepon"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-oranye-600 to-merah-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-oranye-700 hover:to-merah-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
            {/* Ketentuan Umum */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-oranye-600" />
                Ketentuan Umum
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-oranye-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Lomba bersifat <strong>beregu</strong>, terdiri dari <strong>5 orang per tim</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-merah-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Peserta wajib menggunakan <strong>pakaian olahraga</strong> dan <strong>sepatu yang aman (anti-slip)</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-oranye-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Seluruh peserta wajib hadir <strong>30 menit</strong> sebelum pertandingan dimulai untuk briefing teknis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-merah-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Keputusan juri dan wasit bersifat <strong>mutlak</strong> dan tidak dapat diganggu gugat</span>
                </li>
              </ul>
            </motion.div>

            {/* Teknis Permainan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-merah-600" />
                Teknis Permainan
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-oranye-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Permainan terdiri dari <strong>2 babak</strong>, masing-masing berdurasi <strong>10 menit</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-merah-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Tim penyerang berusaha melewati seluruh garis yang dijaga lawan <strong>tanpa tersentuh</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-oranye-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Tim penjaga menjaga garis horizontal dan vertikal dan mencoba <strong>menyentuh penyerang</strong> untuk menghentikan pergerakannya</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-merah-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Poin diperoleh setiap kali penyerang berhasil melewati seluruh garis dan <strong>kembali ke garis awal</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-oranye-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Tim akan bergantian posisi (penjaga dan penyerang) setelah <strong>satu babak selesai</strong></span>
                </li>
              </ul>
            </motion.div>

            {/* Larangan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Larangan
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Tidak diperkenankan melakukan <strong>kontak fisik kasar</strong>, mendorong, atau menjatuhkan lawan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Pemain yang keluar dari lapangan permainan dianggap <strong>keluar dari permainan sementara</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Menghina wasit atau tim lain akan dikenai sanksi <strong>diskualifikasi</strong></span>
                </li>
              </ul>
            </motion.div>

            {/* Batas Pendaftaran */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Batas Pendaftaran
              </h3>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600 mb-2">12 Agustus 2025</p>
                <p className="text-sm text-gray-500">Pendaftaran ditutup pada pukul 23:59 WITA</p>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-oranye-600 to-merah-600 text-white rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Narahubung
              </h3>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Jumratul Akbar, S.Kep., Ns (Melati)</p>
                <p className="text-2xl font-bold">
                  <a href="https://wa.me/6285339151308" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    085339151308
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