'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, Search, Phone, Calendar, Users, Eye } from 'lucide-react'
import Link from 'next/link'

interface PendaftaranData {
  id: string
  namaTim: string
  unit: string
  usernameAkun?: string
  asalInstansi?: string
  teleponPenanggungJawab: string
  jenisLomba: string
  tanggalDaftar: string
  catatan?: string
}

export default function AdminPage() {
  const [pendaftaran, setPendaftaran] = useState<PendaftaranData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterJenisLomba, setFilterJenisLomba] = useState('')

  // Fetch data pendaftaran
  useEffect(() => {
    fetchPendaftaran()
  }, [])

  const fetchPendaftaran = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/pendaftaran')
      const result = await response.json()
      
      if (result.success) {
        setPendaftaran(result.data)
      } else {
        setError('Gagal mengambil data pendaftaran')
      }
    } catch (error) {
      setError('Terjadi kesalahan pada jaringan')
    } finally {
      setLoading(false)
    }
  }

  // Filter dan search data
  const filteredData = pendaftaran.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.namaTim?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.usernameAkun?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unit?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.asalInstansi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.teleponPenanggungJawab.includes(searchTerm) ||
      item.jenisLomba.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesJenisLomba = filterJenisLomba === '' || item.jenisLomba === filterJenisLomba
    
    return matchesSearch && matchesJenisLomba
  })

  // Get unique jenis lomba untuk filter
  const uniqueJenisLomba = Array.from(new Set(pendaftaran.map(item => item.jenisLomba)))

  const getDisplayName = (item: PendaftaranData) => {
    if (item.jenisLomba === 'Video TikTok') {
      return item.usernameAkun || 'N/A'
    }
    return item.namaTim || 'N/A'
  }

  const getDisplayUnit = (item: PendaftaranData) => {
    if (item.jenisLomba === 'Video TikTok') {
      return item.asalInstansi || '-'
    }
    return item.unit || 'N/A'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data pendaftaran...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Data Pendaftaran Lomba</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{pendaftaran.length} Total Pendaftar</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Filter dan Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari pendaftar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Jenis Lomba */}
            <div>
              <select
                value={filterJenisLomba}
                onChange={(e) => setFilterJenisLomba(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Semua Lomba</option>
                {uniqueJenisLomba.map(jenis => (
                  <option key={jenis} value={jenis}>{jenis}</option>
                ))}
              </select>
            </div>

            {/* Reset Filter */}
            <button
              onClick={() => {
                setSearchTerm('')
                setFilterJenisLomba('')
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pendaftar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit/Instansi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kontak
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lomba
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getDisplayName(item)}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {item.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getDisplayUnit(item)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {item.teleponPenanggungJawab}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {item.jenisLomba}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {item.tanggalDaftar}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tidak ada data pendaftaran
              </h3>
              <p className="text-gray-500">
                {searchTerm || filterJenisLomba 
                  ? 'Coba ubah filter atau kata kunci pencarian'
                  : 'Belum ada pendaftaran yang masuk'}
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <p className="text-sm font-medium text-gray-600 mb-2">Total Pendaftar</p>
                <p className="text-4xl font-bold text-gray-900">{pendaftaran.length}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Data pendaftaran lomba HUT RI Ke-80
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 