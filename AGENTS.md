# PROYEK: Landing Page "pagarnusaindo"

Landing page penjualan apparel (jersey, kaos, jaket, polo, kemeja, rompi) — brand "pagarnusaindo". Satu file statis, tanpa backend, pemesanan via link WhatsApp.

## INFORMASI DASAR

- **Lokasi**: `C:\Users\Lenovo\Documents\pagarnusaindo`
- **Teknologi**: 1 file `index.html` (CSS inline + JS inline, tanpa build). Server statis Node.js.
- **WA bisnis**: `+62 857-3629-1986`
- **Sosmed (di halaman)**: IG `@kaospagarnusaindo` (13 ref) & TikTok `@pagarnusaindo` (2 ref) — **tidak seragam, perlu konfirmasi handle mana yang benar**
- **Menjalankan lokal**: klik `jalankan_server.bat` (menjalankan `node server.js`, port 8000) — IP Wi-Fi ditampilkan di panel .bat, buka di HP via IP itu, atau `node server.js` lalu `http://localhost:8000`
- **Catatan mesin**: Python TIDAK terpasang; Node v24 TERSEDIA. OS Windows.

## FILE PENTING

| File | Fungsi |
|---|---|
| `index.html` | Satu-satunya sumber halaman (semua CSS/JS di dalamnya) |
| `server.js` | Static server Node (MIME types, port 8000, host 0.0.0.0) |
| `jalankan_server.bat` | Shortcut: jalankan server + tampilkan IP |
| `logo.png` | Logo brand di header |
| `logo-icon-browser.png` | Favicon + apple-touch-icon |
| `background.png` | Background header & CTA band (gradien hijau overlay) |
| `galeri-kami-1..11.jpeg` | 11 foto galeri sosial (link ke IG) |
| `testimoni-1..3.jpeg` | 3 screenshot testimoni |
| `nama-produk-1/2/3.jpg` | Foto produk (jersey-1..3, jacket-coach-1..3, kemeja-workshirt-1..3, polo-shirt-spesial-hut-ri-81-1..3, t-shirt-trident-bearer-1..5, rompi-1..3) |

## STRUKTUR HALAMAN (urutan section di index.html)

1. `<header>` — hero slider otomatis (foto produk), tombol "Lihat Koleksi" → `#preorder`
2. "Tentang pagarnusaindo" — prolog + grid nilai (Berkualitas, Terjangkau, Original, Hubungan Baik)
3. `#preorder` "Pre-Order & Promo Bundling" — countdown + grid produk pre-order
4. `#ready-stock` "Ready Stock" — grid produk + tombol "Lihat Semua Produk" (modal)
5. `#cara-order` — 4 langkah cara order
6. `#testimoni` — grid screenshot testimoni (hanya gambar, tanpa teks)
7. CTA band "Siap Tampil dengan Koleksi Kami?" — background.png + overlay hijau
8. `#galeri` "Galeri Kami" — 11 foto, klik → IG
9. Modal "Semua Produk Ready Stock" (`#all-products-modal` + `#all-products-grid`)
10. Footer 3 kolom — brand+sosmed, menu cepat, kontak & layanan
11. Tombol WA melayang kiri bawah

## LOGIKA PENTING — PRE-ORDER OTOMATIS PINDAH KE READY STOCK **(JANGAN UBAH MANUAL)**

- Konstanta `PREORDER_END = '2026-09-19T23:59:59'` di bagian atas `<script>`.
- `isPreorderActive()` → true sebelum deadline.
- `getEffectiveProducts()` → salinan PRODUCTS; saat deadline lewat, produk `type:'preorder'` otomatis menjadi `type:'ready'` dan `price` = `priceOld` (harga normal, TANPA diskon).
- `renderPreorderSection()` → jika pre-order berakhir/kosong, tampilkan kartu pesan **"Nantikan Pre-Order & Promo selanjutnya, Stay tune..!!"** (class `.empty-preorder`) + tombol "Lihat Ready Stock", dan countdown disembunyikan.
- Semua render memakai produk "efektif": grid ready stock, modal semua produk, hero slider (jika pre-order habis → pakai foto ready stock).
- **Aturan tambah produk baru**: cukup isi array `PRODUCTS`; produk pre-order wajib punya `priceOld` (harga normal) + `priceNew` (harga promo). Jangan mengubah `type` produk lama secara manual — biarkan logika otomatis bekerja.

