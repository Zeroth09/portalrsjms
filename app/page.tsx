'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Calendar, MapPin, Eye } from 'lucide-react'
import Link from 'next/link'
import TimelineModal from './components/TimelineModal'

export default function HomePage() {
  const [showTimelineModal, setShowTimelineModal] = useState(false)

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenTimelineModal')
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowTimelineModal(true)
        localStorage.setItem('hasSeenTimelineModal', 'true')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <TimelineModal 
        isOpen={showTimelineModal} 
        onClose={() => setShowTimelineModal(false)} 
      />
      
      <header className="relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-merah-600 via-oranye-500 to-hijau-600 opacity-90"
          animate={{
            background: [
              "linear-gradient(90deg, #dc2626 0%, #ea580c 50%, #16a34a 100%)",
              "linear-gradient(90deg, #16a34a 0%, #dc2626 50%, #ea580c 100%)",
              "linear-gradient(90deg, #ea580c 0%, #16a34a 50%, #dc2626 100%)",
              "linear-gradient(90deg, #dc2626 0%, #ea580c 50%, #16a34a 100%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative z-10 container mx-auto px-4 py-16 text-center text-white">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-8 h-8 text-yellow-300" />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold">
                Portal Lomba
              </h1>
              <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-8 h-8 text-yellow-300" />
              </motion.div>
            </motion.div>
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              HUT Kemerdekaan RI Ke-80
            </motion.h2>
            <motion.p 
              className="text-xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              RSJ Mutiara Sukma
            </motion.p>
            <motion.div 
              className="flex items-center justify-center gap-4 mt-6 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>17 Agustus 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>RSJ Mutiara Sukma</span>
              </div>
            </motion.div>
            <motion.div 
              className="mt-4 flex items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Link 
                href="/admin" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Lihat Data Pendaftaran</span>
              </Link>
              <motion.button
                onClick={() => setShowTimelineModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-4 h-4" />
                <span>Lihat Timeline</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section id="lomba-section" className="mb-16">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Pilih Lomba Favoritmu
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Berbagai lomba seru menanti partisipasi kalian dalam rangka memeriahkan HUT Kemerdekaan RI Ke-80
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 h-full">
              <div className="bg-gradient-to-r from-merah-500 to-merah-600 text-white rounded-xl p-4 mb-4 flex items-center justify-center">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Video Ucapan HUT RI
              </h3>
              <p className="text-gray-600 mb-4">
                Buat video ucapan kreatif untuk HUT RI Ke-80
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Batas: 15 Agustus 2024
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 h-full">
              <div className="bg-gradient-to-r from-oranye-500 to-oranye-600 text-white rounded-xl p-4 mb-4 flex items-center justify-center">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Gobak Sodor
              </h3>
              <p className="text-gray-600 mb-4">
                Lomba tradisional gobak sodor antar unit
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Batas: 12 Agustus 2024
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 h-full">
              <div className="bg-gradient-to-r from-hijau-500 to-hijau-600 text-white rounded-xl p-4 mb-4 flex items-center justify-center">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Video TikTok
              </h3>
              <p className="text-gray-600 mb-4">
                Buat konten TikTok bertema kemerdekaan
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Batas: 15 Agustus 2024
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 h-full">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-4 mb-4 flex items-center justify-center">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Duel Kardus Cerdas
              </h3>
              <p className="text-gray-600 mb-4">
                Lomba duel kecerdasan dengan aktivitas fisik menggunakan kardus
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Batas: 12 Agustus 2024
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 h-full">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 mb-4 flex items-center justify-center">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Sepeda Hias
              </h3>
              <p className="text-gray-600 mb-4">
                Dekorasi sepeda dengan tema kemerdekaan
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Batas: 14 Agustus 2024
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Star className="w-6 h-6 text-yellow-300" />
            <h3 className="text-xl font-bold">Portal Lomba RSJ Mutiara Sukma</h3>
            <Star className="w-6 h-6 text-yellow-300" />
          </div>
          <p className="text-gray-300 mb-4">
            Memeriahkan HUT Kemerdekaan RI Ke-80
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>17 Agustus 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>RSJ Mutiara Sukma</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 