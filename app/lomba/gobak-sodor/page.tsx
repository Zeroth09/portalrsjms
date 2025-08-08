'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, CheckCircle, AlertCircle, Phone, Calendar, Trophy } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-oranye-50 via-putih to-hijau-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-oranye-600 to-oranye-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
            
          </div>
          <div className="flex items-center gap-4">
            <Users className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Gobak Sodor</h1>
              <p className="text-oranye-100">Lomba Beregu Tradisional</p>
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
                className="w-full bg-gradient-to-r from-oranye-600 to-oranye-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-oranye-700 hover:to-oranye-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <Trophy className="w-6 h-6 text-oranye-600" />
                Ketentuan Lomba
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-oranye-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Lomba bersifat beregu, terdiri dari 5 orang per tim</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-oranye-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Peserta wajib menggunakan pakaian olahraga dan sepatu anti-slip</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-oranye-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Permainan terdiri dari 2 babak, masing-masing 10 menit</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-oranye-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Tidak diperkenankan kontak fisik kasar</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-oranye-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Keputusan wasit bersifat mutlak</span>
                </li>
              </ul>
            </div>

            {/* Teknis Permainan */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Teknis Permainan</h3>
              <div className="space-y-3 text-gray-600">
                <p>• Tim penyerang berusaha melewati seluruh garis yang dijaga lawan</p>
                <p>• Tim penjaga menjaga garis horizontal dan vertikal</p>
                <p>• Poin diperoleh setiap kali penyerang berhasil melewati seluruh garis</p>
                <p>• Tim akan bergantian posisi setelah satu babak selesai</p>
              </div>
            </div>

            {/* Narahubung */}
            <div className="bg-gradient-to-r from-oranye-500 to-oranye-600 text-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Phone className="w-6 h-6" />
                Narahubung
              </h3>
              <div className="space-y-2">
                <p className="font-semibold">Jumratul Akbar, S.Kep., Ns</p>
                <p className="text-oranye-100">(Melati)</p>
                <p className="text-2xl font-bold">
                  <a href="https://wa.me/6285339151308" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    085339151308
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
              <p className="text-2xl font-bold">15 Agustus 2025</p>
              <p className="text-hijau-100 text-sm">Jangan sampai terlambat!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 