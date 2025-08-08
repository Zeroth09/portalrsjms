'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Star, Users, Trophy, Flag, Clock } from 'lucide-react'

interface TimelineEvent {
  date: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
  status: 'completed' | 'ongoing' | 'upcoming'
}

const timelineEvents: TimelineEvent[] = [
  {
    date: '1-10 Agustus 2024',
    title: 'Pendaftaran Lomba',
    description: 'Pendaftaran dibuka untuk semua lomba. Peserta dapat mendaftar melalui portal online.',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    status: 'ongoing'
  },
  {
    date: '12 Agustus 2024',
    title: 'Deadline Gobak Sodor & Duel Kardus',
    description: 'Batas akhir pendaftaran untuk lomba Gobak Sodor dan Duel Kardus Cerdas.',
    icon: Clock,
    color: 'from-orange-500 to-orange-600',
    status: 'upcoming'
  },
  {
    date: '14 Agustus 2024',
    title: 'Deadline Sepeda Hias',
    description: 'Batas akhir pendaftaran untuk lomba Sepeda Hias.',
    icon: Clock,
    color: 'from-blue-500 to-blue-600',
    status: 'upcoming'
  },
  {
    date: '15 Agustus 2024',
    title: 'Deadline Video TikTok & Video HUT RI',
    description: 'Batas akhir pendaftaran untuk lomba Video TikTok dan Video Ucapan HUT RI.',
    icon: Clock,
    color: 'from-green-500 to-green-600',
    status: 'upcoming'
  },
  {
    date: '16 Agustus 2024',
    title: 'Persiapan Acara',
    description: 'Tim panitia melakukan persiapan final untuk acara puncak.',
    icon: Star,
    color: 'from-purple-500 to-purple-600',
    status: 'upcoming'
  },
  {
    date: '17 Agustus 2024',
    title: 'PUNCAK ACARA HUT RI KE-80',
    description: 'Perayaan puncak HUT Kemerdekaan RI Ke-80 RSJ Mutiara Sukma dengan berbagai lomba dan acara.',
    icon: Flag,
    color: 'from-red-500 to-red-600',
    status: 'upcoming'
  }
]

interface TimelineModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TimelineModal({ isOpen, onClose }: TimelineModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'ongoing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'upcoming':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Selesai'
      case 'ongoing':
        return 'Sedang Berlangsung'
      case 'upcoming':
        return 'Akan Datang'
      default:
        return 'Akan Datang'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-merah-600 via-oranye-500 to-hijau-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Timeline Acara</h2>
                    <p className="text-white/80">HUT Kemerdekaan RI Ke-80 RSJ Mutiara Sukma</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  🎉 Selamat Datang di Portal Lomba HUT RI Ke-80!
                </h3>
                <p className="text-gray-600">
                  Berikut adalah timeline acara dari pendaftaran hingga puncak perayaan. 
                  Pastikan tidak melewatkan deadline pendaftaran lomba favoritmu!
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="relative"
                  >
                    {/* Timeline Line */}
                    {index < timelineEvents.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                    )}

                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <motion.div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${event.color} text-white flex items-center justify-center flex-shrink-0`}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <event.icon className="w-6 h-6" />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-800">
                            {event.title}
                          </h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(event.status)}`}>
                            {getStatusText(event.status)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          📅 {event.date}
                        </p>
                        <p className="text-gray-600">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">🏆 Hadiah Menanti!</h4>
                    <p className="text-sm text-gray-600">
                      Jangan lewatkan kesempatan memenangkan hadiah menarik di setiap lomba. 
                      Ayo daftar sekarang dan tunjukkan kreativitasmu!
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <motion.button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Mulai Jelajahi
                </motion.button>
                <motion.button
                  onClick={() => {
                    onClose()
                    // Scroll to lomba section
                    document.querySelector('#lomba-section')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    })
                  }}
                  className="flex-1 bg-gradient-to-r from-merah-500 to-merah-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-merah-600 hover:to-merah-700 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Lihat Lomba
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 