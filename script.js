// JavaScript untuk Portal Lomba Kemerdekaan RI Ke-80

// Fungsi untuk menampilkan modal berdasarkan jenis lomba
function showModal(lombaType) {
    let modalId = '';
    
    switch(lombaType) {
        case 'video-ucapan':
            modalId = 'videoUcapanModal';
            break;
        case 'gobak-sodor':
            modalId = 'gobakSodorModal';
            break;
        case 'duel-kardus':
            modalId = 'duelKardusModal';
            break;
        case 'video-tiktok':
            modalId = 'videoTiktokModal';
            break;
        case 'sepeda-hias':
            modalId = 'sepedaHiasModal';
            break;
        default:
            console.error('Jenis lomba tidak ditemukan');
            return;
    }
    
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();
}

// Fungsi untuk submit form
function submitForm(formId, lombaType) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    
    // Validasi form
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Tampilkan loading
    const submitBtn = form.querySelector('button[type="button"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Mengirim...';
    submitBtn.disabled = true;
    
    // Simulasi pengiriman data (dalam implementasi nyata, ini akan dikirim ke server)
    setTimeout(() => {
        // Simpan data ke localStorage untuk demo
        const data = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            lombaType: lombaType,
            data: Object.fromEntries(formData)
        };
        
        // Simpan ke localStorage
        const existingData = JSON.parse(localStorage.getItem('pendaftaranLomba') || '[]');
        existingData.push(data);
        localStorage.setItem('pendaftaranLomba', JSON.stringify(data));
        
        // Tutup modal
        const modal = bootstrap.Modal.getInstance(form.closest('.modal'));
        modal.hide();
        
        // Reset form
        form.reset();
        
        // Tampilkan modal sukses
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Log data untuk debugging
        console.log('Data pendaftaran:', data);
        
    }, 2000);
}

// Fungsi untuk smooth scrolling
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Fungsi untuk animasi fade-in saat scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.lomba-card, .feature-box, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Fungsi untuk validasi nomor telepon
function validatePhone(input) {
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    return phoneRegex.test(input);
}

// Fungsi untuk validasi email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi animasi scroll
    animateOnScroll();
    
    // Smooth scrolling untuk navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    // Validasi form real-time
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.classList.add('is-invalid');
                this.setCustomValidity('Format nomor telepon tidak valid');
            } else {
                this.classList.remove('is-invalid');
                this.setCustomValidity('');
            }
        });
    });
    
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.classList.add('is-invalid');
                this.setCustomValidity('Format email tidak valid');
            } else {
                this.classList.remove('is-invalid');
                this.setCustomValidity('');
            }
        });
    });
    
    // Auto-hide navbar saat scroll down
    let lastScrollTop = 0;
    const navbar = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Tambahkan efek parallax pada hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Tambahkan efek typing pada hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Tambahkan efek hover pada cards
    document.querySelectorAll('.lomba-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Tambahkan efek ripple pada buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Fungsi untuk export data ke spreadsheet (untuk demo)
function exportToSpreadsheet() {
    const data = JSON.parse(localStorage.getItem('pendaftaranLomba') || '[]');
    
    if (data.length === 0) {
        alert('Belum ada data pendaftaran');
        return;
    }
    
    // Buat CSV content
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'ID,Timestamp,Jenis Lomba,Nama Tim,Unit,No HP,Email,Catatan\n';
    
    data.forEach(item => {
        const row = [
            item.id,
            item.timestamp,
            item.lombaType,
            item.data.nama_tim || item.data.nama_lengkap || '',
            item.data.unit || '',
            item.data.no_hp || '',
            item.data.email || '',
            item.data.catatan || ''
        ].join(',');
        csvContent += row + '\n';
    });
    
    // Download file
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'pendaftaran_lomba.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Fungsi untuk menampilkan statistik pendaftaran
function showStatistics() {
    const data = JSON.parse(localStorage.getItem('pendaftaranLomba') || '[]');
    
    const stats = {
        total: data.length,
        videoUcapan: data.filter(item => item.lombaType === 'video-ucapan').length,
        gobakSodor: data.filter(item => item.lombaType === 'gobak-sodor').length,
        duelKardus: data.filter(item => item.lombaType === 'duel-kardus').length,
        videoTiktok: data.filter(item => item.lombaType === 'video-tiktok').length,
        sepedaHias: data.filter(item => item.lombaType === 'sepeda-hias').length
    };
    
    alert(`Statistik Pendaftaran:\n\n` +
          `Total Pendaftar: ${stats.total}\n` +
          `Video Ucapan: ${stats.videoUcapan}\n` +
          `Gobak Sodor: ${stats.gobakSodor}\n` +
          `Duel Kardus: ${stats.duelKardus}\n` +
          `Video TikTok: ${stats.videoTiktok}\n` +
          `Sepeda Hias: ${stats.sepedaHias}`);
}

// Tambahkan CSS untuk ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .header {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Console log untuk debugging
console.log('Portal Lomba Kemerdekaan RI Ke-80 telah dimuat!');
console.log('Fitur yang tersedia:');
console.log('- Form pendaftaran untuk 5 jenis lomba');
console.log('- Validasi form real-time');
console.log('- Animasi dan efek visual');
console.log('- Penyimpanan data lokal');
console.log('- Export data ke CSV');
console.log('- Statistik pendaftaran'); 