# 🚀 Setup Google Drive API untuk Upload Video

Dokumentasi lengkap untuk mengonfigurasi Google Drive API agar fitur upload video TikTok dapat berfungsi.

## 📋 **Prerequisites**

1. **Google Account** dengan akses ke Google Cloud Console
2. **Google Drive** untuk menyimpan video
3. **Vercel Account** untuk deployment (atau server hosting lainnya)

## 🔧 **Step 1: Setup Google Cloud Project**

### 1. Buat Project Baru
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Klik **"New Project"**
3. Beri nama project: `portal-lomba-rsjms`
4. Klik **"Create"**

### 2. Enable Google Drive API
1. Di dashboard project, cari **"Google Drive API"**
2. Klik **"Enable"**
3. Tunggu hingga API aktif

## 🔐 **Step 2: Buat Service Account**

### 1. Navigasi ke Service Accounts
1. Di Google Cloud Console, buka **"IAM & Admin"** > **"Service Accounts"**
2. Klik **"Create Service Account"**

### 2. Konfigurasi Service Account
1. **Service account name**: `portal-lomba-service`
2. **Service account ID**: `portal-lomba-service`
3. **Description**: `Service account untuk upload video lomba`
4. Klik **"Create and Continue"**

### 3. Set Permissions
1. **Role**: Pilih **"Editor"** atau **"Storage Admin"**
2. Klik **"Continue"**
3. Klik **"Done"**

### 4. Generate Private Key
1. Klik pada service account yang baru dibuat
2. Tab **"Keys"** > **"Add Key"** > **"Create new key"**
3. Pilih **"JSON"**
4. Klik **"Create"**
5. **Download file JSON** (simpan aman!)

## 📁 **Step 3: Setup Google Drive Folder**

