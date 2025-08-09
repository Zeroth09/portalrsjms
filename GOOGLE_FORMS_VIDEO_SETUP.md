# Setup Google Forms untuk Upload Video TikTok

## 🎯 Overview

Implementasi Google Forms untuk upload video backup yang terintegrasi dengan form web utama. Menggunakan infrastruktur Google yang 100% reliable.

## 📋 Langkah Setup Google Forms

### 1. Buat Google Forms Baru

1. **Buka** [Google Forms](https://forms.google.com)
2. **Klik** "Blank Form" atau "Form Kosong"
3. **Judul Form**: "Upload Video TikTok - Lomba HUT RI Ke-80 RSJMS"
4. **Deskripsi**: "Upload video backup untuk lomba Video TikTok. Pastikan username sama dengan pendaftaran utama."

### 2. Tambahkan Field yang Diperlukan

#### Field 1: Username TikTok
- **Type**: Short answer
- **Question**: "Username Akun TikTok"
- **Required**: Yes
- **Help text**: "Masukkan username yang sama dengan form pendaftaran utama"

#### Field 2: Nomor Telepon
- **Type**: Short answer  
- **Question**: "Nomor Telepon Penanggung Jawab"
- **Required**: Yes
- **Help text**: "Untuk verifikasi dengan data pendaftaran"

#### Field 3: Upload Video
- **Type**: File upload
- **Question**: "Upload Video TikTok (Backup)"
- **Required**: Yes
- **File Upload Settings**:
  - Allow only specific file types: Video files
  - Max file size: 1GB (atau sesuai kebutuhan)
  - Max files per response: 1

#### Field 4: Link TikTok
- **Type**: Short answer
- **Question**: "Link Postingan TikTok"
- **Required**: Yes  
- **Help text**: "Link video yang sudah diupload di TikTok"

#### Field 5: Catatan (Optional)
- **Type**: Paragraph
- **Question**: "Catatan Tambahan (Optional)"
- **Required**: No

### 3. Konfigurasi Settings

#### Response Settings:
- ✅ **Collect email addresses**: Yes
- ✅ **Limit to 1 response**: Yes (untuk mencegah duplikasi)
- ✅ **Edit after submit**: No
- ✅ **See summary charts and text responses**: Yes

#### Presentation Settings:
- ✅ **Show progress bar**: Yes
- ✅ **Shuffle question order**: No
- ✅ **Show link to submit another response**: No

#### Confirmation Message:
```
✅ Video berhasil diupload!

Terima kasih telah mengupload video backup. 

📋 Yang perlu dilakukan selanjutnya:
1. Salin link submission ini untuk form pendaftaran utama
2. Pastikan video sudah diupload di TikTok dengan hashtag yang benar
3. Tunggu pengumuman pemenang

🔗 Link submission Anda: [akan otomatis muncul]

📞 Narahubung: Regina Salsa Gandi (087862236921)
```

### 4. Setup Google Drive Integration

#### Folder Destination:
1. **Klik** "Responses" tab di Google Forms
2. **Klik** "Create Spreadsheet" untuk response data
3. **Klik** gear icon di file upload question
4. **Set** "Upload to Drive": Pilih folder yang sama dengan `GOOGLE_DRIVE_FOLDER_ID`
5. **Folder structure**: `Video TikTok - 2025/Google Forms Uploads/`

#### Permissions:
- **Form access**: Anyone with the link can respond
- **Drive folder**: Hanya admin yang bisa akses
- **Response spreadsheet**: Hanya admin yang bisa akses

### 5. Dapatkan Form URL

1. **Klik** "Send" button di Google Forms
2. **Copy** link di tab "Link"
3. **Format link**: `https://docs.google.com/forms/d/e/[FORM_ID]/viewform`

### 6. Update Code dengan Form URL

Ganti URL di file `app/lomba/video-tiktok/page.tsx`:

```typescript
// Ganti dengan URL Google Forms yang actual
const googleFormsVideoUploadUrl = "https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/viewform"
```

## 🔧 Advanced Configuration

### Custom Styling (Optional):
1. **Klik** "Customize theme" di Google Forms
2. **Pilih** warna yang sesuai dengan theme website (hijau/purple)
3. **Upload** logo RSJMS jika diperlukan

### Response Validation:
- **File size limit**: Maksimal 500MB (recommended)
- **File type**: Hanya video files (.mp4, .mov, .avi)
- **Required fields**: Username, Phone, Video, TikTok Link

### Auto-response Email (Optional):
1. **Install** Google Forms add-on "Email Notifications"
2. **Setup** auto-reply dengan konfirmasi upload
3. **Include** submission details dan next steps

## 📊 Monitoring dan Management

### Response Tracking:
- **Spreadsheet**: Auto-generated untuk track submissions
- **Drive folder**: Semua video otomatis tersimpan
- **Form analytics**: Lihat statistik submissions

### Integration dengan Database:
- **Manual sync**: Admin bisa cross-check dengan spreadsheet utama
- **Auto-sync**: Bisa implement webhook untuk otomatisasi (advanced)

## 🛡️ Security dan Privacy

### Access Control:
- **Form**: Public access tapi limited submissions
- **Responses**: Private, admin only
- **Files**: Private Google Drive folder
- **Data**: GDPR compliant melalui Google

### Data Protection:
- **File storage**: Secure di Google Drive
- **Response data**: Protected spreadsheet
- **User data**: Minimal collection, purpose-specific

## 💡 Best Practices

### User Experience:
- **Clear instructions** di setiap field
- **Help text** untuk guidance
- **Confirmation message** yang informatif
- **Error handling** yang user-friendly

### Admin Management:
- **Regular backup** of responses
- **Monitor storage usage** di Google Drive
- **Track submission statistics**
- **Prepare for peak usage** saat deadline

## 🔗 Integration dengan Portal Web

### URL Embedding:
```typescript
// Primary: Embedded iframe
<iframe src={googleFormsVideoUploadUrl} />

// Secondary: External link
<a href={googleFormsVideoUploadUrl} target="_blank">
  Buka Google Forms di Tab Baru
</a>
```

### Response Tracking:
- **Field**: `googleFormsUrl` di form utama
- **Purpose**: Link submission untuk tracking
- **Validation**: Optional tapi recommended

---

## 📞 Support

Jika ada masalah dengan setup:
1. **Check** permissions pada Google Drive folder
2. **Verify** form settings dan required fields
3. **Test** dengan sample upload
4. **Contact** Google Workspace admin jika diperlukan 