'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Bike, CheckCircle, AlertCircle, Phone, Calendar, Star } from 'lucide-react'
import Link from 'next/link'

interface FormData {
  namaPeserta: string
  unit: string
  teleponPenanggungJawab: string
}

export default function SepedaHiasPage() {
  const [formData, setFormData] = useState<FormData>({
    namaPeserta: '',
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
          namaTim: formData.namaPeserta, // Map nama peserta ke namaTim untuk kompatibilitas API
          unit: formData.unit,
          teleponPenanggungJawab: formData.teleponPenanggungJawab,
          jenisLomba: 'Sepeda Hias'
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          namaPeserta: '',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-putih to-hijau-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
            
          </div>
          <div className="flex items-center gap-4">
            <Bike className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Sepeda Hias</h1>
              <p className="text-blue-100">Lomba Perorangan - Dekorasi Sepeda dengan Tema Kemerdekaan</p>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Form Pendaftaran</h2>
            <p className="text-gray-600 mb-6">Lomba perorangan - daftarkan diri Anda sekarang!</p>
            
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
                    <p className="text-green-700 text-sm">Anda telah terdaftar untuk lomba Sepeda Hias. Mulai siapkan dekorasi terbaik!</p>
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
                <label htmlFor="namaPeserta" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Peserta *
                </label>
                <input
                  type="text"
                  id="namaPeserta"
                  name="namaPeserta"
                  value={formData.namaPeserta}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan nama peserta"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Lomba perorangan - satu peserta per pendaftaran
                </p>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan nama unit"
                />
              </div>

              <div>
                <label htmlFor="teleponPenanggungJawab" className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon *
                </label>
                <input
                  type="tel"
                  id="teleponPenanggungJawab"
                  name="teleponPenanggungJawab"
                  value={formData.teleponPenanggungJawab}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Masukkan nomor telepon"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Nomor telepon yang dapat dihubungi
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Bike className="w-6 h-6" />
                Info Lomba
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span><strong>Jenis:</strong> Lomba Perorangan</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span><strong>Peserta:</strong> 1 orang per pendaftaran</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span><strong>Kategori:</strong> Dekorasi Sepeda</span>
                </div>
              </div>
            </div>

            {/* Ketentuan */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-blue-600" />
                Ketentuan
              </h3>
              <div className="text-center py-8">
                <div className="text-4xl font-bold text-hijau-600 mb-2">To be Announced</div>
                <p className="text-gray-500">Ketentuan lomba akan diumumkan segera</p>
              </div>
            </div>

            {/* Kriteria Penilaian */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Kriteria Penilaian</h3>
              <div className="text-center py-8">
                <div className="text-4xl font-bold text-hijau-600 mb-2">To be Announced</div>
                <p className="text-gray-500">Kriteria penilaian akan diumumkan segera</p>
              </div>
            </div>

            {/* Tips Dekorasi */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tips Dekorasi</h3>
              <div className="text-center py-8">
                <div className="text-4xl font-bold text-hijau-600 mb-2">To be Announced</div>
                <p className="text-gray-500">Tips dekorasi akan diumumkan segera</p>
              </div>
            </div>

            {/* Narahubung */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Phone className="w-6 h-6" />
                Narahubung
              </h3>
              <div className="space-y-2">
                <p className="font-semibold">Eva Susanti</p>
                <p className="text-blue-100">(K3LRS)</p>
                <p className="text-2xl font-bold">
                  <a href="https://wa.me/6281933121398" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    081933121398
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
              <p className="text-2xl font-bold">14 Agustus 2025</p>
              <p className="text-hijau-100 text-sm">Jangan sampai terlambat!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 