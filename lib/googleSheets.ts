import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

// Konfigurasi Google Sheets
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || 'your-spreadsheet-id'
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 'portal-lomba-service@portal-lomba-rsjms.iam.gserviceaccount.com'
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDT/G39odBmu1x3\nrpp/XV15pMIHtk7vV0vnwGNlfGcwI2N7/OlG0MQiAqnw0gjzBARYoJ62JptUWwrS\npf8BigSDhX7RqqcGzEEk9nU9d4uJoD4tKNbLBwZu0PSmvrpHDZidTqUfdjUVB0L7\np4QF+C384kMXlsdd4rQoZcCTaYtCfOGLXXDFaNtI1mO284fgFv9dWW1jcyDwm4PH\nNzin6cTxmXnUTNLSPsIPa3qcW4b2eKmAJ6qscMkQXQsyJoC66Ijm8k43foFX4d0d\nc5ZIDsvtOg0TPm+EPCvCsTcmzbtB/72f3SpA8QV4x59HHoSlLQBc2FiXfRhvrd3s\nnRdlL9qrAgMBAAECggEAB/EoexzO3qpyV8GLju4D4donCCbvuiPTzNuhCF0AI1uQ\nD0XLGkNutbTSgm/mtJltQuzG8B1uKwY7gjzZ2vLoIbf5/QefDlrPWKqAe0xj8US2\n+kt8u0qIwSoZoGL7k6Hnb9f8c7tNWHusf2/SkG6wj7g3ufCE3k2aC6a+75xAAr5I\nNwk0f6ycCckhw4yka/bU7HCA6YC8+bCwJXCJqCEZN+jYTSjKiwR3JPIC6ICcwE1O\n4Ztoq3wP73rE7a+8zQBjyiUOPIXSMtucSW7JIZVXpvtAcPSLqe69Af0pvkKviTu+\nJu40N+7YKWT7soYUp2MFu4Q5kTyE2CRHHlwheeulsQKBgQDum5Jz8an2iGKBtiOJ\nu/qdlIApSbdnxZ5PCW/b0I0yeXjdFWOOsBbGISZdAwQT64aC9M966p8zzWxYN8HK\n86neQVUAVLrzbKgzGKF+8ldaQDRJCa8mFxiVtOd6QvYFR0el8bAHbf/DQaP7eQQm\nIZ+2mQGauUKBEhr/6xeMTm98PwKBgQDjcBi/Jp+TPx1ArBvUX2j1FGULunk5KHPN\n/o8V33wgpe1LANSVaKv2x27n0LhsEOreKPWp/751izmj/HqN8T4qw9UCpuk46JqU\nJ2TD0Qt9dWQUXh5FWFBkAFrmTsWFVPJnnVFwT87XkHo0BGmOQJRUsO/cOt/xlpe9\njGiTSRj2lQKBgD2AI9N2qpQ8uwcr5yUNKp+LMy1xLrC0owVELWy+6GXmIVz6slqI\n0JXo3XaD3H0168m9R+0qpDY58H8cf/rLqzD6LeqT7Evp6cChzJ5n4FQG0HMy584t\njcyogDFnKPpbUQBYt0Jy+8VcGeQrYQJjEEOEVIGI1rdl70efVMZ5QQsJAoGBAIC6\nAHeoP6dSkJb7EqFIAxq7mVljCJuORsUvsAKcRCAiacUKykdqP/Jj/GSeYNNhW92z\n5x95zW2wCEbFbwQJp7sCrfxbRiNcm6kBBupB1jQDDkrs3ks3agC/prM1oFwPsUdt\n5hsgQJ0He/MXEDtgV9P7dTb756ZQKsAwyTubotJlAoGAbdwnmeGhm8FigDDqsRmH\nI5ShgAtn5NhcfBbjD8FWVIAn3AwR78GNVwmrOimTwfTs9xZxv74JJIeJ+yv/ePe+\nDDU71QRaJP9/F9sAB2qdvWAUCfKrittos2dnGCRd13KWoB2pBU5gZN9NqH2jCXCR\n4lpsSPWm4nCXETHx7Z2BNJY=\n-----END PRIVATE KEY-----\n'

