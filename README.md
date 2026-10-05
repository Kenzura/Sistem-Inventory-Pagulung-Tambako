# 🍃 Sistem Persediaan Gudang & POS - UMKM Pagulung Tambako Bone
### Versi Static Ready for GitHub Pages (Semua Tampilan & Fitur Interaktif)

Repositori ini adalah versi **Static Web App** dari sistem informasi persediaan gudang dan Point of Sale (POS) **UMKM Pagulung Tambako Bone**. Seluruh halaman telah dikonversi menjadi HTML, CSS, dan Vanilla JavaScript murni tanpa ketergantungan PHP/MySQL server, sehingga **100% siap di-hosting langsung di GitHub Pages secara gratis**.

---

## 🌟 Daftar Lengkap Seluruh Tampilan (Views)

| No | Nama Halaman | File | Deskripsi Tampilan |
|---|---|---|---|
| 1 | **Landing Page (Beranda)** | `index.html` / `landing.html` | Halaman publik UMKM: Hero section, katalog stok real-time, filter kategori, status waspada/habis, counter statistik |
| 2 | **Login Multi-Role** | `login.html` | Form login dengan tombol cepat 1-Click untuk berpindah peran (**Gudang**, **Kasir**, **Pimpinan**) |
| 3 | **Dashboard Gudang** | `dashboard-gudang.html` | Ringkasan stok waspada/habis, grafik pasokan masuk 7 hari, monitoring batch FIFO aktif, riwayat pasokan |
| 4 | **Data Barang** | `barang.html` | Tabel master barang dengan pencarian, filter kategori & status, modal detail spesifikasi ROP, tombol aksi |
| 5 | **Tambah Barang Baru** | `barang-tambah.html` | Form input barang baru, auto kode prefix kategori, dan kalkulator simulasi Reorder Point (ROP) |
| 6 | **Edit Barang** | `barang-edit.html` | Form pembaruan data produk, harga jual, demand harian, dan lama pengiriman |
| 7 | **Riwayat Barang Masuk** | `barang-masuk.html` | Log pasokan masuk dengan filter tanggal, pencarian, dan nomor batch FIFO |
| 8 | **Input Barang Masuk** | `barang-masuk-tambah.html` | Form penerimaan barang masuk dengan generator kode batch otomatis dan penambahan stok |
| 9 | **Manajemen Kategori** | `kategori.html` | Tabel kategori barang, modal tambah kategori, modal edit, dan counter jumlah barang |
| 10 | **Point of Sale (Kasir)** | `pos.html` | Kasir interaktif: pencarian produk, keranjang belanja (tambah/kurang/hapus), modal bayar & hitung kembalian, pemotongan stok FIFO otomatis |
| 11 | **Cetak Struk Transaksi** | `struk.html` | Format struk pembayaran thermal print yang rapi dengan rincian belanja, nominal bayar & kembalian |
| 12 | **Dashboard Kasir** | `dashboard-kasir.html` | Omset hari ini, jumlah item terjual, grafik tren pendapatan 7 hari, riwayat transaksi kasir |
| 13 | **Dashboard Pimpinan** | `dashboard-pimpinan.html` | Executive dashboard: KPI ringkasan, monitoring stok kritis di bawah ROP, omset harian, log transaksi |
| 14 | **Kelola Akun User** | `users.html` | Manajemen akun: list user, role badge, toggle status aktif/nonaktif, modal tambah & edit user |
| 15 | **Laporan & Rekapitulasi** | `laporan.html` | 4 tab laporan: Barang Masuk, Stok Barang, Transaksi Penjualan, & Laporan HPP FIFO, dengan simulasi cetak/export |
| 16 | **Halaman 403 Forbidden** | `403.html` | Halaman peringatan akses ditolak untuk hak akses terisolasi |

---

## 🚀 Fitur Unggulan Versi Static

1. **Floating Demo View Switcher (`demo-nav.js`)**:
   - Di setiap halaman terdapat widget mengambang di pojok kanan bawah yang memudahkan evaluator, dosen, atau penguji untuk langsung berpindah ke 16 halaman kapan saja tanpa harus login manual berulang kali.
   - Switch role instan: **Gudang**, **Kasir**, atau **Pimpinan**.
   - Tombol **Reset Data** untuk mengembalikan stok dan transaksi ke kondisi awal.

2. **Persistent LocalStorage Store (`store.js`)**:
   - Transaksi di POS kasir benar-benar **memotong stok barang** dan batch FIFO di browser.
   - Input barang masuk benar-benar **menambah stok barang** dan membuat batch baru.
   - Tambah/edit barang dan kategori tersimpan secara persisten di LocalStorage.

3. **Chart.js Visual**:
   - Grafik interaktif 7 hari terakhir pada Dashboard Gudang dan Kasir.

4. **Kalkulasi ROP & Safety Stock Otomatis**:
   - Rumus ROP: `(Demand × Lead Time) + Safety Stock (50% Demand)`
   - Notifikasi stok otomatis pada lonceng navbar jika stok `<= ROP`.


## 🔑 Akun Demo Default

Jika ingin melakukan simulasi login pada halaman `login.html`:

| Role | Username | Password |
|---|---|---|
| **Staff Gudang** | `gudang` | `gudang` *(atau password apa saja)* |
| **Kasir Default** | `kasir` | `kasir` *(atau password apa saja)* |
| **Pimpinan** | `pimpinan` | `pimpinan` *(atau password apa saja)* |

*(Atau cukup klik tombol 1-Click login cepat yang tersedia di form login)*

---

© 2026 Pagulung Tambako Bone Community. All rights reserved.
