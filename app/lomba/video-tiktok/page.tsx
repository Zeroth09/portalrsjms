'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Video, Upload, CheckCircle2, AlertCircle, ExternalLink, Calendar, Users, Phone, Smartphone } from 'lucide-react'
import Link from 'next/link'

interface FormData {
  usernameAkun: string
  asalInstansi: string
  teleponPenanggungJawab: string
  linkTikTok: string
  buktiFollow: string
}

// Components
const Header = () => (
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
)

const StatusMessage = ({ status, message }: { status: 'success' | 'error', message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
      status === 'success' 
        ? 'bg-green-50 border border-green-200' 
        : 'bg-red-50 border border-red-200'
    }`}
  >
    {status === 'success' ? (
      <CheckCircle2 className="w-5 h-5 text-green-600" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-600" />
    )}
    <div>
      <p className={`font-medium ${
        status === 'success' ? 'text-green-800' : 'text-red-800'
      }`}>
        {status === 'success' ? 'Pendaftaran Berhasil!' : 'Pendaftaran Gagal'}
      </p>
      <p className={`text-sm ${
        status === 'success' ? 'text-green-700' : 'text-red-700'
      }`}>
        {message}
      </p>
    </div>
  </motion.div>
)

const GoogleFormsButton = () => (
  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <Upload className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-blue-800 mb-1">
          Upload Video Backup
        </h4>
        <p className="text-sm text-blue-700 mb-3">
          Upload copy video Anda sebagai backup menggunakan Google Forms. 
          Simple, reliable, dan 100% aman!
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeRHJEg7tyrwdDb9vpE3IbBdxQPzrbnMDL-RlQk9DJmMvbBFg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <Upload className="w-4 h-4" />
          Upload via Google Forms
          <ExternalLink className="w-3 h-3" />
        </a>
        <div className="mt-2 flex items-center gap-2 text-xs text-blue-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Recommended untuk file besar</span>
        </div>
      </div>
    </div>
  </div>
)

const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  helper 
}: {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  helper?: string
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && '*'}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      placeholder={placeholder}
      required={required}
    />
    {helper && (
      <p className="text-sm text-gray-500 mt-1">{helper}</p>
    )}
  </div>
)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Validate required fields
      if (!formData.usernameAkun || !formData.teleponPenanggungJawab || !formData.linkTikTok || !formData.buktiFollow) {
        setSubmitStatus('error')
        setErrorMessage('Semua field wajib diisi')
        return
      }

      const registrationData = {
        usernameAkun: formData.usernameAkun,
        asalInstansi: formData.asalInstansi,
        teleponPenanggungJawab: formData.teleponPenanggungJawab,
        linkTikTok: formData.linkTikTok,
        buktiFollow: formData.buktiFollow,
        jenisLomba: 'Video TikTok',
      }

      const response = await fetch('/api/pendaftaran', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData)
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
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar Lomba Video TikTok</h2>
            
            {submitStatus === 'success' && (
              <StatusMessage status="success" message="Data Anda telah tersimpan. Jangan lupa upload video melalui form Google di bawah!" />
            )}

            {submitStatus === 'error' && (
              <StatusMessage status="error" message={errorMessage} />
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Akun TikTok */}
              <FormField
                label="Username Akun TikTok"
                name="usernameAkun"
                value={formData.usernameAkun}
                onChange={handleInputChange}
                placeholder="@username"
                required
              />

              {/* Asal Instansi */}
              <FormField
                label="Asal Instansi (Optional)"
                name="asalInstansi"
                value={formData.asalInstansi}
                onChange={handleInputChange}
                placeholder="Nama instansi/sekolah"
              />

              {/* Telepon Penanggung Jawab */}
              <FormField
                label="Telepon Penanggung Jawab"
                name="teleponPenanggungJawab"
                type="tel"
                value={formData.teleponPenanggungJawab}
                onChange={handleInputChange}
                placeholder="08xxxxxxxxxx"
                required
              />

              {/* Link Postingan TikTok */}
              <div>
                <FormField
                  label="Link Postingan TikTok"
                  name="linkTikTok"
                  type="url"
                  value={formData.linkTikTok}
                  onChange={handleInputChange}
                  placeholder="https://www.tiktok.com/@username/video/..."
                  helper="Paste link video TikTok yang sudah diupload"
                  required
                />
                
                {/* Google Forms Upload Button */}
                <GoogleFormsButton />
              </div>

              {/* Link Screenshot Bukti Follow */}
              <FormField
                label="Link Screenshot Bukti Follow"
                name="buktiFollow"
                type="url"
                value={formData.buktiFollow}
                onChange={handleInputChange}
                placeholder="https://drive.google.com/..."
                helper="Upload screenshot bukti follow akun sosial media RSJ Mutiara Sukma (Instagram/Facebook/TikTok)"
                required
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-hijau-600 via-purple-500 to-hijau-600 text-white py-4 px-6 rounded-lg font-medium hover:from-hijau-700 hover:via-purple-600 hover:to-hijau-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang'}
              </button>
            </form>
          </motion.div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Info Lomba */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-600" />
                Info Lomba
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-hijau-600" />
                  <span>Deadline: 18 Agustus 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>Peserta: Masyarakat Umum (tidak termasuk CHRSJMS)</span>
                </div>
              </div>
            </div>

            {/* Ketentuan Lomba */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ketentuan Lomba Video Pendek (TikTok)</h3>
              <div className="space-y-6 text-gray-600">
                
                {/* Tema */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-lg">🎯 Tema Lomba:</h4>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-l-4 border-purple-500">
                    <p className="font-medium text-purple-800">"Rayakan Kemerdekaan dengan Kesehatan Jiwa"</p>
                  </div>
                </div>

                {/* Tujuan */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-lg">🎯 Tujuan:</h4>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Menumbuhkan kesadaran masyarakat akan pentingnya kesehatan jiwa</li>
                    <li>Menyemarakkan HUT ke-80 Kemerdekaan Republik Indonesia</li>
                  </ul>
                </div>
                
                {/* Ketentuan Utama */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">📋 Ketentuan Utama:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <p>Peserta adalah masyarakat umum dan <strong>tidak diperbolehkan peserta adalah pegawai RSJMS</strong></p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <p>Video berdurasi <strong>maksimal 60 detik</strong></p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <p>Sebelum mengupload video wajib <strong>follow akun resmi RSJ Mutiara Sukma</strong> dan mencantumkan hashtag <strong>#rsj_mutiarasukma</strong> dan <strong>#merdekajiwarsjms</strong></p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <p>Video yang diupload berisi <strong>kegiatan dalam upaya meningkatkan kesehatan jiwa</strong> baik di rumah, lingkungan sekitar maupun di tempat kerja</p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                      <p>Video harus <strong>original dan belum pernah diikutkan dalam lomba lain</strong></p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                      <p>Video harus <strong>bebas dari unsur politik dan SARA</strong></p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">7</div>
                      <p>Video paling lambat harus diupload ke akun TikTok dan dikirim ke link penilaian panitia paling lambat <strong>tanggal 18 Agustus 2025</strong></p>
                    </div>
                  </div>
                </div>

                {/* Kriteria Penilaian */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">🏆 Kriteria Penilaian:</h4>
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold">Kriteria</th>
                          <th className="px-4 py-3 text-center font-semibold">Bobot</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">Kreativitas</td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                              45%
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">Kesesuaian dengan tema</td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              30%
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">Kualitas video & audio</td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              25%
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Narahubung */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Narahubung</h3>
              <div className="space-y-2 text-gray-600">
                <p className="font-medium">Regina Salsa Gandi, S.Kep., Ns (Dahlia)</p>
                <a 
                  href="https://wa.me/6287862236921"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hijau-600 hover:text-hijau-800 flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  087862236921
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 