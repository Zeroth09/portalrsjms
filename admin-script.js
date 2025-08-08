// Admin Panel JavaScript untuk Portal Lomba

let currentData = [];
let selectedRegistration = null;
let pieChart = null;
let lineChart = null;

// Inisialisasi halaman
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupNavigation();
    setupEventListeners();
    updateStatistics();
    loadRecentRegistrations();
});

// Load data dari localStorage
function loadData() {
    const data = localStorage.getItem('pendaftaranLomba');
    if (data) {
        try {
            currentData = JSON.parse(data);
            if (!Array.isArray(currentData)) {
                currentData = [currentData];
            }
        } catch (e) {
            console.error('Error parsing data:', e);
            currentData = [];
        }
    } else {
        currentData = [];
    }
}

// Setup navigasi sidebar
function setupNavigation() {
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class dari semua link
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class ke link yang diklik
            this.classList.add('active');
            
            // Hide semua section
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show section yang sesuai
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
                
                // Load data sesuai section
                if (targetId === 'pendaftaran') {
                    loadDataTable();
                } else if (targetId === 'statistik') {
                    loadCharts();
                }
            }
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Filter lomba
    document.getElementById('filterLomba').addEventListener('change', function() {
        loadDataTable();
    });
    
    // Search input
    document.getElementById('searchInput').addEventListener('input', function() {
        loadDataTable();
    });
    
    // Export lomba
    document.getElementById('exportLomba').addEventListener('change', function() {
        // Trigger export jika ada perubahan
    });
}

// Update statistics
function updateStatistics() {
    const stats = getStatistics();
    
    document.getElementById('totalVideoUcapan').textContent = stats.videoUcapan;
    document.getElementById('totalGobakSodor').textContent = stats.gobakSodor;
    document.getElementById('totalDuelKardus').textContent = stats.duelKardus;
    document.getElementById('totalVideoTiktok').textContent = stats.videoTiktok;
    document.getElementById('totalSepedaHias').textContent = stats.sepedaHias;
}

// Get statistics dari data
function getStatistics() {
    const stats = {
        videoUcapan: 0,
        gobakSodor: 0,
        duelKardus: 0,
        videoTiktok: 0,
        sepedaHias: 0
    };
    
    currentData.forEach(item => {
        switch(item.lombaType) {
            case 'video-ucapan':
                stats.videoUcapan++;
                break;
            case 'gobak-sodor':
                stats.gobakSodor++;
                break;
            case 'duel-kardus':
                stats.duelKardus++;
                break;
            case 'video-tiktok':
                stats.videoTiktok++;
                break;
            case 'sepeda-hias':
                stats.sepedaHias++;
                break;
        }
    });
    
    return stats;
}

