# Setup Portal Lomba RSJ Mutiara Sukma

## 🚀 Deployment ke Vercel

### 1. Setup Environment Variables di Vercel

Buka [Vercel Dashboard](https://vercel.com/dashboard) dan tambahkan environment variables berikut:

```
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id-here
GOOGLE_SERVICE_ACCOUNT_EMAIL=portal-lomba-service@portal-lomba-rsjms.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDT/G39odBmu1x3\nrpp/XV15pMIHtk7vV0vnwGNlfGcwI2N7/OlG0MQiAqnw0gjzBARYoJ62JptUWwrS\npf8BigSDhX7RqqcGzEEk9nU9d4uJoD4tKNbLBwZu0PSmvrpHDZidTqUfdjUVB0L7\np4QF+C384kMXlsdd4rQoZcCTaYtCfOGLXXDFaNtI1mO284fgFv9dWW1jcyDwm4PH\nNzin6cTxmXnUTNLSPsIPa3qcW4b2eKmAJ6qscMkQXQsyJoC66Ijm8k43foFX4d0d\nc5ZIDsvtOg0TPm+EPCvCsTcmzbtB/72f3SpA8QV4x59HHoSlLQBc2FiXfRhvrd3s\nnRdlL9qrAgMBAAECggEAB/EoexzO3qpyV8GLju4D4donCCbvuiPTzNuhCF0AI1uQ\nD0XLGkNutbTSgm/mtJltQuzG8B1uKwY7gjzZ2vLoIbf5/QefDlrPWKqAe0xj8US2\n+kt8u0qIwSoZoGL7k6Hnb9f8c7tNWHusf2/SkG6wj7g3ufCE3k2aC6a+75xAAr5I\nNwk0f6ycCckhw4yka/bU7HCA6YC8+bCwJXCJqCEZN+jYTSjKiwR3JPIC6ICcwE1O\n4Ztoq3wP73rE7a+8zQBjyiUOPIXSMtucSW7JIZVXpvtAcPSLqe69Af0pvkKviTu+\nJu40N+7YKWT7soYUp2MFu4Q5kTyE2CRHHlwheeulsQKBgQDum5Jz8an2iGKBtiOJ\nu/qdlIApSbdnxZ5PCW/b0I0yeXjdFWOOsBbGISZdAwQT64aC9M966p8zzWxYN8HK\n86neQVUAVLrzbKgzGKF+8ldaQDRJCa8mFxiVtOd6QvYFR0el8bAHbf/DQaP7eQQm\nIZ+2mQGauUKBEhr/6xeMTm98PwKBgQDjcBi/Jp+TPx1ArBvUX2j1FGULunk5KHPN\n/o8V33wgpe1LANSVaKv2x27n0LhsEOreKPWp/751izmj/HqN8T4qw9UCpuk46JqU\nJ2TD0Qt9dWQUXh5FWFBkAFrmTsWFVPJnnVFwT87XkHo0BGmOQJRUsO/cOt/xlpe9\njGiTSRj2lQKBgD2AI9N2qpQ8uwcr5yUNKp+LMy1xLrC0owVELWy+6GXmIVz6slqI\n0JXo3XaD3H0168m9R+0qpDY58H8cf/rLqzD6LeqT7Evp6cChzJ5n4FQG0HMy584t\njcyogDFnKPpbUQBYt0Jy+8VcGeQrYQJjEEOEVIGI1rdl70efVMZ5QQsJAoGBAIC6\nAHeoP6dSkJb7EqFIAxq7mVljCJuORsUvsAKcRCAiacUKykdqP/Jj/GSeYNNhW92z\n5x95zW2wCEbFbwQJp7sCrfxbRiNcm6kBBupB1jQDDkrs3ks3agC/prM1oFwPsUdt\n5hsgQJ0He/MXEDtgV9P7dTb756ZQKsAwyTubotJlAoGAbdwnmeGhm8FigDDqsRmH\nI5ShgAtn5NhcfBbjD8FWVIAn3AwR78GNVwmrOimTwfTs9xZxv74JJIeJ+yv/ePe+\nDDU71QRaJP9/F9sAB2qdvWAUCfKrittos2dnGCRd13KWoB2pBU5gZN9NqH2jCXCR\n4lpsSPWm4nCXETHx7Z2BNJY=\n-----END PRIVATE KEY-----\n"
```

### 2. Setup Google Sheets

1. **Buat Google Sheet baru**
2. **Share dengan service account email**: `portal-lomba-service@portal-lomba-rsjms.iam.gserviceaccount.com`
3. **Copy Spreadsheet ID** dari URL
4. **Pastikan sheet pertama memiliki header**:
   - Nama Tim
   - Unit
   - Telepon Penanggung Jawab
   - Jenis Lomba
   - Tanggal Daftar
   - Status
   - Catatan

### 3. Connect Repository ke Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik "New Project"
3. Import repository: `https://github.com/Zeroth09/portalrsjms.git`
4. Set environment variables seperti di atas
5. Deploy!

## 📁 Struktur Project

```
portal-lomba/
├── app/
│   ├── admin/                 # Admin panel
│   ├── api/                   # API routes
│   ├── lomba/                 # Halaman pendaftaran
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── lib/
│   └── googleSheets.ts        # Google Sheets service
├── public/                    # Static assets
├── package.json               # Dependencies
├── README.md                  # Dokumentasi
└── vercel.json               # Vercel config
```

## 🎯 Fitur yang Tersedia

- ✅ **5 Jenis Lomba** dengan form pendaftaran
- ✅ **Admin Panel** dengan CRUD operations
- ✅ **Database Google Sheets**
- ✅ **Responsive Design**
- ✅ **Modern UI/UX**
- ✅ **Animations dengan Framer Motion**

## 🔗 Link Penting

- **Repository**: https://github.com/Zeroth09/portalrsjms.git
- **Live Demo**: https://portalrsjms.vercel.app
- **Admin Panel**: https://portalrsjms.vercel.app/admin

## 📞 Kontak Panitia

| Lomba | Narahubung | Telepon |
|-------|------------|---------|
| Video Ucapan | Ida Ayu Sasih, S.Kep., Ns | 081907892957 |
| Gobak Sodor | Jumratul Akbar, S.Kep., Ns | 085339151308 |
| Video TikTok | Regina Salsa Gandi, S.Kep., Ns | 087862236921 |

---

**Merdeka! 🇮🇩** 