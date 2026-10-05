/**
 * Pagulung Tambako Bone - Global Demo Navigator
 * Enables testing all 15 views and changing simulated roles seamlessly on GitHub Pages
 */

(function() {
    function initDemoDock() {
        if (document.getElementById('pagulung-demo-dock')) return;

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const currentUser = (typeof PagulungStore !== 'undefined') ? PagulungStore.getCurrentUser() : { role: 'gudang', nama_lengkap: 'Staff Gudang' };

        const dockContainer = document.createElement('div');
        dockContainer.id = 'pagulung-demo-dock';
        dockContainer.className = 'pagulung-demo-dock';

        const sections = [
            {
                title: 'Umum & Autentikasi',
                icon: 'fa-globe',
                links: [
                    { title: 'Landing Page', file: 'index.html', icon: 'fa-house' },
                    { title: 'Halaman Login', file: 'login.html', icon: 'fa-right-to-bracket' },
                    { title: 'Error 403', file: '403.html', icon: 'fa-ban' }
                ]
            },
            {
                title: 'Role Gudang',
                icon: 'fa-warehouse',
                links: [
                    { title: 'Dashboard Gudang', file: 'dashboard-gudang.html', icon: 'fa-chart-pie' },
                    { title: 'Data Barang', file: 'barang.html', icon: 'fa-box' },
                    { title: 'Tambah Barang', file: 'barang-tambah.html', icon: 'fa-plus' },
                    { title: 'Barang Masuk', file: 'barang-masuk.html', icon: 'fa-arrow-down' },
                    { title: 'Input Masuk Baru', file: 'barang-masuk-tambah.html', icon: 'fa-file-circle-plus' },
                    { title: 'Kategori', file: 'kategori.html', icon: 'fa-tags' }
                ]
            },
            {
                title: 'Role Kasir (POS)',
                icon: 'fa-cash-register',
                links: [
                    { title: 'Dashboard Kasir', file: 'dashboard-kasir.html', icon: 'fa-calculator' },
                    { title: 'Point of Sale (POS)', file: 'pos.html', icon: 'fa-cart-shopping' },
                    { title: 'Cetak Struk', file: 'struk.html', icon: 'fa-receipt' }
                ]
            },
            {
                title: 'Role Pimpinan',
                icon: 'fa-user-tie',
                links: [
                    { title: 'Dashboard Pimpinan', file: 'dashboard-pimpinan.html', icon: 'fa-chart-line' },
                    { title: 'Kelola Pengguna', file: 'users.html', icon: 'fa-users' },
                    { title: 'Laporan Lengkap', file: 'laporan.html', icon: 'fa-file-lines' }
                ]
            }
        ];

        let linksHtml = '';
        sections.forEach(sec => {
            linksHtml += `
                <div class="dock-nav-section">
                    <div class="dock-section-title">
                        <i class="fas ${sec.icon}"></i> ${sec.title}
                    </div>
                    <div class="dock-links-list">
            `;
            sec.links.forEach(l => {
                const isActive = (currentPath === l.file) ? 'active' : '';
                linksHtml += `
                    <a href="${l.file}" class="dock-link-item ${isActive}">
                        <i class="fas ${l.icon}"></i> ${l.title}
                    </a>
                `;
            });
            linksHtml += `
                    </div>
                </div>
            `;
        });

        dockContainer.innerHTML = `
            <button class="dock-trigger-btn" id="dockTriggerBtn" title="Buka Navigator Demo Tampilan">
                <span class="dock-pulse-dot"></span>
                <i class="fas fa-compass"></i>
                <span>Demo View Switcher</span>
            </button>

            <div class="dock-panel" id="dockPanel">
                <div class="dock-header">
                    <h5 class="dock-header-title">
                        <i class="fas fa-boxes-stacked"></i> Pagulung Tembako Preview
                    </h5>
                    <button class="dock-close-btn" id="dockCloseBtn">&times;</button>
                </div>

                <div class="dock-body">
                    <div class="dock-role-switcher">
                        <div class="dock-role-title">
                            <span>Simulasi Role</span>
                            <span class="dock-role-badge">${currentUser.role.toUpperCase()}</span>
                        </div>
                        <div class="dock-role-buttons">
                            <button class="dock-role-btn ${currentUser.role === 'gudang' ? 'active' : ''}" onclick="window.switchDemoRole('gudang')">
                                <i class="fas fa-warehouse me-1"></i>Gudang
                            </button>
                            <button class="dock-role-btn ${currentUser.role === 'kasir' ? 'active' : ''}" onclick="window.switchDemoRole('kasir')">
                                <i class="fas fa-cash-register me-1"></i>Kasir
                            </button>
                            <button class="dock-role-btn ${currentUser.role === 'pimpinan' ? 'active' : ''}" onclick="window.switchDemoRole('pimpinan')">
                                <i class="fas fa-user-tie me-1"></i>Pimpinan
                            </button>
                        </div>
                    </div>

                    ${linksHtml}
                </div>

                <div class="dock-footer">
                    <button class="dock-reset-btn" onclick="window.resetDemoData()">
                        <i class="fas fa-rotate-left me-1"></i> Reset Data
                    </button>
                    <span class="dock-badge-github">
                        <i class="fab fa-github"></i> GitHub Ready
                    </span>
                </div>
            </div>
        `;

        document.body.appendChild(dockContainer);

        const trigger = document.getElementById('dockTriggerBtn');
        const panel = document.getElementById('dockPanel');
        const close = document.getElementById('dockCloseBtn');

        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            panel.classList.toggle('show');
        });

        close.addEventListener('click', function(e) {
            e.stopPropagation();
            panel.classList.remove('show');
        });

        document.addEventListener('click', function(e) {
            if (!dockContainer.contains(e.target)) {
                panel.classList.remove('show');
            }
        });
    }

    window.switchDemoRole = function(role) {
        if (typeof PagulungStore === 'undefined') return;
        let user;
        if (role === 'gudang') user = { id: 2, username: 'gudang', nama_lengkap: 'Staff Gudang', role: 'gudang' };
        else if (role === 'kasir') user = { id: 1, username: 'kasir', nama_lengkap: 'Kasir Default', role: 'kasir' };
        else if (role === 'pimpinan') user = { id: 3, username: 'pimpinan', nama_lengkap: 'Pimpinan Pagulung', role: 'pimpinan' };

        PagulungStore.setCurrentUser(user);

        // Redirect to that role's primary dashboard if we are currently on a dashboard
        const currentPath = window.location.pathname.split('/').pop() || '';
        if (currentPath.includes('dashboard-')) {
            window.location.href = `dashboard-${role}.html`;
        } else {
            window.location.reload();
        }
    };

    window.resetDemoData = function() {
        if (confirm('Kembalikan semua data demo (stok, barang, transaksi, user) ke awal?')) {
            if (typeof PagulungStore !== 'undefined') {
                PagulungStore.resetToDefault();
            }
            alert('Data berhasil di-reset!');
            window.location.reload();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDemoDock);
    } else {
        initDemoDock();
    }
})();
