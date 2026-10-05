/**
 * Pagulung Tambako - Common UI & Layout Logic
 */

(function() {
    // Initialize common UI components
    function initLayout() {
        const user = PagulungStore.getCurrentUser();
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        // 1. Setup User Info in Topbar if exists
        const userAvatar = document.querySelector('.user-avatar');
        const userName = document.querySelector('.user-details .name');
        const userRole = document.querySelector('.user-details .role');

        if (userAvatar && user) {
            userAvatar.textContent = (user.nama_lengkap || 'U').charAt(0).toUpperCase();
        }
        if (userName && user) {
            userName.textContent = user.nama_lengkap;
        }
        if (userRole && user) {
            userRole.textContent = user.role.toUpperCase();
        }

        // 2. Setup Notification System
        setupNotifications();

        // 3. Highlight active menu in sidebar
        highlightActiveSidebar(currentPath);
    }

    function setupNotifications() {
        const bellBtn = document.getElementById('notificationBell');
        const dot = document.getElementById('notificationDot');
        const dropdown = document.getElementById('notificationDropdown');
        const body = document.getElementById('notificationBody');

        if (!bellBtn || !dropdown || !body) return;

        function refreshNotifications() {
            const notes = PagulungStore.getNotifications();
            if (notes.length > 0) {
                if (dot) dot.style.display = 'block';
                let html = '';
                notes.forEach(item => {
                    const statusClass = item.status_stok === 'habis' ? 'status-habis' : 'status-hampir-habis';
                    const badgeClass = item.status_stok === 'habis' ? 'habis' : 'hampir-habis';
                    const stockIcon = item.status_stok === 'habis' ? 'fa-times-circle' : 'fa-exclamation-triangle';
                    const stockColor = item.status_stok === 'habis' ? '#dc3545' : '#ffc107';

                    html += `
                        <a href="barang.html?search=${encodeURIComponent(item.kode_barang)}" class="notification-item ${statusClass}">
                            <div class="notification-item-title">${item.nama_barang}</div>
                            <div class="notification-item-details">
                                <span class="notification-item-stock">
                                    <i class="fas ${stockIcon}" style="color: ${stockColor}"></i>
                                    <strong>${item.stok_formatted}</strong> ${item.satuan}
                                </span>
                                <span class="text-muted">•</span>
                                <span class="text-muted" style="font-size: 0.8rem">ROP: ${item.rop_formatted}</span>
                            </div>
                            <span class="notification-item-badge ${badgeClass}">${item.status_text}</span>
                        </a>
                    `;
                });
                body.innerHTML = html;
            } else {
                if (dot) dot.style.display = 'none';
                body.innerHTML = `
                    <div class="notification-empty">
                        <i class="fas fa-check-circle text-success" style="font-size: 2rem; margin-bottom: 8px;"></i>
                        <p>Tidak ada notifikasi stok</p>
                        <small class="text-muted">Semua stok dalam kondisi aman</small>
                    </div>
                `;
            }
        }

        refreshNotifications();

        bellBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('show');
            refreshNotifications();
        });

        document.addEventListener('click', function(e) {
            if (!bellBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }

    function highlightActiveSidebar(currentPath) {
        const links = document.querySelectorAll('#sidebar .nav-link');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPath)) {
                link.classList.add('active');
            }
        });
    }

    // Global alert display
    window.showToast = function(message, type = 'success') {
        const alertBox = document.createElement('div');
        alertBox.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertBox.style.cssText = 'top: 20px; right: 20px; z-index: 99999; min-width: 300px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);';
        alertBox.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alertBox);
        setTimeout(() => {
            alertBox.classList.remove('show');
            setTimeout(() => alertBox.remove(), 300);
        }, 4000);
    };

    window.confirmDelete = function(msg) {
        return confirm(msg || 'Yakin ingin menghapus data ini?');
    };

    window.formatRupiah = function(angka) {
        return PagulungStore.formatRupiah(angka);
    };

    window.logoutApp = function() {
        if (confirm('Yakin ingin keluar?')) {
            window.location.href = 'landing.html';
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLayout);
    } else {
        initLayout();
    }
})();