// Inisialisasi Google Sheets
const initGoogleSheets = async () => {
  const serviceAccountAuth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  })

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth)
  await doc.loadInfo()
  return doc
}

// Interface untuk data pendaftaran
export interface PendaftaranData {
  id?: string
  namaTim: string
  unit: string
  teleponPenanggungJawab: string
  jenisLomba: string
  tanggalDaftar: string
  status: 'pending' | 'approved' | 'rejected'
  catatan?: string
}

// Interface untuk data lomba
export interface LombaData {
  id: string
  nama: string
  deskripsi: string
  ketentuan: string[]
  narahubung: string
  telepon: string
  batasPendaftaran: string
}

// CRUD Operations untuk Pendaftaran
export const pendaftaranService = {
  // Create - Menambah pendaftaran baru
  async create(data: PendaftaranData): Promise<void> {
    try {
      const doc = await initGoogleSheets()
      const sheet = doc.sheetsByIndex[0] // Sheet pertama untuk pendaftaran
      
      await sheet.addRow({
        'Nama Tim': data.namaTim,
        'Unit': data.unit,
        'Telepon Penanggung Jawab': data.teleponPenanggungJawab,
        'Jenis Lomba': data.jenisLomba,
        'Tanggal Daftar': data.tanggalDaftar,
        'Status': data.status,
        'Catatan': data.catatan || ''
      })
    } catch (error) {
      console.error('Error creating pendaftaran:', error)
      throw new Error('Gagal menambah pendaftaran')
    }
  },

  // Read - Mengambil semua pendaftaran
  async getAll(): Promise<PendaftaranData[]> {
    try {
      const doc = await initGoogleSheets()
      const sheet = doc.sheetsByIndex[0]
      const rows = await sheet.getRows()
      
      return rows.map((row, index) => ({
        id: (index + 1).toString(),
        namaTim: row.get('Nama Tim') || '',
        unit: row.get('Unit') || '',
        teleponPenanggungJawab: row.get('Telepon Penanggung Jawab') || '',
        jenisLomba: row.get('Jenis Lomba') || '',
        tanggalDaftar: row.get('Tanggal Daftar') || '',
        status: (row.get('Status') as 'pending' | 'approved' | 'rejected') || 'pending',
        catatan: row.get('Catatan') || ''
      }))
    } catch (error) {
      console.error('Error getting pendaftaran:', error)
      throw new Error('Gagal mengambil data pendaftaran')
    }
  },

  // Read - Mengambil pendaftaran berdasarkan jenis lomba
  async getByJenisLomba(jenisLomba: string): Promise<PendaftaranData[]> {
    try {
      const allData = await this.getAll()
      return allData.filter(data => data.jenisLomba === jenisLomba)
    } catch (error) {
      console.error('Error getting pendaftaran by jenis lomba:', error)
      throw new Error('Gagal mengambil data pendaftaran')
    }
  },

  // Update - Mengupdate status pendaftaran
  async updateStatus(id: string, status: 'pending' | 'approved' | 'rejected', catatan?: string): Promise<void> {
    try {
      const doc = await initGoogleSheets()
      const sheet = doc.sheetsByIndex[0]
      const rows = await sheet.getRows()
      
      const rowIndex = parseInt(id) - 1
      if (rowIndex >= 0 && rowIndex < rows.length) {
        const row = rows[rowIndex]
        row.set('Status', status)
        if (catatan) {
          row.set('Catatan', catatan)
        }
        await row.save()
      }
    } catch (error) {
      console.error('Error updating pendaftaran:', error)
      throw new Error('Gagal mengupdate status pendaftaran')
    }
  },

  // Delete - Menghapus pendaftaran
  async delete(id: string): Promise<void> {
    try {
      const doc = await initGoogleSheets()
      const sheet = doc.sheetsByIndex[0]
      const rows = await sheet.getRows()
      
      const rowIndex = parseInt(id) - 1
      if (rowIndex >= 0 && rowIndex < rows.length) {
        await rows[rowIndex].delete()
      }
    } catch (error) {
      console.error('Error deleting pendaftaran:', error)
      throw new Error('Gagal menghapus pendaftaran')
    }
  }
}

