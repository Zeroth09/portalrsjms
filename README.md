# Portal Lomba HUT RI Ke-80 RSJ Mutiara Sukma

Portal pendaftaran lomba dalam rangka peringatan HUT Kemerdekaan RI Ke-80 RSJ Mutiara Sukma. Dibangun dengan Next.js, TypeScript, dan Tailwind CSS dengan database Google Sheets.

## 🎯 Fitur Utama

### Lomba yang Tersedia
1. **Video Ucapan HUT RI Ke-80** - Video ucapan selamat dengan durasi maksimal 1 menit
2. **Gobak Sodor** - Lomba beregu 5 orang permainan tradisional
3. **Duel Kardus Cerdas** - Kompetisi kreativitas menggunakan kardus
4. **Video Pendek TikTok** - Video kreatif untuk masyarakat umum
5. **Sepeda Hias** - Lomba menghias sepeda dengan tema kemerdekaan

### Fitur Portal
- ✅ **Pendaftaran Online** - Form pendaftaran yang user-friendly
- ✅ **Admin Panel** - Dashboard untuk mengelola pendaftaran
- ✅ **Database Google Sheets** - Penyimpanan data di spreadsheet
- ✅ **CRUD Operations** - Create, Read, Update, Delete pendaftaran
- ✅ **Filter & Search** - Pencarian dan filter data
- ✅ **Responsive Design** - Tampilan optimal di semua device
- ✅ **Modern UI/UX** - Desain clean dan aesthetic dengan tema kemerdekaan

## 🚀 Teknologi yang Digunakan

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **Database**: Google Sheets API
- **Deployment**: Vercel

## 📋 Prerequisites

Sebelum menjalankan project, pastikan Anda memiliki:

- Node.js 18+ 
- npm atau yarn
- Google Cloud Project dengan Google Sheets API
- Service Account untuk Google Sheets

## 🛠️ Instalasi

1. **Clone repository**
```bash
git clone <repository-url>
cd portal-lomba-rsjms
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Environment Variables**
Buat file `.env.local` di root project:
```env
# Google Sheets Configuration
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id-here
GOOGLE_SERVICE_ACCOUNT_EMAIL=portal-lomba-service@portal-lomba-rsjms.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Setup Google Sheets**
   - Buat Google Sheet baru
   - Share dengan service account email
   - Copy Spreadsheet ID ke environment variable
   - Pastikan sheet pertama memiliki header: `Nama Tim`, `Unit`, `Telepon Penanggung Jawab`, `Jenis Lomba`, `Tanggal Daftar`, `Status`, `Catatan`

5. **Run development server**
```bash
npm run dev
```

6. **Build untuk production**
```bash
npm run build
npm start
```

## 📁 Struktur Project

```
portal-lomba-rsjms/
├── app/
│   ├── admin/                 # Halaman admin panel
│   ├── api/                   # API routes
│   │   └── pendaftaran/       # CRUD operations
│   ├── lomba/                 # Halaman pendaftaran lomba
│   │   └── video-ucapan/      # Form pendaftaran video ucapan
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── lib/
│   └── googleSheets.ts        # Google Sheets service
├── public/                    # Static assets
├── tailwind.config.js         # Tailwind configuration
├── next.config.js             # Next.js configuration
└── package.json               # Dependencies
```

## 🎨 Desain & UI/UX

### Color Scheme (Tema Kemerdekaan)
- **Merah**: `#ef4444` - Semangat nasionalisme
- **Putih**: `#ffffff` - Kesucian dan kedamaian  
- **Oranye**: `#f97316` - Energi dan kreativitas
- **Hijau**: `#22c55e` - Harapan dan kemajuan

### Komponen UI
- **Cards**: Modern dengan shadow dan rounded corners
- **Buttons**: Gradient dengan hover effects
- **Forms**: Clean dengan focus states
- **Tables**: Responsive dengan sorting dan filtering
- **Modals**: Smooth animations dengan Framer Motion

## 🔧 API Endpoints

### Pendaftaran
- `GET /api/pendaftaran` - Ambil semua pendaftaran
- `GET /api/pendaftaran?jenisLomba=video-ucapan` - Filter by jenis lomba
- `POST /api/pendaftaran` - Tambah pendaftaran baru
- `PUT /api/pendaftaran/[id]` - Update status pendaftaran
- `DELETE /api/pendaftaran/[id]` - Hapus pendaftaran

### Response Format
```json
{
  "success": true,
  "data": [...],
  "message": "Pendaftaran berhasil ditambahkan"
}
```

## 📊 Database Schema

### Google Sheets Structure
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| Nama Tim | String | Nama tim peserta |
| Unit | String | Unit kerja/instalasi |
| Telepon Penanggung Jawab | String | Nomor telepon |
| Jenis Lomba | String | Jenis lomba yang dipilih |
| Tanggal Daftar | Date | Tanggal pendaftaran |
| Status | Enum | pending/approved/rejected |
| Catatan | String | Catatan tambahan |

## 🚀 Deployment ke Vercel

1. **Push ke GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy di Vercel**
- Connect repository ke Vercel
- Set environment variables di Vercel dashboard
- Deploy otomatis dari main branch

3. **Environment Variables di Vercel**
```
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
GOOGLE_SERVICE_ACCOUNT_EMAIL=portal-lomba-service@portal-lomba-rsjms.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 👥 Narahubung Lomba

| Lomba | Narahubung | Telepon |
|-------|------------|---------|
| Video Ucapan | Ida Ayu Sasih, S.Kep., Ns | 081907892957 |
| Gobak Sodor | Jumratul Akbar, S.Kep., Ns | 085339151308 |
| Video TikTok | Regina Salsa Gandi, S.Kep., Ns | 087862236921 |
| Duel Kardus | Panitia RSJMS | - |
| Sepeda Hias | Panitia RSJMS | - |

## 📅 Timeline

- **Batas Pendaftaran**: 15 Agustus 2025
- **Pelaksanaan**: Agustus 2025
- **Lokasi**: RSJ Mutiara Sukma

## 🎯 Tema Lomba

**"80 Tahun Indonesia Merdeka: Bersatu Berdaulat, Rakyat Sejahtera, Indonesia Maju"**

**"Rayakan Kemerdekaan dengan Kesehatan Jiwa"**

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

Project ini dibuat untuk RSJ Mutiara Sukma dalam rangka peringatan HUT Kemerdekaan RI Ke-80.

## 🆘 Support

Untuk bantuan teknis atau pertanyaan, silakan hubungi:
- **Email**: admin@rsjms.com
- **Telepon**: (021) 12345678
- **Alamat**: RSJ Mutiara Sukma

---

**Merdeka! 🇮🇩**

*Dibuat dengan ❤️ untuk Indonesia* 