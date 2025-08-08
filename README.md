# Portal Lomba Kemerdekaan RI Ke-80 RSJ Mutiara Sukma

Portal web modern untuk pendaftaran berbagai lomba dalam rangka memperingati HUT ke-80 Kemerdekaan Republik Indonesia di RSJ Mutiara Sukma.

## 🎯 Fitur Utama

### 📋 Form Pendaftaran Lomba
1. **Video Ucapan HUT RI** - Form untuk lomba video ucapan dengan durasi maksimal 1 menit
2. **Gobak Sodor** - Form untuk lomba beregu 5 orang permainan tradisional
3. **Duel Kardus Cerdas** - Form untuk lomba kecerdasan dengan media kardus
4. **Video Pendek TikTok** - Form untuk lomba video TikTok tentang kesehatan jiwa
5. **Sepeda Hias** - Form untuk lomba menghias sepeda dengan tema kemerdekaan

### 🎨 Desain & UX
- **Warna Tema**: Merah putih dengan nuansa orange hijau
- **Responsive Design**: Optimal di desktop, tablet, dan mobile
- **Animasi Modern**: Efek hover, fade-in, dan parallax
- **User-Friendly**: Interface yang intuitif dan mudah digunakan

### 🔧 Teknologi
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Framework**: Bootstrap 5.3.0
- **Icons**: Font Awesome 6.4.0
- **Storage**: LocalStorage untuk demo data
- **Deployment**: Siap deploy di Vercel

## 📁 Struktur File

```
portal-lomba/
├── index.html          # Halaman utama
├── styles.css          # Styling dan animasi
├── script.js           # JavaScript functionality
├── README.md           # Dokumentasi
└── Ketentuan Lomba Kemerdekaan Indonesia Ke-80 RSJMS (1).docx
```

## 🚀 Cara Menjalankan

### Lokal Development
1. Clone atau download repository ini
2. Buka file `index.html` di browser
3. Portal siap digunakan!

### Deploy ke Vercel
1. Upload semua file ke repository Git
2. Connect repository ke Vercel
3. Deploy otomatis akan berjalan

## 📊 Database & Data Management

### Penyimpanan Data
- **LocalStorage**: Untuk demo dan testing
- **CSV Export**: Fitur export data ke spreadsheet
- **Real-time Validation**: Validasi form saat input

### Struktur Data
```javascript
{
  id: Date.now(),
  timestamp: "2025-01-XX...",
  lombaType: "video-ucapan",
  data: {
    nama_tim: "Tim Merah Putih",
    unit: "Instalasi Rawat Inap",
    no_hp: "081234567890",
    email: "tim@example.com",
    catatan: "Catatan tambahan"
  }
}
```

## 🎯 Informasi Lomba

### 1. Video Ucapan HUT RI
- **Peserta**: Pegawai RSJ Mutiara Sukma
- **Durasi**: Maksimal 1 menit
- **Tema**: Ucapan selamat HUT RI ke-80
- **Deadline**: 15 Agustus 2025
- **Kontak**: Ida Ayu Sasih, S.Kep., Ns (081907892957)

### 2. Gobak Sodor
- **Peserta**: Beregu 5 orang
- **Durasi**: 2 babak x 10 menit
- **Lokasi**: Lapangan RSJ Mutiara Sukma
- **Kontak**: Jumratul Akbar, S.Kep., Ns (085339151308)

### 3. Duel Kardus Cerdas
- **Peserta**: Tim (jumlah fleksibel)
- **Media**: Kardus sebagai alat permainan
- **Tema**: Kecerdasan dan kreativitas
- **Kontak**: Panitia Lomba

### 4. Video Pendek TikTok
- **Peserta**: Masyarakat umum (non-CHRSJMS)
- **Durasi**: Maksimal 60 detik
- **Platform**: TikTok
- **Hashtag**: #rsj_mutiarasukma #merdekajiwarsjms
- **Kontak**: Regina Salsa Gandi, S.Kep., Ns (087862236921)

### 5. Sepeda Hias
- **Peserta**: Tim atau individu
- **Tema**: Kemerdekaan dan kesehatan jiwa
- **Kriteria**: Kreativitas dan estetika
- **Kontak**: Panitia Lomba

## 🎨 Customization

### Warna Tema
```css
:root {
    --primary-red: #dc3545;
    --primary-white: #ffffff;
    --accent-orange: #fd7e14;
    --accent-green: #28a745;
    --dark-red: #c82333;
}
```

### Menambah Lomba Baru
1. Tambahkan card di `index.html`
2. Buat modal form baru
3. Update JavaScript di `script.js`
4. Tambahkan styling di `styles.css`

## 📱 Responsive Design

Portal ini responsif untuk berbagai ukuran layar:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🔧 Fitur Teknis

### Validasi Form
- Real-time validation untuk email dan nomor telepon
- Required field validation
- Custom error messages

### Animasi & Efek
- Smooth scrolling navigation
- Fade-in animations saat scroll
- Hover effects pada cards
- Ripple effects pada buttons
- Parallax scrolling

### Performance
- Optimized images dari CDN
- Minified CSS dan JS
- Lazy loading untuk animasi
- Efficient DOM manipulation

## 📞 Kontak Panitia

| Lomba | Nama | No. HP |
|-------|------|--------|
| Video Ucapan | Ida Ayu Sasih, S.Kep., Ns | 081907892957 |
| Gobak Sodor | Jumratul Akbar, S.Kep., Ns | 085339151308 |
| Video TikTok | Regina Salsa Gandi, S.Kep., Ns | 087862236921 |

## 🎉 Tema Lomba

**"80 Tahun Indonesia Merdeka: Bersatu Berdaulat, Rakyat Sejahtera, Indonesia Maju"**

Portal ini dibuat dengan semangat nasionalisme dan kreativitas untuk menyemarakkan peringatan HUT ke-80 Kemerdekaan Republik Indonesia.

---

**© 2025 Portal Lomba Kemerdekaan RI Ke-80 RSJ Mutiara Sukma** 