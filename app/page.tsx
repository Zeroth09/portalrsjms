import React from 'react'
import { 
  Users, Video, Gamepad2, Car, Bike, Trophy, Calendar, MapPin, Phone, Mail, ArrowRight, Star
} from 'lucide-react'
import Link from 'next/link'

const lombaData = [
  {
    id: 'video-ucapan',
    nama: 'Video Ucapan HUT RI',
    deskripsi: 'Buat video ucapan kreatif untuk HUT RI Ke-80',
    icon: Video,
    warna: 'from-merah-500 to-merah-600',
    bgColor: 'bg-gradient-to-r from-merah-500 to-merah-600',
    ketentuan: 'Durasi maksimal 2 menit, format MP4',
    kriteria: 'Kreativitas, Pesan, Teknik Pengambilan',
    narahubung: 'Sdr. Ahmad (0812-3456-7890)',
    batasDaftar: '15 Agustus 2024'
  },
  {
    id: 'gobak-sodor',
    nama: 'Gobak Sodor',
    deskripsi: 'Lomba tradisional gobak sodor antar unit',
    icon: Gamepad2,
    warna: 'from-oranye-500 to-oranye-600',
    bgColor: 'bg-gradient-to-r from-oranye-500 to-oranye-600',
    ketentuan: 'Tim 6 orang, durasi 10 menit',
    kriteria: 'Kerjasama, Strategi, Kecepatan',
    narahubung: 'Sdr. Budi (0812-3456-7891)',
    batasDaftar: '16 Agustus 2024'
  },
  {
    id: 'video-tiktok',
    nama: 'Video TikTok',
    deskripsi: 'Buat konten TikTok bertema kemerdekaan',
    icon: Video,
    warna: 'from-hijau-500 to-hijau-600',
    bgColor: 'bg-gradient-to-r from-hijau-500 to-hijau-600',
    ketentuan: 'Durasi 15-60 detik, tema kemerdekaan',
    kriteria: 'Kreativitas, Viralitas, Pesan',
    narahubung: 'Sdr. Citra (0812-3456-7892)',
    batasDaftar: '17 Agustus 2024'
  },
  {
    id: 'duel-kardus',
    nama: 'Duel Kardus',
    deskripsi: 'Lomba kreativitas membuat kostum dari kardus',
    icon: Car,
    warna: 'from-purple-500 to-purple-600',
    bgColor: 'bg-gradient-to-r from-purple-500 to-purple-600',
    ketentuan: 'Bahan utama kardus, durasi 30 menit',
    kriteria: 'Kreativitas, Kerapian, Originalitas',
    narahubung: 'Sdr. Dedi (0812-3456-7893)',
    batasDaftar: '18 Agustus 2024'
  },
  {
    id: 'sepeda-hias',
    nama: 'Sepeda Hias',
    deskripsi: 'Dekorasi sepeda dengan tema kemerdekaan',
    icon: Bike,
    warna: 'from-blue-500 to-blue-600',
    bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
    ketentuan: 'Sepeda sendiri, tema kemerdekaan',
    kriteria: 'Kreativitas, Kerapian, Tema',
    narahubung: 'Sdr. Eka (0812-3456-7894)',
    batasDaftar: '19 Agustus 2024'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-merah-600 via-oranye-500 to-hijau-600 opacity-90"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center text-white">
          <div className="transition-all duration-300">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Star className="w-8 h-8 text-yellow-300" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Portal Lomba
              </h1>
              <Star className="w-8 h-8 text-yellow-300" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              HUT Kemerdekaan RI Ke-80
            </h2>
            <p className="text-xl mb-6">
              RSJ Mutiara Sukma
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>17 Agustus 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>RSJ Mutiara Sukma</span>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/admin" className="text-white hover:text-gray-200 transition-colors text-sm underline">
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Pilih Lomba Section */}
        <section className="mb-16">
          <div className="text-center mb-12 transition-all duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Pilih Lomba Favoritmu
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Berbagai lomba seru menanti partisipasi kalian dalam rangka memeriahkan HUT Kemerdekaan RI Ke-80
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lombaData.map((lomba, index) => (
              <div key={lomba.id} className="group transition-all duration-300">
                <Link href={`/lomba/${lomba.id}`}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 h-full">
                    <div className={`${lomba.bgColor} text-white rounded-xl p-4 mb-4 flex items-center justify-center`}>
                      <lomba.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {lomba.nama}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {lomba.deskripsi}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Batas: {lomba.batasDaftar}
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Informasi Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <div className="transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Informasi Penting
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-oranye-500" />
                  Hadiah Menarik
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Juara 1: Rp 2.000.000</li>
                  <li>• Juara 2: Rp 1.500.000</li>
                  <li>• Juara 3: Rp 1.000.000</li>
                  <li>• Sertifikat untuk semua peserta</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-hijau-500" />
                  Kontak Panitia
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>• Ketua: Sdr. Ahmad (0812-3456-7890)</p>
                  <p>• Sekretaris: Sdr. Budi (0812-3456-7891)</p>
                  <p>• Bendahara: Sdr. Citra (0812-3456-7892)</p>
                  <p>• Email: panitia@rsjms.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
          <div className="mt-6">
            <Link href="/admin" className="text-gray-400 hover:text-white transition-colors text-sm">
              Admin Panel
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
} 