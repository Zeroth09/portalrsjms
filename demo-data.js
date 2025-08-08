// Demo data untuk Portal Lomba
// Jalankan fungsi ini di console browser untuk menambahkan data demo

function addDemoData() {
    const demoData = [
        {
            id: 1704067200000,
            timestamp: "2024-01-01T10:00:00.000Z",
            lombaType: "video-ucapan",
            data: {
                nama_tim: "Tim Merah Putih",
                unit: "Instalasi Rawat Inap",
                no_hp: "081234567890",
                email: "tim.merahputih@rsjms.com",
                catatan: "Video akan dibuat dengan tema kemerdekaan dan semangat nasionalisme"
            }
        },
        {
            id: 1704153600000,
            timestamp: "2024-01-02T14:30:00.000Z",
            lombaType: "gobak-sodor",
            data: {
                nama_tim: "Tim Pemenang",
                unit: "Instalasi Gawat Darurat",
                no_hp: "081234567891",
                email: "tim.pemenang@rsjms.com",
                anggota_tim: "1. Ahmad Rizki\n2. Siti Nurhaliza\n3. Budi Santoso\n4. Dewi Sartika\n5. Muhammad Ali",
                catatan: "Tim siap bertanding dengan semangat juara"
            }
        },
        {
            id: 1704240000000,
            timestamp: "2024-01-03T09:15:00.000Z",
            lombaType: "duel-kardus",
            data: {
                nama_tim: "Tim Cerdas",
                unit: "Instalasi Laboratorium",
                no_hp: "081234567892",
                email: "tim.cerdas@rsjms.com",
                jumlah_anggota: "3",
                catatan: "Siap mengikuti lomba dengan kreativitas tinggi"
            }
        },
        {
            id: 1704326400000,
            timestamp: "2024-01-04T16:45:00.000Z",
            lombaType: "video-tiktok",
            data: {
                nama_lengkap: "Sari Indah",
                username_tiktok: "@sariindah_rsjms",
                no_hp: "081234567893",
                email: "sari.indah@gmail.com",
                alamat: "Jl. Merdeka No. 123, Jakarta",
                judul_video: "Tips Kesehatan Jiwa di Era Digital",
                deskripsi_video: "Video tentang cara menjaga kesehatan jiwa di era digital"
            }
        },
        {
            id: 1704412800000,
            timestamp: "2024-01-05T11:20:00.000Z",
            lombaType: "sepeda-hias",
            data: {
                nama_tim: "Tim Sepeda Merdeka",
                unit: "Instalasi Farmasi",
                no_hp: "081234567894",
                email: "tim.sepeda@rsjms.com",
                tema_hiasan: "Merah Putih Kemerdekaan",
                deskripsi_konsep: "Sepeda akan dihias dengan tema kemerdekaan dan kesehatan jiwa",
                catatan: "Menggunakan bahan ramah lingkungan"
            }
        },
        {
            id: 1704499200000,
            timestamp: "2024-01-06T13:10:00.000Z",
            lombaType: "video-ucapan",
            data: {
                nama_tim: "Tim Pelayanan Prima",
                unit: "Instalasi Rekam Medis",
                no_hp: "081234567895",
                email: "tim.pelayanan@rsjms.com",
                catatan: "Video akan menampilkan semangat pelayanan kesehatan jiwa"
            }
        },
        {
            id: 1704585600000,
            timestamp: "2024-01-07T15:30:00.000Z",
            lombaType: "gobak-sodor",
            data: {
                nama_tim: "Tim Juara",
                unit: "Instalasi Radiologi",
                no_hp: "081234567896",
                email: "tim.juara@rsjms.com",
                anggota_tim: "1. Rina Marlina\n2. Agus Setiawan\n3. Nia Kurnia\n4. Bambang Wijaya\n5. Siti Fatimah",
                catatan: "Tim dengan semangat juara yang tinggi"
            }
        },
        {
            id: 1704672000000,
            timestamp: "2024-01-08T08:45:00.000Z",
            lombaType: "video-tiktok",
            data: {
                nama_lengkap: "Budi Prasetyo",
                username_tiktok: "@budiprasetyo_mental",
                no_hp: "081234567897",
                email: "budi.prasetyo@gmail.com",
                alamat: "Jl. Kesehatan No. 456, Bandung",
                judul_video: "Meditasi untuk Kesehatan Jiwa",
                deskripsi_video: "Video tutorial meditasi untuk kesehatan jiwa"
            }
        },
        {
            id: 1704758400000,
            timestamp: "2024-01-09T12:00:00.000Z",
            lombaType: "duel-kardus",
            data: {
                nama_tim: "Tim Inovasi",
                unit: "Instalasi Gizi",
                no_hp: "081234567898",
                email: "tim.inovasi@rsjms.com",
                jumlah_anggota: "4",
                catatan: "Tim dengan ide kreatif dan inovatif"
            }
        },
        {
            id: 1704844800000,
            timestamp: "2024-01-10T17:15:00.000Z",
            lombaType: "sepeda-hias",
            data: {
                nama_tim: "Tim Hijau Sehat",
                unit: "Instalasi Sanitasi",
                no_hp: "081234567899",
                email: "tim.hijau@rsjms.com",
                tema_hiasan: "Hijau Sehat Jiwa",
                deskripsi_konsep: "Sepeda dengan tema kesehatan jiwa dan lingkungan",
                catatan: "Menggunakan bahan daur ulang"
            }
        }
    ];

    // Simpan data demo ke localStorage
    localStorage.setItem('pendaftaranLomba', JSON.stringify(demoData));
    
    console.log('Data demo berhasil ditambahkan!');
    console.log('Total data:', demoData.length);
    
    // Refresh halaman jika di admin panel
    if (window.location.pathname.includes('admin.html')) {
        location.reload();
    }
    
    return demoData;
}

// Fungsi untuk menghapus semua data
function clearAllData() {
    localStorage.removeItem('pendaftaranLomba');
    console.log('Semua data berhasil dihapus!');
    
    // Refresh halaman jika di admin panel
    if (window.location.pathname.includes('admin.html')) {
        location.reload();
    }
}

// Fungsi untuk menampilkan data yang ada
function showCurrentData() {
    const data = localStorage.getItem('pendaftaranLomba');
    if (data) {
        const parsedData = JSON.parse(data);
        console.log('Data saat ini:', parsedData);
        console.log('Total data:', Array.isArray(parsedData) ? parsedData.length : 1);
    } else {
        console.log('Tidak ada data tersimpan');
    }
}

// Auto-run jika di halaman demo
if (window.location.pathname.includes('demo')) {
    console.log('Demo data script loaded');
    console.log('Gunakan addDemoData() untuk menambahkan data demo');
    console.log('Gunakan clearAllData() untuk menghapus semua data');
    console.log('Gunakan showCurrentData() untuk melihat data saat ini');
} 