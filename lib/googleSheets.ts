import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

// Konfigurasi Google Sheets
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY

// Validasi environment variables
if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  console.error('Missing required environment variables:')
  console.error('GOOGLE_SPREADSHEET_ID:', !!SPREADSHEET_ID)
  console.error('GOOGLE_SERVICE_ACCOUNT_EMAIL:', !!GOOGLE_SERVICE_ACCOUNT_EMAIL)
  console.error('GOOGLE_PRIVATE_KEY:', !!GOOGLE_PRIVATE_KEY)
}

// Inisialisasi Google Sheets
const initGoogleSheets = async () => {
  try {
    if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      throw new Error('Environment variables tidak lengkap')
    }

    // Perbaiki format private key dengan lebih hati-hati
    let privateKey = GOOGLE_PRIVATE_KEY
    
    // Hapus semua escape characters dan format ulang
    privateKey = privateKey
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\\\/g, '\\')
    
    // Pastikan private key dimulai dan berakhir dengan benar
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      throw new Error('Format private key tidak valid')
    }
    
    if (!privateKey.includes('-----END PRIVATE KEY-----')) {
      throw new Error('Format private key tidak valid')
    }

    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    })

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth)
    await doc.loadInfo()
    return doc
  } catch (error) {
    console.error('Error initializing Google Sheets:', error)
    throw new Error('Gagal menginisialisasi Google Sheets: ' + (error instanceof Error ? error.message : 'Unknown error'))
  }
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

// Mapping jenis lomba ke nama sheet
const getSheetNameByJenisLomba = (jenisLomba: string): string => {
  const mapping: { [key: string]: string } = {
    'Video Ucapan HUT RI': 'Video_Ucapan_HUT_RI',
    'Gobak Sodor': 'Gobak_Sodor',
    'Video TikTok': 'Video_TikTok',
    'Duel Kardus Cerdas': 'Duel_Kardus_Cerdas',
    'Sepeda Hias': 'Sepeda_Hias'
  }
  return mapping[jenisLomba] || 'Pendaftaran_Umum'
}