### 1. Buat Folder Utama
1. Buka [Google Drive](https://drive.google.com/)
2. Buat folder baru: **"Portal Lomba RSJMS 2025"**
3. **Klik kanan** pada folder > **"Share"**

### 2. Share dengan Service Account
1. Di dialog share, masukkan **email service account**
   - Format: `portal-lomba-service@your-project-id.iam.gserviceaccount.com`
2. Set permission: **"Editor"**
3. **Uncheck** "Notify people"
4. Klik **"Share"**

### 3. Copy Folder ID
1. Buka folder yang sudah dibuat
2. Copy **ID** dari URL browser
   - URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
   - Copy bagian `FOLDER_ID_HERE`

**⚠️ PENTING**: Gunakan **HANYA ID folder**, bukan full URL!
- ❌ Wrong: `1Pt3y7CoNrnDO9vffFw_11sbEM0z5pwcu?hl=ID`
- ✅ Correct: `1Pt3y7CoNrnDO9vffFw_11sbEM0z5pwcu`

## ⚙️ **Step 4: Environment Variables**

Tambahkan environment variables berikut di Vercel atau server hosting:

```env
# Google Drive Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=portal-lomba-service@your-project-id.iam.gserviceaccount.com
GOOGLE_DRIVE_FOLDER_ID=1Pt3y7CoNrnDO9vffFw_11sbEM0z5pwcu
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
YOUR_PRIVATE_KEY_FROM_JSON_FILE
-----END PRIVATE KEY-----"
```

### 📝 **Cara Mendapatkan Values:**

#### 1. `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- Dari file JSON yang di-download
- Field: `client_email`

#### 2. `GOOGLE_DRIVE_FOLDER_ID`
- ID folder yang sudah di-copy di Step 3
- **HANYA ID**: `1Pt3y7CoNrnDO9vffFw_11sbEM0z5pwcu`

#### 3. `GOOGLE_PRIVATE_KEY`
- Dari file JSON yang di-download
- Field: `private_key`
- **Penting**: Gunakan quotes dan keep format `\n`

### 🔧 **Setup di Vercel:**

1. Buka dashboard Vercel project
2. **Settings** > **Environment Variables**
3. Add variable:
   - **Name**: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - **Value**: `portal-lomba-service@your-project-id.iam.gserviceaccount.com`
4. Add variable:
   - **Name**: `GOOGLE_DRIVE_FOLDER_ID`
   - **Value**: `1Pt3y7CoNrnDO9vffFw_11sbEM0z5pwcu`
5. Add variable:
   - **Name**: `GOOGLE_PRIVATE_KEY`
   - **Value**: Paste private key dengan format lengkap

## 📂 **Step 5: Folder Structure**

Setelah setup, struktur folder di Google Drive akan otomatis:

```
📁 Portal Lomba RSJMS 2025/
  📁 Video TikTok - 2025/
    📁 username1_2025-08-15/
      📄 username1_2025-08-15T10-30-00Z_video.mp4
      📄 username1_2025-08-15T10-30-00Z_metadata.json
    📁 username2_2025-08-15/
      📄 username2_2025-08-15T11-45-00Z_video.mp4
      📄 username2_2025-08-15T11-45-00Z_metadata.json
```

## 🛡️ **Security Features**

### ✅ **Keamanan yang Sudah Diimplementasi:**

1. **Private Folder**: Hanya kamu dan service account yang bisa akses
2. **Organized Structure**: File terorganisir per user dan tanggal
3. **Metadata Tracking**: Info lengkap setiap upload tersimpan
4. **File Validation**: Cek format dan ukuran file
5. **Error Handling**: Robust error handling dan logging

### 🚫 **Yang Tidak Bisa Diakses User:**

- ❌ Folder utama Google Drive
- ❌ File video peserta lain
- ❌ Metadata peserta lain
- ❌ Struktur folder internal

## 🧪 **Step 6: Testing**

### 1. Test Upload
1. Buka halaman lomba Video TikTok
2. Upload video test (format MP4, maksimal 100MB)
3. Check Google Drive folder

### 2. Verify Structure
1. Check apakah folder otomatis terbuat
2. Check metadata file
3. Check file video tersimpan

## 🚨 **Troubleshooting**

### ❌ **Error: "Upload video gagal. Silakan coba lagi."**

**Penyebab Umum:**
1. **Wrong Folder ID**: Pastikan HANYA gunakan ID folder
   - ❌ `1Pt3y7CoNrnDO9vffFw_11sbEM0z5pwcu?hl=ID`
   - ✅ `1Pt3y7CoNrnDO9vffFw_11sbEM0z5pwcu`

2. **Service Account belum di-share**: 
   - Re-share folder dengan service account email
   - Set permission: **Editor**

3. **Environment Variables salah**:
   - Check di Vercel Settings > Environment Variables
   - Restart deployment setelah update

### ❌ **Error: "Google Drive not configured"**
- Check environment variables sudah benar
- Restart deployment di Vercel

### ❌ **Error: "Upload failed"**
- Check service account permissions di folder
- Check Google Drive API enabled
- Check private key format

### ❌ **Error: "Folder access denied"**
- Re-share folder dengan service account
- Check folder ID benar

### ⚡ **Quick Fix untuk Error Upload:**

1. **Update Environment Variable di Vercel:**
   ```
   GOOGLE_DRIVE_FOLDER_ID=1Pt3y7CoNrnDO9vffFw_11sbEM0z5pwcu
   ```

2. **Re-share Google Drive Folder:**
   - Buka: https://drive.google.com/drive/folders/1Pt3y7CoNrnDO9vffFw_11sbEM0z5pwcu
   - Share dengan service account email
   - Permission: Editor

3. **Redeploy Vercel:**
   - Trigger new deployment setelah update env vars

## 📞 **Support**

Jika ada masalah setup, check:
1. **Google Cloud Console** > **"API & Services"** > **"Credentials"**
2. **Vercel Dashboard** > **"Environment Variables"**
3. **Google Drive** > **"Shared with me"** (untuk service account)

## 🎉 **Selesai!**

Setelah setup selesai, fitur upload video akan:
- ✅ Menerima upload video dari form
- ✅ Validasi format dan ukuran
- ✅ Upload ke Google Drive privat
- ✅ Organize file per user
- ✅ Simpan metadata lengkap
- ✅ Give feedback ke user

**Happy coding!** 💖✨ 