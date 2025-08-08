# Header Spreadsheet untuk Portal Lomba

## Header yang Harus Ada di Google Sheets:

Baris pertama (Row 1) harus memiliki header berikut:

| Kolom | Header | Keterangan |
|-------|--------|------------|
| A | Nama Tim | Nama tim atau peserta |
| B | Unit | Unit atau asal peserta |
| C | Telepon Penanggung Jawab | Nomor telepon kontak |
| D | Jenis Lomba | Jenis lomba yang dipilih |
| E | Tanggal Daftar | Tanggal pendaftaran (otomatis) |
| F | Status | Status pendaftaran (pending/approved/rejected) |
| G | Catatan | Catatan tambahan (link TikTok, dll) |

## Format Header yang Benar:

```
A1: Nama Tim
B1: Unit  
C1: Telepon Penanggung Jawab
D1: Jenis Lomba
E1: Tanggal Daftar
F1: Status
G1: Catatan
```

## Jenis Lomba yang Tersedia:

- Video Ucapan HUT RI
- Gobak Sodor
- Video TikTok
- Duel Kardus
- Sepeda Hias

## Status yang Tersedia:

- pending (default)
- approved
- rejected

## Catatan Khusus:

- **Video TikTok**: Link TikTok akan disimpan di kolom Catatan
- **Video HUT RI**: Menggunakan Google Forms external link
- **Semua lomba lain**: Menggunakan form internal portal

## Setup Google Sheets:

1. Buat Google Sheet baru
2. Set header di baris pertama sesuai format di atas
3. Share dengan service account: `portal-lomba-service@portal-lomba-rsjms.iam.gserviceaccount.com`
4. Set permission sebagai Editor
5. Copy Spreadsheet ID untuk environment variable

## Environment Variables yang Diperlukan:

```
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
GOOGLE_SERVICE_ACCOUNT_EMAIL=portal-lomba-service@portal-lomba-rsjms.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=your-private-key
``` 