### DATA PRODUK SAAT INI (per 10 Sep 2026)

`type:'ready'` (6):
- Jersey 86 Oversize — Rp 145.000
- Bundling (Jersey 86 Oversize + T-Shirt Trident Bearer) — Rp 235.000
- T-Shirt Trident Bearer — Rp 110.000
- Jacket Coach — Rp 150.000
- Polo Shirt Spesial HUT RI 81 — Rp 135.000
- Kemeja Workshirt — Rp 135.000

`type:'preorder'` (1, aktif s.d 19 Sep 2026):
- Rompi — ~~Rp 155.000~~ **Rp 145.000** (priceOld 155.000, priceNew 145.000)

## TEMPLATE PESAN WA (otomatis di link pemesanan)

```
Saya ingin memesan '<nama produk>',
Nama Penerima:
Alamat Tujuan:
Ket;
(ukuran) (warna) (panjang/pendek)
No.Telp/WA Penerima;
```

Dibuat oleh `buildWaMessage(productName)`, dipasang `setupWaLinks()` ke semua tautan `.wa-link`.

## KONVENSI EDIT

- **Tanpa komentar kode tambahan** kecuali diperlukan (gaya file: komentar Indonesian singkat untuk blok penting).
- Harga = string `'Rp 145.000'`. Ejaan brand = `pagarnusaindo` (huruf kecil, tanpa spasi).
- Style: font Poppins (judul) + Inter (teks) via Google Fonts; body `overflow-x:hidden`; mobile-first di 640px & 400px.
- Simpan sebelum keluar sesi (lihat aturan global AGENTS.md).

## YANG BELUM DIKERJAKAN / CATATAN

- **LIVE**: landing page online di **https://pagarnusaindo.vercel.app** (Vercel prod, static builder via `vercel.json` builds, alias otomatis). Tetap bisa dipakai sambil menunggu domain. Deploy ulang: `vercel.cmd deploy --prod --yes` dari folder proyek (login tersimpan). Repo GitHub `pagarnusaindo/pagarnusaindo` sinkron (branch `main`).
- **DOMAIN DALAM PROSES (prioritas next sesi)**: `pagarnusaindo.my.id` dibeli malam 10 Sep di **Domainesia**, status "Aktif", NS `nsx1.domainesia.com` & `nsx2.domainesia.com`. DNS global masih **NXDOMAIN** (delegasi PANDI belum aktif; normal 1–24 jam sejak pembelian). Vercel masih menampilkan **"konfigurasi tidak valid"** (wajar selama DNS belum resolve). Setelah domain resolve:
  1. Di **DNS Zone Domainesia** tambah record: A `@` → `76.76.21.21`; CNAME `www` → `cname.vercel-dns.com`.
  2. Di Vercel (Dashboard → proyek → Settings → Domains): domain `pagarnusaindo.my.id` + `www` sudah ditambahkan user; harap akan berubah hijau otomatis (atau klik Refresh).
  3. Ganti meta og/twitter di `index.html` dari `https://pagarnusaindo.vercel.app/...` → `https://pagarnusaindo.my.id/...` → redeploy + verifikasi preview share (og:image = `https://pagarnusaindo.my.id/logo.png`).
  - Jika masih NXDOMAIN >24 jam → hubungi support Domainesia.
