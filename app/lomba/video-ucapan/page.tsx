'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Video, Calendar, MapPin, Mail, Phone, Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function VideoUcapanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-merah-50 via-white to-hijau-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-merah-600 via-oranye-500 to-hijau-600 text-white py-8">
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
              <h1 className="text-3xl font-bold">Video Ucapan HUT RI</h1>
              <p className="text-white/80">Buat video ucapan kreatif untuk HUT RI Ke-80</p>
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
                <Star className="w-12 h-12 text-merah-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Daftar Lomba Video Ucapan HUT RI</h2>
              <p className="text-gray-600">Pendaftaran dilakukan melalui Google Forms</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <a
                href="https://forms.gle/PuCXv5cNafYFsQH27"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-merah-600 to-oranye-600 text-white rounded-xl font-semibold hover:from-merah-700 hover:to-oranye-700 transition-all duration-300 transform hover:scale-105"
              >
                <Video className="w-5 h-5" />
                Daftar Sekarang
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Klik tombol di atas untuk membuka form pendaftaran
              </p>
            </motion.div>
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
                <Star className="w-5 h-5 text-merah-600" />
                Tema
              </h3>
              <p className="text-gray-700 italic">
                "80 Tahun Indonesia Merdeka: Bersatu Berdaulat, Rakyat Sejahtera, Indonesia Maju"
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
                <Video className="w-5 h-5 text-oranye-600" />
                Peserta
              </h3>
              <p className="text-gray-700">
                Seluruh unit kerja/instalasi/bagian di lingkungan RSJ Mutiara Sukma.
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
                <Calendar className="w-5 h-5 text-hijau-600" />
                Ketentuan Umum
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-merah-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Video berdurasi maksimal <strong>1 menit</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-oranye-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Berisi ucapan selamat HUT RI ke-80 dengan pesan semangat nasionalisme, optimisme, dan semangat pelayanan di bidang kesehatan jiwa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-hijau-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Boleh menggunakan atribut merah putih, kostum profesi, atau ornamen kemerdekaan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-merah-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Boleh menggunakan musik latar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-oranye-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Video harus orisinil dan belum pernah diikutkan dalam lomba lain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-hijau-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Wajib mencantumkan logo RSJ Mutiara Sukma dan tagline acara (bila ada)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-merah-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Video dikirim dalam format MP4</span>
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
                  <span className="font-bold text-merah-600">35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Kesesuaian dengan tema</span>
                  <span className="font-bold text-oranye-600">25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Kualitas video & audio</span>
                  <span className="font-bold text-hijau-600">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Kekompakan & semangat</span>
                  <span className="font-bold text-purple-600">20%</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-merah-600 to-oranye-600 text-white rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Narahubung
              </h3>
              <div className="space-y-2">
                <p className="text-lg font-semibold">Ida Ayu Sasih, S.Kep., Ns (Flamboyan)</p>
                <p className="text-2xl font-bold">
                  <a href="https://wa.me/6281907892957" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    081907892957
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