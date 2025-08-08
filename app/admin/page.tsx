'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  RefreshCw,
  Filter,
  Search,
  Calendar,
  Phone,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { PendaftaranData } from '@/lib/googleSheets'

export default function AdminPage() {
  const [pendaftaran, setPendaftaran] = useState<PendaftaranData[]>([])
  const [loading, setLoading] = useState(true)
  const [filterJenisLomba, setFilterJenisLomba] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPendaftaran, setSelectedPendaftaran] = useState<PendaftaranData | null>(null)

  // Fetch data pendaftaran
  const fetchPendaftaran = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/pendaftaran')
      const result = await response.json()
      
      if (result.success) {
        setPendaftaran(result.data)
      }
    } catch (error) {
      console.error('Error fetching pendaftaran:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPendaftaran()
  }, [])

  // Filter dan search data
  const filteredPendaftaran = pendaftaran.filter(item => {
    const matchesJenisLomba = !filterJenisLomba || item.jenisLomba === filterJenisLomba
    const matchesSearch = !searchTerm || 
      item.namaTim.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.teleponPenanggungJawab.includes(searchTerm)
    
    return matchesJenisLomba && matchesSearch
  })

  // Update status pendaftaran
  const updateStatus = async (id: string, status: 'approved' | 'rejected', catatan?: string) => {
    try {
      const response = await fetch(`/api/pendaftaran/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, catatan }),
      })

      const result = await response.json()
      
      if (result.success) {
        await fetchPendaftaran() // Refresh data
        setSelectedPendaftaran(null)
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  // Delete pendaftaran
  const deletePendaftaran = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pendaftaran ini?')) return

    try {
      const response = await fetch(`/api/pendaftaran/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()
      
      if (result.success) {
        await fetchPendaftaran() // Refresh data
      }
    } catch (error) {
      console.error('Error deleting pendaftaran:', error)
    }
  }

  // Get unique jenis lomba untuk filter
  const uniqueJenisLomba = Array.from(new Set(pendaftaran.map(item => item.jenisLomba)))

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      default:
        return <RefreshCw className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-merah-50 via-putih to-hijau-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-white">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-gray-300">Kelola Pendaftaran Lomba</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Pendaftaran</p>
                <p className="text-2xl font-bold text-gray-800">{pendaftaran.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {pendaftaran.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <RefreshCw className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Disetujui</p>
                <p className="text-2xl font-bold text-green-600">
                  {pendaftaran.filter(p => p.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Ditolak</p>
                <p className="text-2xl font-bold text-red-600">
                  {pendaftaran.filter(p => p.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter Jenis Lomba
              </label>
              <select
                value={filterJenisLomba}
                onChange={(e) => setFilterJenisLomba(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-merah-500 focus:border-transparent"
              >
                <option value="">Semua Lomba</option>
                {uniqueJenisLomba.map(jenis => (
                  <option key={jenis} value={jenis}>{jenis}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari nama tim, unit, atau telepon..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-merah-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={fetchPendaftaran}
                disabled={loading}
                className="w-full bg-gradient-to-r from-merah-600 to-merah-700 text-white py-2 px-4 rounded-lg font-semibold hover:from-merah-700 hover:to-merah-800 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Memuat...' : 'Refresh Data'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tim
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lomba
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPendaftaran.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.namaTim}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {item.teleponPenanggungJawab}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.jenisLomba}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1">{item.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.tanggalDaftar}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedPendaftaran(item)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {item.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(item.id!, 'approved')}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateStatus(item.id!, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deletePendaftaran(item.id!)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPendaftaran.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Tidak ada data pendaftaran</p>
            </div>
          )}
        </motion.div>

        {/* Detail Modal */}
        {selectedPendaftaran && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Detail Pendaftaran</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nama Tim</label>
                  <p className="text-gray-900">{selectedPendaftaran.namaTim}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Unit</label>
                  <p className="text-gray-900">{selectedPendaftaran.unit}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Telepon</label>
                  <p className="text-gray-900">{selectedPendaftaran.teleponPenanggungJawab}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Jenis Lomba</label>
                  <p className="text-gray-900">{selectedPendaftaran.jenisLomba}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedPendaftaran.status)}`}>
                    {getStatusIcon(selectedPendaftaran.status)}
                    <span className="ml-1">{selectedPendaftaran.status}</span>
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tanggal Daftar</label>
                  <p className="text-gray-900">{selectedPendaftaran.tanggalDaftar}</p>
                </div>
                {selectedPendaftaran.catatan && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Catatan</label>
                    <p className="text-gray-900">{selectedPendaftaran.catatan}</p>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedPendaftaran(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
} 