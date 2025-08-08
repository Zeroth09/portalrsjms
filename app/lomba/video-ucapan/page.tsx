'use client'

import React from 'react'
import { ArrowLeft, Video, ExternalLink, Calendar, Users, Phone } from 'lucide-react'
import Link from 'next/link'

export default function VideoUcapanPage() {
  const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc2_wl-mbt3zI-SVdE_K8-vO-cN54KbygizKIDuUyCs3_qiXQ/viewform'

  return (
    <div className="min-h-screen bg-gradient-to-br from-merah-50 via-putih to-hijau-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-merah-600 to-merah-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Video className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Video Ucapan HUT RI Ke-80</h1>
              <p className="text-merah-100">RSJ Mutiara Sukma</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* External Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-merah-500 to-merah-600 text-white rounded-xl p-6 mb-6">
                <Video className="w-12 h-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Form Pendaftaran</h2>
                <p className="text-merah-100">Klik tombol di bawah untuk mendaftar</p>
              </div>
              
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-merah-500 to-merah-600 hover:from-merah-600 hover:to-merah-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <ExternalLink className="w-5 h-5" />
                Daftar Video HUT RI
              </a>
              
              <p className="text-gray-500 text-sm mt-4">
                Form akan terbuka di tab baru
              </p>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Ketentuan */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-merah-500" />
                Ketentuan Lomba
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Durasi maksimal 2 menit</li>
                <li>• Format MP4</li>
                <li>• Tema kemerdekaan Indonesia</li>
                <li>• Kreatif dan original</li>
                <li>• Wajib mencantumkan logo RSJ Mutiara Sukma</li>
              </ul>
            </div>

            {/* Kriteria Penilaian */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-oranye-500" />
                Kriteria Penilaian
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Kreativitas (40%)</li>
                <li>• Pesan dan Makna (30%)</li>
                <li>• Teknik Pengambilan (20%)</li>
                <li>• Originalitas (10%)</li>
              </ul>
            </div>

            {/* Narahubung */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-hijau-500" />
                Narahubung
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>• Diky Rizky Wila</p>
                <p>• Telepon: 0818-0572-6766</p>
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
          </div>
        </div>
      </div>
    </div>
  )
} 