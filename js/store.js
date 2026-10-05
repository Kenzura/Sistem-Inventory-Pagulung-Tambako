/**
 * Pagulung Tambako Bone - LocalStorage Data Store
 * Provides persistent mock data and FIFO / ROP logic for the static web preview
 */

const PagulungStore = (function() {
    const STORAGE_KEY = 'pagulung_tambako_data_v1';
    const SESSION_KEY = 'pagulung_current_user_v1';

    // Seed Data based on real MySQL database
    const initialData = {
        users: [
            { id: 1, username: 'kasir', nama_lengkap: 'Kasir Default', role: 'kasir', status: 'aktif' },
            { id: 2, username: 'gudang', nama_lengkap: 'Staff Gudang', role: 'gudang', status: 'aktif' },
            { id: 3, username: 'pimpinan', nama_lengkap: 'Pimpinan Pagulung', role: 'pimpinan', status: 'aktif' }
        ],
        categories: [
            { id: 1, kode_kategori: 'TBO', nama_kategori: 'Tembakau Original', created_at: '2026-01-20 10:02:52' },
            { id: 2, kode_kategori: 'TBK', nama_kategori: 'Tembakau Kretek', created_at: '2026-01-20 10:02:52' },
            { id: 3, kode_kategori: 'AKS', nama_kategori: 'Aksesoris Rokok', created_at: '2026-01-20 10:02:52' },
            { id: 4, kode_kategori: 'TBR', nama_kategori: 'Tembakau Rasa', created_at: '2026-01-20 13:20:48' },
            { id: 5, kode_kategori: 'ALT', nama_kategori: 'Alat Pendukung', created_at: '2026-01-20 13:23:22' }
        ],
        barang: [
            {
                id: 9,
                kode_barang: 'AKS001',
                category_id: 3,
                nama_barang: 'Kotak Rokok',
                harga_jual: 30000,
                satuan: 'pcs',
                satuan_penjualan: 'g',
                stok_total: 0,
                rata_penjualan_harian: 2,
                lama_pengiriman: 9,
                safety_stock: 1,
                reorder_point: 19,
                satuan_jual: null,
                gram_per_satuan_jual: null
            },
            {
                id: 10,
                kode_barang: 'TBO001',
                category_id: 1,
                nama_barang: 'Marlboro Putih',
                harga_jual: 16000,
                satuan: 'kg',
                satuan_penjualan: 'g',
                stok_total: 44850,
                rata_penjualan_harian: 4,
                lama_pengiriman: 9,
                safety_stock: 2000,
                reorder_point: 38000,
                satuan_jual: 'pcs',
                gram_per_satuan_jual: 50
            },
            {
                id: 11,
                kode_barang: 'TBO002',
                category_id: 1,
                nama_barang: 'Marlboro Merah',
                harga_jual: 16000,
                satuan: 'kg',
                satuan_penjualan: 'g',
                stok_total: 29900,
                rata_penjualan_harian: 2,
                lama_pengiriman: 9,
                safety_stock: 1000,
                reorder_point: 19000,
                satuan_jual: 'pcs',
                gram_per_satuan_jual: 50
            },
            {
                id: 12,
                kode_barang: 'TBK001',
                category_id: 2,
                nama_barang: 'Surya',
                harga_jual: 15000,
                satuan: 'kg',
                satuan_penjualan: 'g',
                stok_total: 25000,
                rata_penjualan_harian: 2,
                lama_pengiriman: 3,
                safety_stock: 1000,
                reorder_point: 7000,
                satuan_jual: 'pcs',
                gram_per_satuan_jual: 50
            },
            {
                id: 13,
                kode_barang: 'TBK002',
                category_id: 2,
                nama_barang: 'Sampoerna',
                harga_jual: 15000,
                satuan: 'kg',
                satuan_penjualan: 'g',
                stok_total: 20000,
                rata_penjualan_harian: 3,
                lama_pengiriman: 2,
                safety_stock: 2000,
                reorder_point: 8000,
                satuan_jual: 'pcs',
                gram_per_satuan_jual: 50
            },
            {
                id: 14,
                kode_barang: 'TBR001',
                category_id: 4,
                nama_barang: 'Strawberry',
                harga_jual: 18000,
                satuan: 'pcs',
                satuan_penjualan: 'g',
                stok_total: 18,
                rata_penjualan_harian: 2,
                lama_pengiriman: 9,
                safety_stock: 1,
                reorder_point: 19,
                satuan_jual: null,
                gram_per_satuan_jual: null
            },
            {
                id: 15,
                kode_barang: 'ALT001',
                category_id: 5,
                nama_barang: 'Filter Mild',
                harga_jual: 5000,
                satuan: 'kg',
                satuan_penjualan: 'g',
                stok_total: 9856,
                rata_penjualan_harian: 2,
                lama_pengiriman: 9,
                safety_stock: 1000,
                reorder_point: 19000,
                satuan_jual: 'pcs',
                gram_per_satuan_jual: 16
            }
        ],
        batches: [
            { id: 10, barang_id: 9, kode_batch: 'BATCH-20260120-201451-5713', tanggal_masuk: '2026-01-20', jumlah_awal: 13, sisa_stok: 0 },
            { id: 11, barang_id: 10, kode_batch: 'BATCH-20260120-201517-6252', tanggal_masuk: '2026-01-20', jumlah_awal: 45000, sisa_stok: 44850 },
            { id: 12, barang_id: 11, kode_batch: 'BATCH-20260120-201649-6945', tanggal_masuk: '2026-01-20', jumlah_awal: 30000, sisa_stok: 29900 },
            { id: 13, barang_id: 12, kode_batch: 'BATCH-20260120-201833-9186', tanggal_masuk: '2026-01-20', jumlah_awal: 25000, sisa_stok: 25000 },
            { id: 14, barang_id: 13, kode_batch: 'BATCH-20260120-202004-9832', tanggal_masuk: '2026-01-20', jumlah_awal: 20000, sisa_stok: 20000 },
            { id: 15, barang_id: 14, kode_batch: 'BATCH-20260120-202208-5920', tanggal_masuk: '2026-01-20', jumlah_awal: 18, sisa_stok: 18 },
            { id: 16, barang_id: 15, kode_batch: 'BATCH-20260120-202531-7847', tanggal_masuk: '2026-01-20', jumlah_awal: 10000, sisa_stok: 9856 }
        ],
        barang_masuk: [
            { id: 10, barang_id: 9, batch_id: 10, kode_batch: 'BATCH-20260120-201451-5713', jumlah: 13, tanggal_masuk: '2026-01-20', user_id: 2, keterangan: 'Pasokan awal aksesoris' },
            { id: 11, barang_id: 10, batch_id: 11, kode_batch: 'BATCH-20260120-201517-6252', jumlah: 45000, tanggal_masuk: '2026-01-20', user_id: 2, keterangan: 'Batch 1 Marlboro Putih' },
            { id: 12, barang_id: 11, batch_id: 12, kode_batch: 'BATCH-20260120-201649-6945', jumlah: 30000, tanggal_masuk: '2026-01-20', user_id: 2, keterangan: 'Batch 1 Marlboro Merah' },
            { id: 13, barang_id: 12, batch_id: 13, kode_batch: 'BATCH-20260120-201833-9186', jumlah: 25000, tanggal_masuk: '2026-01-20', user_id: 2, keterangan: 'Pasokan tembakau Surya' },
            { id: 14, barang_id: 13, batch_id: 14, kode_batch: 'BATCH-20260120-202004-9832', jumlah: 20000, tanggal_masuk: '2026-01-20', user_id: 2, keterangan: 'Pasokan tembakau Sampoerna' },
            { id: 15, barang_id: 14, batch_id: 15, kode_batch: 'BATCH-20260120-202208-5920', jumlah: 18, tanggal_masuk: '2026-01-20', user_id: 2, keterangan: 'Varian strawberry baru' },
            { id: 16, barang_id: 15, batch_id: 16, kode_batch: 'BATCH-20260120-202531-7847', jumlah: 10000, tanggal_masuk: '2026-01-20', user_id: 2, keterangan: 'Filter rokok mild' }
        ],
        transaksi: [
            {
                id: 14,
                kode_transaksi: 'TRX-20260120-202635',
                user_id: 1,
                total_harga: 15000,
                bayar: 20000,
                kembalian: 5000,
                tanggal_transaksi: '2026-01-20 20:26:35',
                items: [
                    { barang_id: 15, jumlah: 3, harga_satuan: 5000, subtotal: 15000 }
                ]
            },
            {
                id: 15,
                kode_transaksi: 'TRX-20260120-204314',
                user_id: 1,
                total_harga: 77000,
                bayar: 100000,
                kembalian: 23000,
                tanggal_transaksi: '2026-01-20 20:43:14',
                items: [
                    { barang_id: 15, jumlah: 3, harga_satuan: 5000, subtotal: 15000 },
                    { barang_id: 9, jumlah: 1, harga_satuan: 30000, subtotal: 30000 },
                    { barang_id: 10, jumlah: 2, harga_satuan: 16000, subtotal: 32000 }
                ]
            },
            {
                id: 16,
                kode_transaksi: 'TRX-20260120-204413',
                user_id: 1,
                total_harga: 16000,
                bayar: 20000,
                kembalian: 4000,
                tanggal_transaksi: '2026-01-20 20:44:13',
                items: [
                    { barang_id: 10, jumlah: 1, harga_satuan: 16000, subtotal: 16000 }
                ]
            },
            {
                id: 17,
                kode_transaksi: 'TRX-20260120-204449',
                user_id: 1,
                total_harga: 32000,
                bayar: 50000,
                kembalian: 18000,
                tanggal_transaksi: '2026-01-20 20:44:49',
                items: [
                    { barang_id: 11, jumlah: 2, harga_satuan: 16000, subtotal: 32000 }
                ]
            },
            {
                id: 18,
                kode_transaksi: 'TRX-20260120-211833',
                user_id: 1,
                total_harga: 15000,
                bayar: 20000,
                kembalian: 5000,
                tanggal_transaksi: '2026-01-20 21:18:33',
                items: [
                    { barang_id: 15, jumlah: 3, harga_satuan: 5000, subtotal: 15000 }
                ]
            }
        ]
    };

    // Load or initialize
    function loadData() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Error parsing stored data, resetting', e);
            }
        }
        saveData(initialData);
        return JSON.parse(JSON.stringify(initialData));
    }

    function saveData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // Auth & Session
    function getCurrentUser() {
        const stored = localStorage.getItem(SESSION_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {}
        }
        // Default to Staff Gudang
        const defaultUser = { id: 2, username: 'gudang', nama_lengkap: 'Staff Gudang', role: 'gudang' };
        setCurrentUser(defaultUser);
        return defaultUser;
    }

    function setCurrentUser(user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }

    function login(username, password) {
        const data = loadData();
        const found = data.users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.status === 'aktif');
        if (found) {
            setCurrentUser(found);
            return { success: true, user: found };
        }
        return { success: false, message: 'Username atau password salah atau akun nonaktif' };
    }

    function logout() {
        localStorage.removeItem(SESSION_KEY);
    }

    // Helper functions
    function formatRupiah(num) {
        const val = Number(num) || 0;
        return 'Rp ' + val.toLocaleString('id-ID');
    }

    function formatStokDisplay(stok, satuan, satuanJual, gramPerSatuanJual) {
        const s = Number(stok) || 0;
        if (satuan === 'kg' && satuanJual && gramPerSatuanJual) {
            if (s >= 1000) {
                const kg = s / 1000;
                return kg % 1 === 0 ? kg.toString() : kg.toFixed(2).replace(/\.?0+$/, '');
            }
            return s.toLocaleString('id-ID');
        }
        return s.toLocaleString('id-ID');
    }

    function getStatusStok(stokTotal, rop) {
        if (stokTotal === 0) return 'Habis';
        if (stokTotal <= rop) return 'Waspada';
        return 'Aman';
    }

    function calculateROP(rataPenjualanHarian, lamaPengiriman, satuan, satuanJual, gramPerSatuanJual) {
        const d = parseInt(rataPenjualanHarian) || 0;
        const lt = parseInt(lamaPengiriman) || 0;
        let ss = Math.ceil(d * 0.5);
        let rop = (d * lt) + ss;

        if (satuan === 'kg' && satuanJual && gramPerSatuanJual) {
            ss = ss * 1000;
            rop = rop * 1000;
        }

        return { safety_stock: ss, reorder_point: rop };
    }

    // Data Access Methods
    function getCategories() {
        const data = loadData();
        return data.categories.map(c => {
            const count = data.barang.filter(b => b.category_id === c.id).length;
            return { ...c, jumlah_barang: count };
        });
    }

    function saveCategory(cat) {
        const data = loadData();
        if (cat.id) {
            const idx = data.categories.findIndex(c => c.id === parseInt(cat.id));
            if (idx >= 0) {
                data.categories[idx].nama_kategori = cat.nama_kategori;
                data.categories[idx].kode_kategori = cat.kode_kategori;
            }
        } else {
            const newId = data.categories.length > 0 ? Math.max(...data.categories.map(c => c.id)) + 1 : 1;
            data.categories.push({
                id: newId,
                kode_kategori: cat.kode_kategori.toUpperCase(),
                nama_kategori: cat.nama_kategori,
                created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
            });
        }
        saveData(data);
        return true;
    }

    function deleteCategory(id) {
        const data = loadData();
        data.categories = data.categories.filter(c => c.id !== parseInt(id));
        // Also remove or unlink items
        data.barang = data.barang.filter(b => b.category_id !== parseInt(id));
        saveData(data);
        return true;
    }

    function getBarang(filters = {}) {
        const data = loadData();
        let items = data.barang.map(b => {
            const cat = data.categories.find(c => c.id === b.category_id);
            const status = getStatusStok(b.stok_total, b.reorder_point);
            return {
                ...b,
                nama_kategori: cat ? cat.nama_kategori : 'Umum',
                kode_kategori: cat ? cat.kode_kategori : '',
                status_stok: status
            };
        });

        if (filters.search) {
            const s = filters.search.toLowerCase();
            items = items.filter(b => b.nama_barang.toLowerCase().includes(s) || b.kode_barang.toLowerCase().includes(s));
        }

        if (filters.category_id) {
            items = items.filter(b => b.category_id === parseInt(filters.category_id));
        }

        if (filters.status) {
            items = items.filter(b => b.status_stok.toLowerCase() === filters.status.toLowerCase());
        }

        return items;
    }

    function getBarangById(id) {
        const items = getBarang();
        return items.find(b => b.id === parseInt(id));
    }

    function saveBarang(item) {
        const data = loadData();
        const ropCalc = calculateROP(
            item.rata_penjualan_harian,
            item.lama_pengiriman,
            item.satuan,
            item.satuan_jual,
            item.gram_per_satuan_jual
        );

        if (item.id) {
            const idx = data.barang.findIndex(b => b.id === parseInt(item.id));
            if (idx >= 0) {
                data.barang[idx] = {
                    ...data.barang[idx],
                    nama_barang: item.nama_barang,
                    category_id: parseInt(item.category_id),
                    harga_jual: parseFloat(item.harga_jual),
                    satuan: item.satuan,
                    satuan_jual: item.satuan_jual || null,
                    gram_per_satuan_jual: item.gram_per_satuan_jual ? parseInt(item.gram_per_satuan_jual) : null,
                    rata_penjualan_harian: parseInt(item.rata_penjualan_harian) || 0,
                    lama_pengiriman: parseInt(item.lama_pengiriman) || 7,
                    safety_stock: ropCalc.safety_stock,
                    reorder_point: ropCalc.reorder_point
                };
            }
        } else {
            const newId = data.barang.length > 0 ? Math.max(...data.barang.map(b => b.id)) + 1 : 1;
            data.barang.push({
                id: newId,
                kode_barang: item.kode_barang,
                category_id: parseInt(item.category_id),
                nama_barang: item.nama_barang,
                harga_jual: parseFloat(item.harga_jual),
                satuan: item.satuan,
                satuan_penjualan: 'g',
                stok_total: parseInt(item.stok_awal) || 0,
                rata_penjualan_harian: parseInt(item.rata_penjualan_harian) || 0,
                lama_pengiriman: parseInt(item.lama_pengiriman) || 7,
                safety_stock: ropCalc.safety_stock,
                reorder_point: ropCalc.reorder_point,
                satuan_jual: item.satuan_jual || null,
                gram_per_satuan_jual: item.gram_per_satuan_jual ? parseInt(item.gram_per_satuan_jual) : null
            });

            // If initial stock provided, create a batch
            if (parseInt(item.stok_awal) > 0) {
                const now = new Date();
                const pad = n => n.toString().padStart(2, '0');
                const dateStr = now.toISOString().slice(0, 10);
                const batchCode = `BATCH-${dateStr.replace(/-/g, '')}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}-${Math.floor(1000 + Math.random() * 9000)}`;
                const batchId = data.batches.length > 0 ? Math.max(...data.batches.map(bt => bt.id)) + 1 : 1;
                data.batches.push({
                    id: batchId,
                    barang_id: newId,
                    kode_batch: batchCode,
                    tanggal_masuk: dateStr,
                    jumlah_awal: parseInt(item.stok_awal),
                    sisa_stok: parseInt(item.stok_awal)
                });
            }
        }
        saveData(data);
        return true;
    }

    function deleteBarang(id) {
        const data = loadData();
        data.barang = data.barang.filter(b => b.id !== parseInt(id));
        saveData(data);
        return true;
    }

    function getNextBarangCode(categoryId) {
        const data = loadData();
        const cat = data.categories.find(c => c.id === parseInt(categoryId));
        if (!cat) return 'BRG001';
        const prefix = cat.kode_kategori;
        const matching = data.barang.filter(b => b.kode_barang.startsWith(prefix));
        let maxNum = 0;
        matching.forEach(b => {
            const numStr = b.kode_barang.substring(prefix.length);
            const num = parseInt(numStr);
            if (!isNaN(num) && num > maxNum) maxNum = num;
        });
        return `${prefix}${(maxNum + 1).toString().padStart(3, '0')}`;
    }

    // FIFO Barang Masuk
    function getBarangMasuk(filters = {}) {
        const data = loadData();
        let list = data.barang_masuk.map(bm => {
            const barang = data.barang.find(b => b.id === bm.barang_id) || {};
            const user = data.users.find(u => u.id === bm.user_id) || { nama_lengkap: 'Staff' };
            const cat = data.categories.find(c => c.id === barang.category_id) || {};
            return {
                ...bm,
                kode_barang: barang.kode_barang || '-',
                nama_barang: barang.nama_barang || '-',
                satuan: barang.satuan || 'pcs',
                satuan_jual: barang.satuan_jual || null,
                gram_per_satuan_jual: barang.gram_per_satuan_jual || null,
                nama_kategori: cat.nama_kategori || '-',
                nama_lengkap: user.nama_lengkap
            };
        });

        if (filters.search) {
            const s = filters.search.toLowerCase();
            list = list.filter(bm => bm.nama_barang.toLowerCase().includes(s) || bm.kode_barang.toLowerCase().includes(s) || bm.kode_batch.toLowerCase().includes(s));
        }

        if (filters.tanggal_mulai) {
            list = list.filter(bm => bm.tanggal_masuk >= filters.tanggal_mulai);
        }

        if (filters.tanggal_selesai) {
            list = list.filter(bm => bm.tanggal_masuk <= filters.tanggal_selesai);
        }

        return list.sort((a, b) => new Date(b.tanggal_masuk) - new Date(a.tanggal_masuk));
    }

    function addBarangMasuk(entry) {
        const data = loadData();
        const barangId = parseInt(entry.barang_id);
        const jumlah = parseInt(entry.jumlah);
        const currentUser = getCurrentUser();
        const now = new Date();
        const pad = n => n.toString().padStart(2, '0');
        const dateStr = entry.tanggal_masuk || now.toISOString().slice(0, 10);
        const batchCode = `BATCH-${dateStr.replace(/-/g, '')}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}-${Math.floor(1000 + Math.random() * 9000)}`;

        const batchId = data.batches.length > 0 ? Math.max(...data.batches.map(bt => bt.id)) + 1 : 1;
        data.batches.push({
            id: batchId,
            barang_id: barangId,
            kode_batch: batchCode,
            tanggal_masuk: dateStr,
            jumlah_awal: jumlah,
            sisa_stok: jumlah
        });

        const entryId = data.barang_masuk.length > 0 ? Math.max(...data.barang_masuk.map(m => m.id)) + 1 : 1;
        data.barang_masuk.unshift({
            id: entryId,
            barang_id: barangId,
            batch_id: batchId,
            kode_batch: batchCode,
            jumlah: jumlah,
            tanggal_masuk: dateStr,
            user_id: currentUser ? currentUser.id : 2,
            keterangan: entry.keterangan || ''
        });

        // Update barang stock total
        const bIdx = data.barang.findIndex(b => b.id === barangId);
        if (bIdx >= 0) {
            data.barang[bIdx].stok_total += jumlah;
        }

        saveData(data);
        return { success: true, batchCode: batchCode };
    }

    function getActiveBatches() {
        const data = loadData();
        return data.batches
            .filter(b => b.sisa_stok > 0)
            .map(bt => {
                const b = data.barang.find(br => br.id === bt.barang_id) || {};
                return {
                    ...bt,
                    kode_barang: b.kode_barang,
                    nama_barang: b.nama_barang,
                    satuan: b.satuan,
                    satuan_jual: b.satuan_jual,
                    gram_per_satuan_jual: b.gram_per_satuan_jual
                };
            })
            .sort((a, b) => new Date(a.tanggal_masuk) - new Date(b.tanggal_masuk));
    }

    // POS & FIFO Sales
    function processSale(cart, bayar) {
        const data = loadData();
        const currentUser = getCurrentUser();
        const now = new Date();
        const pad = n => n.toString().padStart(2, '0');
        const dateStr = now.toISOString().slice(0, 10);
        const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        const trxCode = `TRX-${dateStr.replace(/-/g, '')}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

        let totalHarga = 0;
        const itemsDetail = [];

        cart.forEach(c => {
            const itemTotal = c.harga_jual * c.quantity;
            totalHarga += itemTotal;

            // FIFO deduction
            let qtyToDeduct = c.quantity;
            if (c.satuan_jual && c.gram_per_satuan_jual) {
                qtyToDeduct = c.quantity * c.gram_per_satuan_jual;
            }

            // Deduct total stock
            const bIdx = data.barang.findIndex(b => b.id === c.id);
            if (bIdx >= 0) {
                data.barang[bIdx].stok_total = Math.max(0, data.barang[bIdx].stok_total - qtyToDeduct);
            }

            // Deduct from batches using FIFO (oldest first)
            const availableBatches = data.batches
                .filter(bt => bt.barang_id === c.id && bt.sisa_stok > 0)
                .sort((a, b) => new Date(a.tanggal_masuk) - new Date(b.tanggal_masuk));

            let remaining = qtyToDeduct;
            for (let bt of availableBatches) {
                if (remaining <= 0) break;
                if (bt.sisa_stok >= remaining) {
                    bt.sisa_stok -= remaining;
                    remaining = 0;
                } else {
                    remaining -= bt.sisa_stok;
                    bt.sisa_stok = 0;
                }
            }

            itemsDetail.push({
                barang_id: c.id,
                kode_barang: c.kode_barang,
                nama_barang: c.nama_barang,
                satuan: c.satuan,
                satuan_jual: c.satuan_jual,
                jumlah: c.quantity,
                harga_satuan: c.harga_jual,
                subtotal: itemTotal
            });
        });

        const trxId = data.transaksi.length > 0 ? Math.max(...data.transaksi.map(t => t.id)) + 1 : 14;
        const kembalian = Math.max(0, bayar - totalHarga);

        const newTrx = {
            id: trxId,
            kode_transaksi: trxCode,
            user_id: currentUser ? currentUser.id : 1,
            nama_kasir: currentUser ? currentUser.nama_lengkap : 'Kasir Default',
            total_harga: totalHarga,
            bayar: bayar,
            kembalian: kembalian,
            tanggal_transaksi: `${dateStr} ${timeStr}`,
            items: itemsDetail
        };

        data.transaksi.unshift(newTrx);
        saveData(data);
        return { success: true, transaction: newTrx };
    }

    function getTransaksi(filters = {}) {
        const data = loadData();
        let list = data.transaksi.map(t => {
            const user = data.users.find(u => u.id === t.user_id) || { nama_lengkap: t.nama_kasir || 'Kasir' };
            const items = (t.items || []).map(it => {
                const b = data.barang.find(br => br.id === it.barang_id) || {};
                return {
                    ...it,
                    nama_barang: it.nama_barang || b.nama_barang || 'Item',
                    kode_barang: it.kode_barang || b.kode_barang || ''
                };
            });
            return {
                ...t,
                nama_lengkap: user.nama_lengkap,
                jumlah_item: items.length,
                items: items
            };
        });

        if (filters.tanggal_mulai) {
            list = list.filter(t => t.tanggal_transaksi.slice(0, 10) >= filters.tanggal_mulai);
        }
        if (filters.tanggal_selesai) {
            list = list.filter(t => t.tanggal_transaksi.slice(0, 10) <= filters.tanggal_selesai);
        }

        return list;
    }

    function getTransaksiById(id) {
        const list = getTransaksi();
        return list.find(t => t.id === parseInt(id));
    }

    // Users
    function getUsers(filters = {}) {
        const data = loadData();
        let list = [...data.users];
        if (filters.search) {
            const s = filters.search.toLowerCase();
            list = list.filter(u => u.username.toLowerCase().includes(s) || u.nama_lengkap.toLowerCase().includes(s));
        }
        if (filters.role) {
            list = list.filter(u => u.role === filters.role);
        }
        if (filters.status) {
            list = list.filter(u => u.status === filters.status);
        }
        return list;
    }

    function saveUser(u) {
        const data = loadData();
        if (u.id) {
            const idx = data.users.findIndex(item => item.id === parseInt(u.id));
            if (idx >= 0) {
                data.users[idx].nama_lengkap = u.nama_lengkap;
                data.users[idx].role = u.role;
                data.users[idx].status = u.status || 'aktif';
            }
        } else {
            const newId = data.users.length > 0 ? Math.max(...data.users.map(item => item.id)) + 1 : 1;
            data.users.push({
                id: newId,
                username: u.username.toLowerCase(),
                nama_lengkap: u.nama_lengkap,
                role: u.role,
                status: 'aktif'
            });
        }
        saveData(data);
        return true;
    }

    function toggleUserStatus(id) {
        const data = loadData();
        const u = data.users.find(item => item.id === parseInt(id));
        if (u) {
            u.status = u.status === 'aktif' ? 'nonaktif' : 'aktif';
            saveData(data);
            return u.status;
        }
        return null;
    }

    function deleteUser(id) {
        const data = loadData();
        data.users = data.users.filter(u => u.id !== parseInt(id));
        saveData(data);
        return true;
    }

    // Notifications for ROP
    function getNotifications() {
        const allBarang = getBarang();
        const critical = allBarang.filter(b => b.stok_total <= b.reorder_point);
        return critical.map(b => {
            const isHabis = b.stok_total === 0;
            return {
                id: b.id,
                kode_barang: b.kode_barang,
                nama_barang: b.nama_barang,
                stok_total: b.stok_total,
                reorder_point: b.reorder_point,
                satuan: b.satuan,
                satuan_asli: b.satuan,
                stok_formatted: formatStokDisplay(b.stok_total, b.satuan, b.satuan_jual, b.gram_per_satuan_jual),
                rop_formatted: formatStokDisplay(b.reorder_point, b.satuan, b.satuan_jual, b.gram_per_satuan_jual),
                status_stok: isHabis ? 'habis' : 'waspada',
                status_text: isHabis ? 'Stok Habis' : 'Stok Kritis (Kurang ROP)'
            };
        });
    }

    // Stats
    function getStats() {
        const allBarang = getBarang();
        const today = new Date().toISOString().slice(0, 10);
        const data = loadData();

        const totalJenis = allBarang.length;
        const totalStok = allBarang.reduce((acc, b) => acc + (b.stok_total || 0), 0);
        const waspada = allBarang.filter(b => b.status_stok === 'Waspada').length;
        const habis = allBarang.filter(b => b.status_stok === 'Habis').length;
        const aman = allBarang.filter(b => b.status_stok === 'Aman').length;

        const trxHariIni = data.transaksi.filter(t => t.tanggal_transaksi.startsWith(today));
        const pemasukanHariIni = trxHariIni.reduce((acc, t) => acc + (t.total_harga || 0), 0);
        const barangTerjualHariIni = trxHariIni.reduce((acc, t) => {
            return acc + (t.items ? t.items.reduce((sum, it) => sum + (it.jumlah || 0), 0) : 0);
        }, 0);

        return {
            totalJenis,
            totalStok,
            waspada,
            habis,
            aman,
            pemasukanHariIni,
            barangTerjualHariIni,
            totalUsers: data.users.length,
            totalKategori: data.categories.length
        };
    }

    function resetToDefault() {
        localStorage.removeItem(STORAGE_KEY);
        loadData();
    }

    return {
        loadData,
        getCurrentUser,
        setCurrentUser,
        login,
        logout,
        formatRupiah,
        formatStokDisplay,
        getStatusStok,
        calculateROP,
        getCategories,
        saveCategory,
        deleteCategory,
        getBarang,
        getBarangById,
        saveBarang,
        deleteBarang,
        getNextBarangCode,
        getBarangMasuk,
        addBarangMasuk,
        getActiveBatches,
        processSale,
        getTransaksi,
        getTransaksiById,
        getUsers,
        saveUser,
        toggleUserStatus,
        deleteUser,
        getNotifications,
        getStats,
        resetToDefault
    };
})();
