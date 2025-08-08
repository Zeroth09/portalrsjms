'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Star, Clock, Award } from 'lucide-react'

interface TimelineEvent {
  date: string
  title: string
  description: string
  type: 'registration' | 'deadline' | 'event' | 'preparation' | 'peak'
}

const timelineEvents: TimelineEvent[] = [
  {
    date: '8-14 Agustus',
    title: 'Pendaftaran Lomba',
    description: 'Periode pendaftaran untuk semua lomba',
    type: 'registration'
  },
  {
    date: '12 Agustus',
    title: 'Deadline Pendaftaran Gobak Sodor & Duel Kardus',
    description: 'Batas akhir pendaftaran untuk lomba Gobak Sodor dan Duel Kardus Cerdas',
    type: 'deadline'
  },
  {
    date: '13 Agustus',
    title: 'Pelaksanaan Gobak Sodor & Duel Kardus',
    description: 'Hari pelaksanaan lomba Gobak Sodor dan Duel Kardus Cerdas',
    type: 'event'
  },
  {
    date: '14 Agustus',
    title: 'Deadline Pendaftaran Sepeda Hias',
    description: 'Batas akhir pendaftaran untuk lomba Sepeda Hias',
    type: 'deadline'
  },
  {
    date: '15 Agustus',
    title: 'Pelaksanaan Sepeda Hias',
    description: 'Hari pelaksanaan lomba Sepeda Hias',
    type: 'event'
  },
  {
    date: '15 Agustus',
    title: 'HARI PUNCAK RANGKAIAN HUT RI KE-80',
    description: 'Puncak acara perayaan HUT Kemerdekaan RI Ke-80',
    type: 'peak'
  },
  {
    date: '15 Agustus',
    title: 'Deadline Pendaftaran Video TikTok & Video HUT RI',
    description: 'Batas akhir pendaftaran untuk lomba Video TikTok dan Video Ucapan HUT RI',
    type: 'deadline'
  },
  {
    date: '16 Agustus',
    title: 'Persiapan Acara',
    description: 'Hari persiapan untuk upacara bendera',
    type: 'preparation'
  },
  {
    date: '17 Agustus',
    title: 'UPACARA BENDERA HUT RI KE-80',
    description: 'Upacara bendera dalam rangka HUT Kemerdekaan RI Ke-80',
    type: 'peak'
  }
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'registration':
      return <Calendar className="w-5 h-5" />
    case 'deadline':
      return <Clock className="w-5 h-5" />
    case 'event':
      return <Star className="w-5 h-5" />
    case 'preparation':
      return <Award className="w-5 h-5" />
    case 'peak':
      return <Star className="w-6 h-6 text-yellow-500" />
    default:
      return <Calendar className="w-5 h-5" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'registration':
      return 'text-blue-600'
    case 'deadline':
      return 'text-red-600'
    case 'event':
      return 'text-green-600'
    case 'preparation':
      return 'text-purple-600'
    case 'peak':
      return 'text-yellow-600'
    default:
      return 'text-gray-600'
  }
}

interface TimelineModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TimelineModal({ isOpen, onClose }: TimelineModalProps) {
  const handleScrollToLomba = () => {
    const lombaSection = document.getElementById('lomba-section')
    if (lombaSection) {
      lombaSection.scrollIntoView({ behavior: 'smooth' })
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-merah-600 via-oranye-500 to-hijau-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="w-8 h-8 text-yellow-300" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold">Timeline Acara</h2>
                    <p className="text-white/80">HUT Kemerdekaan RI Ke-80 RSJ Mutiara Sukma</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative p-4 rounded-xl border-2 border-gray-200 bg-gray-50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 p-2 rounded-full bg-white ${getTypeColor(event.type)}`}>
                        {getTypeIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                        <p className="text-sm opacity-80 mb-2">{event.description}</p>
                        <span className="inline-block px-3 py-1 bg-white/50 rounded-full text-xs font-medium">
                          {event.date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-6 border-t">
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleScrollToLomba}
                  className="px-6 py-2 bg-gradient-to-r from-merah-600 to-oranye-600 text-white rounded-lg font-medium hover:from-merah-700 hover:to-oranye-700 transition-all duration-300"
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