- **QA live page (10 Sep malam)**: title/meta description OK; nomor WA `6285736291986` benar (link dibangun runtime, bukan di HTML statis); template pesan WA OK; countdown `2026-09-19T23:59:59`; grid pre-order/ready/modal/"Stay tune" semuanya ada. **Temuan**: handle IG (@kaospagarnusaindo) berbeda dengan TikTok (@pagarnusaindo) → konfirmasi handle yang benar lalu samakan di halaman + doc.
- **Opsional**: tambahkan JSON-LD (data terstruktur toko/produk) untuk SEO; siapkan 3–5 aset iklan + caption (untuk Meta nanti); GitHub Pages bisa jadi cadangan (belum diaktifkan)
- Halaman dioptimasi seluler: video header 4.6MB SUDAH dihapus (diganti `background.png`, lalu hero slider foto produk).
- Jika menambahkan testimoni: crop seragam `height:400px` (`.testimoni-img`, 320px di HP).
- Verifikasi cepat setelah edit: ekstrak `<script>` dari index.html → `node --check`. Server lokal: `jalankan_server.bat`.
- Git terinstall; akses `C:\Program Files\Git\cmd\git.exe` (PATH baru berlaku di sesi baru). Vercel CLI global via `npm.cmd`; npm.ps1 diblokir execution policy → selalu pakai `npm.cmd`/`vercel.cmd`.

## LOG SESI (append otomatis dari bawah)

- **10 Sep 2026** — Setup awal s.d fitur pre-order statis: struktur halaman, produk jadi, galeri 11 foto, testimoni 3 screenshot, logo/favicon, countdown, WA template, optimasi HP, server.js + bat. Pagi: logika otomatis pre-order→ready stock + pesan "Stay tune". Sore: dibuat AGENTS.md ini + aturan auto-save global.
- **10 Sep 2026** — Hosting ke GitHub: 26 file ber-spasi dirapikan jadi lowercase-hyphen (galeri-kami-*, jacket-coach-*, kemeja-workshirt-*, polo-shirt-spesial-hut-ri-81-*, t-shirt-trident-bearer-*, logo-icon-browser.png) + update semua referensi di index.html (37 aset valid). Git 2.55 diinstall via winget, repo lokal `main` di-init, commit `dc0ce68` (42 file) di-push ke `github.com/pagarnusaindo/pagarnusaindo`. Meta og/twitter placeholder `example.com` diganti URL GitHub Pages (commit `f283178`). BELUM: aktivasi GitHub Pages (menunggu di Settings user).
- **10 Sep 2026** — DEPLOY VERCEL SUKSES: **landing page LIVE di https://pagarnusaindo.vercel.app**. Pendekatan: install vercel CLI (`npm.cmd -g install vercel`; npm.ps1 diblokir), login GitHub via device flow (`vercel.cmd login --github`), deploy pertama gagal karena Vercel deteksi salah "Node" (Tanpa package.json, butuh entrypoint) → diperbaiki dengan `vercel.json` paksa static builder (`builds:[{src:'**',use:'@vercel/static'}]` + routes). Deploy kedua/ketiga sukses 13–15s. `.vercelignore` dibuat (eksklusi .git, server.js, bat, AGENTS.md, md). Meta og/twitter di-update ke domain vercel (commit `1db1299`). Next: domain kustom nanti. Opsional: GitHub Pages masih belum diaktifkan user.
- **10 Sep 2026 (malam)** — Domain & QA: user beli `pagarnusaindo.my.id` (Domainesia, status Aktif, NS nsx1/nsx2.domainesia.com); DNS global masih NXDOMAIN (delegasi PANDI belum aktif, normal ≤24 jam) → Vercel tampil merah "konfigurasi tidak valid" (wajar). Saran: tambah record A `@`→76.76.21.21 + CNAME `www`→cname.vercel-dns.com di DNS Zone Domainesia, tunggu propagasi, lalu ganti meta og ke domain baru + redeploy. QA halaman live vercel.app: semua OK (WA 6285736291986, template, countdown, grid). Temuan: handle IG (@kaospagarnusaindo) vs TikTok (@pagarnusaindo) belum seragam — konfirmasi user. Sesi ditutup: besok lanjut cek DNS → record → hijau → meta domain.

<!-- Entri baru ditambahkan paling bawah, dengan format:
- **Tanggal** — Ringkasan: apa yang dikerjakan, file yang diubah, hasil/pengujian, dan apa yang belum selesai (to-do sesi berikutnya). -->