import { NextRequest, NextResponse } from 'next/server'
import { pendaftaranService, PendaftaranData } from '@/lib/googleSheets'

// GET - Mengambil semua pendaftaran
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const jenisLomba = searchParams.get('jenisLomba')
    
    if (jenisLomba) {
      const data = await pendaftaranService.getByJenisLomba(jenisLomba)
      return NextResponse.json({ success: true, data })
    } else {
      const data = await pendaftaranService.getAll()
      return NextResponse.json({ success: true, data })
    }
  } catch (error) {
    console.error('Error in GET /api/pendaftaran:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data pendaftaran' },
      { status: 500 }
    )
  }
}

// POST - Menambah pendaftaran baru
export async function POST(request: NextRequest) {
  try {
    const body: PendaftaranData = await request.json()
    
    // Validasi data
    if (!body.namaTim || !body.unit || !body.teleponPenanggungJawab || !body.jenisLomba) {
      return NextResponse.json(
        { success: false, error: 'Data tidak lengkap' },
        { status: 400 }
      )
    }

    // Set tanggal daftar dan status default
    const dataToSave: PendaftaranData = {
      ...body,
      tanggalDaftar: new Date().toISOString().split('T')[0],
      status: 'pending'
    }

    // Cek environment variables
    if (!process.env.GOOGLE_SPREADSHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error('Missing environment variables')
      return NextResponse.json(
        { success: false, error: 'Konfigurasi database belum lengkap' },
        { status: 500 }
      )
    }

    await pendaftaranService.create(dataToSave)
    
    return NextResponse.json(
      { success: true, message: 'Pendaftaran berhasil ditambahkan' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/pendaftaran:', error)
    
    // Return error yang lebih detail
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { success: false, error: `Gagal menambah pendaftaran: ${errorMessage}` },
      { status: 500 }
    )
  }
} 