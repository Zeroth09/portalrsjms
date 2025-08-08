import { NextRequest, NextResponse } from 'next/server'
import { pendaftaranService } from '@/lib/googleSheets'

// PUT - Mengupdate status pendaftaran
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { status, catatan } = body

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Status tidak valid' },
        { status: 400 }
      )
    }

    await pendaftaranService.updateStatus(id, status, catatan)
    
    return NextResponse.json(
      { success: true, message: 'Status pendaftaran berhasil diupdate' }
    )
  } catch (error) {
    console.error('Error in PUT /api/pendaftaran/[id]:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mengupdate status pendaftaran' },
      { status: 500 }
    )
  }
}

// DELETE - Menghapus pendaftaran
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await pendaftaranService.delete(id)
    
    return NextResponse.json(
      { success: true, message: 'Pendaftaran berhasil dihapus' }
    )
  } catch (error) {
    console.error('Error in DELETE /api/pendaftaran/[id]:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus pendaftaran' },
      { status: 500 }
    )
  }
} 