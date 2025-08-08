# Setup Multiple Sheets untuk Portal Lomba

## 📊 Struktur Sheet yang Akan Dibuat Otomatis

Portal lomba akan membuat sheet terpisah untuk setiap jenis lomba secara otomatis:

### 🎯 Sheet yang Akan Dibuat:

1. **Video_Ucapan_HUT_RI** - Untuk lomba Video Ucapan HUT RI
2. **Gobak_Sodor** - Untuk lomba Gobak Sodor  
3. **Video_TikTok** - Untuk lomba Video TikTok
4. **Duel_Kardus** - Untuk lomba Duel Kardus
5. **Sepeda_Hias** - Untuk lomba Sepeda Hias

## 📋 Header yang Sama untuk Semua Sheet

Setiap sheet akan memiliki header yang sama:

| Kolom | Header | Keterangan |
|-------|--------|------------|
| A | Nama Tim | Nama tim atau username |
| B | Unit | Unit atau asal instansi |
| C | Telepon Penanggung Jawab | Nomor telepon kontak |
| D | Jenis Lomba | Jenis lomba yang dipilih |
| E | Tanggal Daftar | Tanggal pendaftaran (otomatis) |
| F | Status | Status pendaftaran (pending/approved/rejected) |
| G | Catatan | Catatan tambahan (link TikTok, dll) |

## 🔧 Cara Kerja Sistem

### ✅ **Otomatis Membuat Sheet**
- Saat ada pendaftaran pertama untuk suatu lomba, sheet akan dibuat otomatis
- Header akan diset secara otomatis
- Tidak perlu setup manual

### ✅ **Data Terpisah per Lomba**
- Setiap lomba memiliki sheet sendiri
- Data tidak tercampur antar lomba
- Mudah untuk monitoring dan analisis

### ✅ **Backward Compatibility**
- Jika sheet sudah ada, akan menggunakan sheet yang ada
- Jika belum ada, akan dibuat baru

## 🎯 Keuntungan Multiple Sheets

1. **Organisasi Data Lebih Baik**
   - Data terpisah per lomba
   - Mudah untuk analisis per lomba
   - Tidak ada kebingungan data

2. **Monitoring yang Lebih Mudah**
   - Bisa lihat jumlah pendaftar per lomba
   - Status pendaftaran per lomba
   - Statistik per lomba

3. **Keamanan Data**
   - Jika ada masalah di satu sheet, tidak mempengaruhi yang lain
   - Backup per lomba lebih mudah

## 📊 Contoh Struktur Spreadsheet

```
📁 Portal Lomba RSJMS
├── 📄 Video_Ucapan_HUT_RI
│   ├── Nama Tim | Unit | Telepon | Jenis Lomba | Tanggal | Status | Catatan
│   └── [Data pendaftar Video Ucapan]
├── 📄 Gobak_Sodor  
│   ├── Nama Tim | Unit | Telepon | Jenis Lomba | Tanggal | Status | Catatan
│   └── [Data pendaftar Gobak Sodor]
├── 📄 Video_TikTok
│   ├── Nama Tim | Unit | Telepon | Jenis Lomba | Tanggal | Status | Catatan
│   └── [Data pendaftar Video TikTok]
├── 📄 Duel_Kardus
│   ├── Nama Tim | Unit | Telepon | Jenis Lomba | Tanggal | Status | Catatan
│   └── [Data pendaftar Duel Kardus]
└── 📄 Sepeda_Hias
    ├── Nama Tim | Unit | Telepon | Jenis Lomba | Tanggal | Status | Catatan
    └── [Data pendaftar Sepeda Hias]
```

## 🚀 Setup yang Diperlukan

### 1. **Google Sheets**
- Buat spreadsheet baru
- Share dengan service account: `portal-lomba-service@portal-lomba-rsjms.iam.gserviceaccount.com`
- Set permission sebagai Editor

### 2. **Environment Variables**
```
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
GOOGLE_SERVICE_ACCOUNT_EMAIL=portal-lomba-service@portal-lomba-rsjms.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=your-private-key
```

### 3. **Deploy ke Vercel**
- Connect repository ke Vercel
- Set environment variables di Vercel dashboard
- Deploy aplikasi

## ✅ Sistem Siap!

Setelah setup selesai, portal akan:
- ✅ Membuat sheet otomatis saat ada pendaftaran pertama
- ✅ Memisahkan data per lomba
- ✅ Menyimpan semua data dengan aman
- ✅ Memberikan monitoring yang mudah

Tidak perlu setup manual sheet, semuanya akan dibuat otomatis! 🎉 