// CRUD Operations untuk Pendaftaran
export const pendaftaranService = {
  // Create - Menambah pendaftaran baru
  async create(data: PendaftaranData): Promise<void> {
    try {
      // Fallback untuk testing jika environment variables bermasalah
      if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.log('Environment variables tidak lengkap, menggunakan fallback mode')
        console.log('Data yang akan disimpan:', data)
        // Simulasi berhasil untuk testing
        return
      }

      const doc = await initGoogleSheets()
      const sheetName = getSheetNameByJenisLomba(data.jenisLomba)
      
      // Cari sheet berdasarkan nama, jika tidak ada buat baru
      let sheet = doc.sheetsByTitle[sheetName]
      if (!sheet) {
        sheet = await doc.addSheet({ title: sheetName })
        // Set header untuk sheet baru
        await sheet.setHeaderRow([
          'Nama Tim',
          'Unit',
          'Telepon Penanggung Jawab', 
          'Jenis Lomba',
          'Tanggal Daftar',
          'Status',
          'Catatan'
        ])
      }
      
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
      throw new Error('Gagal menambah pendaftaran: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  },

  // Read - Mengambil semua pendaftaran dari semua sheet
  async getAll(): Promise<PendaftaranData[]> {
    try {
      // Fallback untuk testing jika environment variables bermasalah
      if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.log('Environment variables tidak lengkap, menggunakan fallback mode')
        return []
      }

      const doc = await initGoogleSheets()
      const allPendaftaran: PendaftaranData[] = []
      
      // Ambil data dari semua sheet yang ada
      for (const sheet of doc.sheetsByIndex) {
        try {
          const rows = await sheet.getRows()
          const sheetData = rows.map((row, index) => ({
            id: `${sheet.title}_${index + 1}`,
            namaTim: row.get('Nama Tim') || '',
            unit: row.get('Unit') || '',
            teleponPenanggungJawab: row.get('Telepon Penanggung Jawab') || '',
            jenisLomba: row.get('Jenis Lomba') || '',
            tanggalDaftar: row.get('Tanggal Daftar') || '',
            status: (row.get('Status') as 'pending' | 'approved' | 'rejected') || 'pending',
            catatan: row.get('Catatan') || ''
          }))
          allPendaftaran.push(...sheetData)
        } catch (error) {
          console.error(`Error reading sheet ${sheet.title}:`, error)
        }
      }
      
      return allPendaftaran
    } catch (error) {
      console.error('Error getting pendaftaran:', error)
      throw new Error('Gagal mengambil data pendaftaran: ' + (error instanceof Error ? error.message : 'Unknown error'))
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
      // Fallback untuk testing jika environment variables bermasalah
      if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.log('Environment variables tidak lengkap, menggunakan fallback mode')
        return
      }

      const doc = await initGoogleSheets()
      
      // Parse ID untuk mendapatkan sheet name dan row index
      const [sheetName, rowIndexStr] = id.split('_')
      const rowIndex = parseInt(rowIndexStr) - 1
      
      const sheet = doc.sheetsByTitle[sheetName]
      if (sheet && rowIndex >= 0) {
        const rows = await sheet.getRows()
        if (rowIndex < rows.length) {
          const row = rows[rowIndex]
          row.set('Status', status)
          if (catatan) {
            row.set('Catatan', catatan)
          }
          await row.save()
        }
      }
    } catch (error) {
      console.error('Error updating status:', error)
      throw new Error('Gagal mengupdate status')
    }
  },

  // Delete - Menghapus pendaftaran
  async delete(id: string): Promise<void> {
    try {
      // Fallback untuk testing jika environment variables bermasalah
      if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.log('Environment variables tidak lengkap, menggunakan fallback mode')
        return
      }

      const doc = await initGoogleSheets()
      
      // Parse ID untuk mendapatkan sheet name dan row index
      const [sheetName, rowIndexStr] = id.split('_')
      const rowIndex = parseInt(rowIndexStr) - 1
      
      const sheet = doc.sheetsByTitle[sheetName]
      if (sheet && rowIndex >= 0) {
        const rows = await sheet.getRows()
        if (rowIndex < rows.length) {
          await rows[rowIndex].delete()
        }
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
    nama: 'Video Ucapan HUT RI',
    deskripsi: 'Buat video ucapan kreatif untuk HUT RI Ke-80',
    ketentuan: [
      'Durasi maksimal 2 menit',
      'Format MP4',
      'Tema kemerdekaan',
      'Kreatif dan original'
    ],
    narahubung: 'Sdr. Ahmad',
    telepon: '0812-3456-7890',
    batasPendaftaran: '15 Agustus 2024'
  },
  {
    id: 'gobak-sodor',
    nama: 'Gobak Sodor',
    deskripsi: 'Lomba tradisional gobak sodor antar unit',
    ketentuan: [
      'Tim 6 orang',
      'Durasi 10 menit',
      'Lokasi lapangan RSJ',
      'Peraturan standar gobak sodor'
    ],
    narahubung: 'Sdr. Budi',
    telepon: '0812-3456-7891',
    batasPendaftaran: '12 Agustus 2024'
  },
  {
    id: 'video-tiktok',
    nama: 'Video TikTok',
    deskripsi: 'Buat konten TikTok bertema kemerdekaan',
    ketentuan: [
      'Durasi 15-60 detik',
      'Tema kemerdekaan',
      'Upload di TikTok',
      'Tag @rsjmutiarasukma'
    ],
    narahubung: 'Sdr. Citra',
    telepon: '0812-3456-7892',
    batasPendaftaran: '15 Agustus 2024'
  },
  {
    id: 'duel-kardus',
    nama: 'Duel Kardus',
    deskripsi: 'Lomba kreativitas membuat kostum dari kardus',
    ketentuan: [
      'Bahan utama kardus',
      'Durasi 30 menit',
      'Tema bebas',
      'Kreatif dan original'
    ],
    narahubung: 'Sdr. Dedi',
    telepon: '0812-3456-7893',
    batasPendaftaran: '12 Agustus 2024'
  },
  {
    id: 'sepeda-hias',
    nama: 'Sepeda Hias',
    deskripsi: 'Dekorasi sepeda dengan tema kemerdekaan',
    ketentuan: [
      'Sepeda sendiri',
      'Tema kemerdekaan',
      'Dekorasi kreatif',
      'Parade sepeda hias'
    ],
    narahubung: 'Sdr. Eka',
    telepon: '0812-3456-7894',
    batasPendaftaran: '14 Agustus 2024'
  }
] 