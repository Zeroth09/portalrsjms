# Setup Environment Variables untuk Portal Lomba

## 📋 Langkah-langkah Setup

### 1. Buat File .env.local

1. Masuk ke folder `portal-lomba-next`
2. Buat file baru dengan nama `.env.local`
3. Copy isi dari file `env-template.txt` ke `.env.local`

### 2. Verifikasi Google Sheets Access

1. Buka [Google Sheets](https://docs.google.com/spreadsheets/d/1VNTp2Gh6j2SIHpgvqaHcZsvQatxs3GLMycIWh3M_eBQ/edit?usp=sharing)
2. Klik tombol "Share" di pojok kanan atas
3. Tambahkan email: `portal-lomba-service@portal-lomba-rsjms.iam.gserviceaccount.com`
4. Beri permission "Editor"
5. Klik "Send"

### 3. Test Koneksi

1. Jalankan development server:
```bash
cd portal-lomba-next
npm run dev
```

2. Buka browser ke `http://localhost:3000`
3. Coba daftar lomba untuk test koneksi ke Google Sheets

## 🔧 Troubleshooting

### Error: "Invalid private key"
- Pastikan private key di `.env.local` menggunakan format yang benar
- Private key harus diawali dan diakhiri dengan `-----BEGIN PRIVATE KEY-----` dan `-----END PRIVATE KEY-----`
- Gunakan `\n` untuk line breaks

### Error: "Service account not found"
- Pastikan email service account sudah benar: `portal-lomba-service@portal-lomba-rsjms.iam.gserviceaccount.com`

### Error: "Permission denied"
- Pastikan Google Sheets sudah di-share dengan email service account
- Pastikan permission yang diberikan adalah "Editor"

## 📊 Struktur Google Sheets

Spreadsheet akan otomatis terisi dengan header berikut:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ID | Timestamp | Jenis Lomba | Nama Tim | Unit | No HP | Email | Catatan | Anggota Tim | Jumlah Anggota | Username TikTok | Alamat | Judul Video | Deskripsi Video | Tema Hiasan | Deskripsi Konsep |

## 🚀 Deployment ke Vercel

### Environment Variables di Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Import repository dari GitHub
3. Klik "Settings" > "Environment Variables"
4. Tambahkan variables berikut:

**GOOGLE_SERVICE_ACCOUNT_EMAIL:**
```
portal-lomba-service@portal-lomba-rsjms.iam.gserviceaccount.com
```

**GOOGLE_PRIVATE_KEY:**
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDT/G39odBmu1x3
rpp/XV15pMIHtk7vV0vnwGNlfGcwI2N7/OlG0MQiAqnw0gjzBARYoJ62JptUWwrS
pf8BigSDhX7RqqcGzEEk9nU9d4uJoD4tKNbLBwZu0PSmvrpHDZidTqUfdjUVB0L7
p4QF+C384kMXlsdd4rQoZcCTaYtCfOGLXXDFaNtI1mO284fgFv9dWW1jcyDwm4PH
Nzin6cTxmXnUTNLSPsIPa3qcW4b2eKmAJ6qscMkQXQsyJoC66Ijm8k43foFX4d0d
c5ZIDsvtOg0TPm+EPCvCsTcmzbtB/72f3SpA8QV4x59HHoSlLQBc2FiXfRhvrd3s
nRdlL9qrAgMBAAECggEAB/EoexzO3qpyV8GLju4D4donCCbvuiPTzNuhCF0AI1uQ
D0XLGkNutbTSgm/mtJltQuzG8B1uKwY7gjzZ2vLoIbf5/QefDlrPWKqAe0xj8US2
+kt8u0qIwSoZoGL7k6Hnb9f8c7tNWHusf2/SkG6wj7g3ufCE3k2aC6a+75xAAr5I
Nwk0f6ycCckhw4yka/bU7HCA6YC8+bCwJXCJqCEZN+jYTSjKiwR3JPIC6ICcwE1O
4Ztoq3wP73rE7a+8zQBjyiUOPIXSMtucSW7JIZVXpvtAcPSLqe69Af0pvkKviTu+
Ju40N+7YKWT7soYUp2MFu4Q5kTyE2CRHHlwheeulsQKBgQDum5Jz8an2iGKBtiOJ
u/qdlIApSbdnxZ5PCW/b0I0yeXjdFWOOsBbGISZdAwQT64aC9M966p8zzWxYN8HK
86neQVUAVLrzbKgzGKF+8ldaQDRJCa8mFxiVtOd6QvYFR0el8bAHbf/DQaP7eQQm
IZ+2mQGauUKBEhr/6xeMTm98PwKBgQDjcBi/Jp+TPx1ArBvUX2j1FGULunk5KHPN
/o8V33wgpe1LANSVaKv2x27n0LhsEOreKPWp/751izmj/HqN8T4qw9UCpuk46JqU
J2TD0Qt9dWQUXh5FWFBkAFrmTsWFVPJnnVFwT87XkHo0BGmOQJRUsO/cOt/xlpe9
jGiTSRj2lQKBgD2AI9N2qpQ8uwcr5yUNKp+LMy1xLrC0owVELWy+6GXmIVz6slqI
0JXo3XaD3H0168m9R+0qpDY58H8cf/rLqzD6LeqT7Evp6cChzJ5n4FQG0HMy584t
jcyogDFnKPpbUQBYt0Jy+8VcGeQrYQJjEEOEVIGI1rdl70efVMZ5QQsJAoGBAIC6
AHeoP6dSkJb7EqFIAxq7mVljCJuORsUvsAKcRCAiacUKykdqP/Jj/GSeYNNhW92z
5x95zW2wCEbFbwQJp7sCrfxbRiNcm6kBBupB1jQDDkrs3ks3agC/prM1oFwPsUdt
5hsgQJ0He/MXEDtgV9P7dTb756ZQKsAwyTubotJlAoGAbdwnmeGhm8FigDDqsRmH
I5ShgAtn5NhcfBbjD8FWVIAn3AwR78GNVwmrOimTwfTs9xZxv74JJIeJ+yv/ePe+
DDU71QRaJP9/F9sAB2qdvWAUCfKrittos2dnGCRd13KWoB2pBU5gZN9NqH2jCXCR
4lpsSPWm4nCXETHx7Z2BNJY=
-----END PRIVATE KEY-----
```

### Deploy

1. Klik "Deploy" di Vercel
2. Tunggu proses deployment selesai
3. Test form pendaftaran di production

## 🔒 Security Notes

- Jangan commit file `.env.local` ke repository
- File `.env.local` sudah ditambahkan ke `.gitignore`
- Credentials sudah aman dan hanya untuk project ini

## 📞 Support

Jika mengalami masalah:
1. Cek console browser untuk error client-side
2. Cek Vercel function logs untuk error server-side
3. Pastikan Google Sheets sudah di-share dengan benar 