// Data lomba statis
export const lombaData: LombaData[] = [
  {
    id: 'video-ucapan',
    nama: 'Video Ucapan HUT RI Ke-80',
    deskripsi: 'Video ucapan selamat HUT RI ke-80 dengan durasi maksimal 1 menit',
    ketentuan: [
      'Video berdurasi maksimal 1 menit',
      'Berisi ucapan selamat HUT RI ke-80',
      'Boleh menggunakan atribut merah putih',
      'Wajib mencantumkan logo RSJ Mutiara Sukma',
      'Video harus orisinil'
    ],
    narahubung: 'Ida Ayu Sasih, S.Kep., Ns',
    telepon: '081907892957',
    batasPendaftaran: '15 Agustus 2025'
  },
  {
    id: 'gobak-sodor',
    nama: 'Gobak Sodor',
    deskripsi: 'Lomba beregu 5 orang dengan permainan tradisional gobak sodor',
    ketentuan: [
      'Lomba bersifat beregu, terdiri dari 5 orang per tim',
      'Peserta wajib menggunakan pakaian olahraga',
      'Permainan terdiri dari 2 babak, masing-masing 10 menit',
      'Tidak diperkenankan kontak fisik kasar',
      'Keputusan wasit bersifat mutlak'
    ],
    narahubung: 'Jumratul Akbar, S.Kep., Ns',
    telepon: '085339151308',
    batasPendaftaran: '15 Agustus 2025'
  },
  {
    id: 'duel-kardus',
    nama: 'Duel Kardus Cerdas',
    deskripsi: 'Kompetisi kreativitas menggunakan kardus dengan tema kemerdekaan',
    ketentuan: [
      'Menggunakan bahan kardus sebagai media utama',
      'Tema kemerdekaan Indonesia',
      'Kreativitas dan inovasi dalam desain',
      'Presentasi hasil karya',
      'Karya harus orisinil'
    ],
    narahubung: 'Panitia RSJMS',
    telepon: '-',
    batasPendaftaran: '15 Agustus 2025'
  },
  {
    id: 'video-tiktok',
    nama: 'Video Pendek TikTok',
    deskripsi: 'Video kreatif dengan tema kesehatan jiwa untuk masyarakat umum',
    ketentuan: [
      'Peserta adalah masyarakat umum (bukan pegawai RSJMS)',
      'Video berdurasi maksimal 60 detik',
      'Wajib follow akun resmi RSJ Mutiara Sukma',
      'Gunakan hashtag #rsj_mutiarasukma dan #merdekajiwarsjms',
      'Video bebas dari unsur politik dan SARA'
    ],
    narahubung: 'Regina Salsa Gandi, S.Kep., Ns',
    telepon: '087862236921',
    batasPendaftaran: '15 Agustus 2025'
  },
  {
    id: 'sepeda-hias',
    nama: 'Sepeda Hias',
    deskripsi: 'Lomba menghias sepeda dengan tema kemerdekaan Indonesia',
    ketentuan: [
      'Menghias sepeda dengan tema kemerdekaan',
      'Menggunakan bahan yang aman dan tidak merusak sepeda',
      'Kreativitas dalam dekorasi',
      'Presentasi hasil hiasan',
      'Sepeda harus bisa dikendarai'
    ],
    narahubung: 'Panitia RSJMS',
    telepon: '-',
    batasPendaftaran: '15 Agustus 2025'
  }
] 