// Load recent registrations
function loadRecentRegistrations() {
    const container = document.getElementById('recentRegistrations');
    
    if (currentData.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <p>Belum ada data pendaftaran</p>
            </div>
        `;
        return;
    }
    
    // Sort by timestamp (newest first)
    const sortedData = [...currentData].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    // Take latest 5
    const recentData = sortedData.slice(0, 5);
    
    let html = '';
    recentData.forEach(item => {
        const date = new Date(item.timestamp).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const lombaName = getLombaName(item.lombaType);
        const namaTim = item.data.nama_tim || item.data.nama_lengkap || 'N/A';
        
        html += `
            <div class="registration-item">
                <div class="registration-header">
                    <span class="registration-title">${namaTim}</span>
                    <span class="badge bg-${getLombaColor(item.lombaType)}">${lombaName}</span>
                </div>
                <div class="registration-details">
                    <small class="text-muted">${date}</small>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Load data table
function loadDataTable() {
    const tableBody = document.getElementById('dataTable');
    const filterLomba = document.getElementById('filterLomba').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    // Filter data
    let filteredData = currentData;
    
    if (filterLomba) {
        filteredData = filteredData.filter(item => item.lombaType === filterLomba);
    }
    
    if (searchTerm) {
        filteredData = filteredData.filter(item => {
            const namaTim = (item.data.nama_tim || item.data.nama_lengkap || '').toLowerCase();
            const unit = (item.data.unit || '').toLowerCase();
            return namaTim.includes(searchTerm) || unit.includes(searchTerm);
        });
    }
    
    if (filteredData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-muted">
                    Tidak ada data yang sesuai dengan filter
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    filteredData.forEach(item => {
        const date = new Date(item.timestamp).toLocaleDateString('id-ID');
        const lombaName = getLombaName(item.lombaType);
        const namaTim = item.data.nama_tim || item.data.nama_lengkap || 'N/A';
        const unit = item.data.unit || 'N/A';
        const noHp = item.data.no_hp || 'N/A';
        
        html += `
            <tr>
                <td>${item.id}</td>
                <td>${date}</td>
                <td><span class="badge bg-${getLombaColor(item.lombaType)}">${lombaName}</span></td>
                <td>${namaTim}</td>
                <td>${unit}</td>
                <td>${noHp}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="showDetail(${item.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

// Show detail modal
function showDetail(id) {
    const item = currentData.find(data => data.id === id);
    if (!item) return;
    
    selectedRegistration = item;
    
    const modal = new bootstrap.Modal(document.getElementById('detailModal'));
    const content = document.getElementById('detailContent');
    
    const date = new Date(item.timestamp).toLocaleString('id-ID');
    const lombaName = getLombaName(item.lombaType);
    
    let detailHtml = `
        <div class="row">
            <div class="col-md-6">
                <h6>Informasi Umum</h6>
                <table class="table table-sm">
                    <tr><td>ID</td><td>: ${item.id}</td></tr>
                    <tr><td>Tanggal</td><td>: ${date}</td></tr>
                    <tr><td>Jenis Lomba</td><td>: ${lombaName}</td></tr>
                </table>
            </div>
            <div class="col-md-6">
                <h6>Data Pendaftar</h6>
                <table class="table table-sm">
    `;
    
    // Add form data
    Object.entries(item.data).forEach(([key, value]) => {
        const label = getFieldLabel(key);
        detailHtml += `<tr><td>${label}</td><td>: ${value || '-'}</td></tr>`;
    });
    
    detailHtml += `
                </table>
            </div>
        </div>
    `;
    
    content.innerHTML = detailHtml;
    modal.show();
}

// Delete item
function deleteItem(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        currentData = currentData.filter(item => item.id !== id);
        localStorage.setItem('pendaftaranLomba', JSON.stringify(currentData));
        
        updateStatistics();
        loadRecentRegistrations();
        loadDataTable();
        
        showAlert('Data berhasil dihapus!', 'success');
    }
}

// Delete registration from modal
function deleteRegistration() {
    if (selectedRegistration) {
        deleteItem(selectedRegistration.id);
        const modal = bootstrap.Modal.getInstance(document.getElementById('detailModal'));
        modal.hide();
    }
}

// Clear all data
function clearAllData() {
    if (confirm('Apakah Anda yakin ingin menghapus SEMUA data pendaftaran? Tindakan ini tidak dapat dibatalkan!')) {
        localStorage.removeItem('pendaftaranLomba');
        currentData = [];
        
        updateStatistics();
        loadRecentRegistrations();
        loadDataTable();
        
        showAlert('Semua data berhasil dihapus!', 'success');
    }
}

// Load charts
function loadCharts() {
    loadPieChart();
    loadLineChart();
}

// Load pie chart
function loadPieChart() {
    const ctx = document.getElementById('pieChart');
    if (!ctx) return;
    
    const stats = getStatistics();
    const labels = ['Video Ucapan', 'Gobak Sodor', 'Duel Kardus', 'Video TikTok', 'Sepeda Hias'];
    const data = [stats.videoUcapan, stats.gobakSodor, stats.duelKardus, stats.videoTiktok, stats.sepedaHias];
    const colors = ['#dc3545', '#28a745', '#ffc107', '#17a2b8', '#6f42c1'];
    
    if (pieChart) {
        pieChart.destroy();
    }
    
    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Load line chart
function loadLineChart() {
    const ctx = document.getElementById('lineChart');
    if (!ctx) return;
    
    // Group data by date
    const dateGroups = {};
    currentData.forEach(item => {
        const date = new Date(item.timestamp).toLocaleDateString('id-ID');
        if (!dateGroups[date]) {
            dateGroups[date] = 0;
        }
        dateGroups[date]++;
    });
    
    const dates = Object.keys(dateGroups).sort();
    const counts = dates.map(date => dateGroups[date]);
    
    if (lineChart) {
        lineChart.destroy();
    }
    
    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Jumlah Pendaftaran',
                data: counts,
                borderColor: '#dc3545',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Export to CSV
function exportToCSV() {
    if (currentData.length === 0) {
        showAlert('Tidak ada data untuk diexport!', 'warning');
        return;
    }
    
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'ID,Tanggal,Jenis Lomba,Nama Tim,Unit,No HP,Email,Catatan\n';
    
    currentData.forEach(item => {
        const date = new Date(item.timestamp).toLocaleDateString('id-ID');
        const lombaName = getLombaName(item.lombaType);
        const namaTim = item.data.nama_tim || item.data.nama_lengkap || '';
        const unit = item.data.unit || '';
        const noHp = item.data.no_hp || '';
        const email = item.data.email || '';
        const catatan = item.data.catatan || '';
        
        const row = [
            item.id,
            date,
            lombaName,
            namaTim,
            unit,
            noHp,
            email,
            catatan
        ].map(field => `"${field}"`).join(',');
        
        csvContent += row + '\n';
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pendaftaran_lomba_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showAlert('Data berhasil diexport!', 'success');
}

// Export by lomba
function exportByLomba() {
    const selectedLomba = document.getElementById('exportLomba').value;
    if (!selectedLomba) {
        showAlert('Pilih jenis lomba terlebih dahulu!', 'warning');
        return;
    }
    
    const filteredData = currentData.filter(item => item.lombaType === selectedLomba);
    
    if (filteredData.length === 0) {
        showAlert('Tidak ada data untuk lomba yang dipilih!', 'warning');
        return;
    }
    
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'ID,Tanggal,Nama Tim,Unit,No HP,Email,Catatan\n';
    
    filteredData.forEach(item => {
        const date = new Date(item.timestamp).toLocaleDateString('id-ID');
        const namaTim = item.data.nama_tim || item.data.nama_lengkap || '';
        const unit = item.data.unit || '';
        const noHp = item.data.no_hp || '';
        const email = item.data.email || '';
        const catatan = item.data.catatan || '';
        
        const row = [
            item.id,
            date,
            namaTim,
            unit,
            noHp,
            email,
            catatan
        ].map(field => `"${field}"`).join(',');
        
        csvContent += row + '\n';
    });
    
    const lombaName = getLombaName(selectedLomba).replace(/\s+/g, '_');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pendaftaran_${lombaName}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showAlert(`Data ${getLombaName(selectedLomba)} berhasil diexport!`, 'success');
}

// Helper functions
function getLombaName(type) {
    const names = {
        'video-ucapan': 'Video Ucapan',
        'gobak-sodor': 'Gobak Sodor',
        'duel-kardus': 'Duel Kardus',
        'video-tiktok': 'Video TikTok',
        'sepeda-hias': 'Sepeda Hias'
    };
    return names[type] || type;
}

function getLombaColor(type) {
    const colors = {
        'video-ucapan': 'danger',
        'gobak-sodor': 'success',
        'duel-kardus': 'warning',
        'video-tiktok': 'info',
        'sepeda-hias': 'primary'
    };
    return colors[type] || 'secondary';
}

function getFieldLabel(key) {
    const labels = {
        'nama_tim': 'Nama Tim',
        'nama_lengkap': 'Nama Lengkap',
        'unit': 'Unit',
        'no_hp': 'No. HP',
        'email': 'Email',
        'catatan': 'Catatan',
        'anggota_tim': 'Anggota Tim',
        'jumlah_anggota': 'Jumlah Anggota',
        'username_tiktok': 'Username TikTok',
        'alamat': 'Alamat',
        'judul_video': 'Judul Video',
        'deskripsi_video': 'Deskripsi Video',
        'tema_hiasan': 'Tema Hiasan',
        'deskripsi_konsep': 'Deskripsi Konsep'
    };
    return labels[key] || key;
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container-fluid');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Console log untuk debugging
console.log('Admin Panel telah dimuat!');
console.log('Fitur yang tersedia:');
console.log('- Dashboard dengan statistik');
console.log('- Manajemen data pendaftaran');
console.log('- Filter dan pencarian data');
console.log('- Export data ke CSV');
console.log('- Chart dan visualisasi data'); 