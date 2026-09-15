# PROYEK: Landing Page "pagarnusaindo"

Landing page penjualan apparel (jersey, kaos, jaket, polo, kemeja, rompi) — brand "pagarnusaindo". Satu file statis, tanpa backend, pemesanan via link WhatsApp.

## INFORMASI DASAR

- **Lokasi**: `C:\Users\Lenovo\Documents\pagarnusaindo`
- **Teknologi**: 1 file `index.html` (CSS inline + JS inline, tanpa build). Server statis Node.js.
- **WA bisnis**: `+62 857-3629-1986`
- **Google Analytics (GA4)**: Measurement ID `G-ZJZKC90QFV` (snippet di `<head>` index.html, terpasang 11 Sep 2026)
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
| `background.jpg` | Background CTA band (asli `background.png` 1063KB → dikonversi JPG 176KB) |
| `galeri-kami-1..11.jpeg` | 11 foto galeri sosial (link ke IG) |
| `testimoni-1..3.jpeg` | 3 screenshot testimoni |
| `nama-produk-1/2/3.jpg` | Foto produk (jersey-1..3, jacket-coach-1..3, kemeja-workshirt-1..3, polo-shirt-spesial-hut-ri-81-1..3, t-shirt-trident-bearer-1..5, rompi-1..4) |

## STRUKTUR HALAMAN (urutan section di index.html)

1. `<header>` — hero slider **infinite scroll kanan→kiri seamless (7s/slide)**, kolase **2 gambar full-width `flex:1 cover`**, **klik background = pause/resume** (`.hero-toggle` ikon tengah)
2. "Tentang pagarnusaindo" — prolog + grid nilai (Berkualitas, Terjangkau, Original, Hubungan Baik)
3. `#preorder` "Promo Pre-Order" — countdown + grid produk pre-order
4. `#ready-stock` "Ready Stock" — grid produk + tombol "Lihat Semua Produk" (modal)
5. `#cara-order` — 4 langkah cara order
6. `#testimoni` — grid screenshot testimoni (hanya gambar, tanpa teks)
7. CTA band "Siap Tampil dengan Koleksi Kami?" — background.jpg + overlay hijau
8. `#galeri` "Galeri Kami" — 11 foto, klik → IG
9. Modal "Semua Produk Ready Stock" (`#all-products-modal` + `#all-products-grid`)
10. Footer 3 kolom — brand+sosmed, menu cepat, kontak & layanan
11. Tombol WA melayang kiri bawah (`.wa-float`, ditambahkan 11 Sep 2026 — sebelumnya di kode TIDAK ada padahal tercatat di doc)

## LOGIKA PENTING — PRE-ORDER OTOMATIS PINDAH KE READY STOCK **(JANGAN UBAH MANUAL)**

- Konstanta `PREORDER_END = '2026-09-19T23:59:59'` di bagian atas `<script>`.
- `isPreorderActive()` → true sebelum deadline.
- `getEffectiveProducts()` → salinan PRODUCTS; saat deadline lewat, produk `type:'preorder'` otomatis menjadi `type:'ready'` dan `price` = `priceOld` (harga normal, TANPA diskon).
- `renderPreorderSection()` → jika pre-order berakhir/kosong, tampilkan kartu pesan **"Nantikan Pre-Order & Promo selanjutnya, Stay tune..!!"** (class `.empty-preorder`) + tombol "Lihat Ready Stock", dan countdown disembunyikan.
- Semua render memakai produk "efektif": grid ready stock, modal semua produk, hero slider (jika pre-order habis → pakai foto ready stock).
- **Aturan tambah produk baru**: cukup isi array `PRODUCTS`; produk pre-order wajib punya `priceOld` (harga normal) + `priceNew` (harga promo). Jangan mengubah `type` produk lama secara manual — biarkan logika otomatis bekerja.

### DATA PRODUK SAAT INI (per 10 Sep 2026)

`type:'ready'` (5, harga dari kode 11 Sep 2026 — **perlu verifikasi akhir ke admin karena berbeda dengan doc lama**):
- Jersey 86 Oversize — Rp 145.000
- T-Shirt Trident Bearer — Rp 110.000
- Jacket Coach — Rp 175.000 (doc lama 150.000)
- Polo Shirt Spesial HUT RI 81 — Rp 125.000 (doc lama 135.000)
- Kemeja Workshirt — Rp 150.000 (doc lama 135.000)
- Catatan: produk **"Bundling (Jersey 86 Oversize + T-Shirt Trident Bearer) Rp 235.000"** tercatat di doc lama tapi TIDAK ada di array `PRODUCTS` — konfirmasi apakah masih dijual, jika ya tambahkan ke kode.

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

- **LIVE**: **https://www.pagarnusaindo.my.id** + apex `pagarnusaindo.my.id` keduanya resolve ke Vercel (11 Sep 2026 terverifikasi). Alias `pagarnusaindo.vercel.app` tetap aktif (tidak di-redirect — kanonik sudah di-set di HTML). Deploy ulang: `vercel.cmd deploy --prod --yes` dari folder proyek. **CATATAN: token Vercel sempat `Not authorized` 11 Sep → login ulang `vercel.cmd login --github` (device flow).** Repo GitHub `pagarnusaindo/pagarnusaindo` sinkron (branch `main`).
- **DOMAIN SELESAI (11 Sep 2026)**: DNS apex A `@`→76.76.21.21 (ter-query jadi 216.198.79.1 global anycast) + CNAME `www`→`cname.vercel-dns.com` sudah aktif; meta og/twitter & canonical sudah diganti ke `https://pagarnusaindo.my.id/`. Sisa: verifikasi preview share sesekali; jika buat aset og:image khusus 1200×630 (kolase produk) ganti `og:image` dari `logo.png`.
- **QA live page (10 Sep malam)**: title/meta description OK; nomor WA `6285736291986` benar (link dibangun runtime, bukan di HTML statis); template pesan WA OK; countdown `2026-09-19T23:59:59`; grid pre-order/ready/modal/"Stay tune" semuanya ada. **Temuan**: handle IG (@kaospagarnusaindo) berbeda dengan TikTok (@pagarnusaindo) → konfirmasi handle yang benar lalu samakan di halaman + doc.
- **Opsional**: tambahkan JSON-LD (data terstruktur toko/produk) untuk SEO; siapkan 3–5 aset iklan + caption (untuk Meta nanti); GitHub Pages bisa jadi cadangan (belum diaktifkan)
- Halaman dioptimasi seluler: video header 4.6MB SUDAH dihapus (diganti `background.png`, lalu hero slider foto produk). Per 11 Sep 2026 semua gambar dikompres/turun ukuran (total 5.1MB → 2.6MB); backup asli: `%TEMP%\opencode\pagarnusaindo_orig`.
- **Per 14 Sep 2026**: foto rompi & T-Shirt Trident Bearer diganti user (format PNG), lalu dikonversi & dikompres ke JPG 800px q72 (total 21MB → 0.7MB); backup PNG asli di `%TEMP%\opencode\pagarnusaindo_orig\14sep2026`. Referensi index.html sudah `.jpg`.
- Jika menambahkan testimoni: crop seragam `height:400px` (`.testimoni-img`, 320px di HP).
- Verifikasi cepat setelah edit: ekstrak `<script>` dari index.html → `node --check`. Server lokal: `jalankan_server.bat`.
- Git terinstall; akses `C:\Program Files\Git\cmd\git.exe` (PATH baru berlaku di sesi baru). Vercel CLI global via `npm.cmd`; npm.ps1 diblokir execution policy → selalu pakai `npm.cmd`/`vercel.cmd`.

## LOG SESI (append otomatis dari bawah)

- **10 Sep 2026** — Setup awal s.d fitur pre-order statis: struktur halaman, produk jadi, galeri 11 foto, testimoni 3 screenshot, logo/favicon, countdown, WA template, optimasi HP, server.js + bat. Pagi: logika otomatis pre-order→ready stock + pesan "Stay tune". Sore: dibuat AGENTS.md ini + aturan auto-save global.
- **10 Sep 2026** — Hosting ke GitHub: 26 file ber-spasi dirapikan jadi lowercase-hyphen (galeri-kami-*, jacket-coach-*, kemeja-workshirt-*, polo-shirt-spesial-hut-ri-81-*, t-shirt-trident-bearer-*, logo-icon-browser.png) + update semua referensi di index.html (37 aset valid). Git 2.55 diinstall via winget, repo lokal `main` di-init, commit `dc0ce68` (42 file) di-push ke `github.com/pagarnusaindo/pagarnusaindo`. Meta og/twitter placeholder `example.com` diganti URL GitHub Pages (commit `f283178`). BELUM: aktivasi GitHub Pages (menunggu di Settings user).
- **10 Sep 2026** — DEPLOY VERCEL SUKSES: **landing page LIVE di https://pagarnusaindo.vercel.app**. Pendekatan: install vercel CLI (`npm.cmd -g install vercel`; npm.ps1 diblokir), login GitHub via device flow (`vercel.cmd login --github`), deploy pertama gagal karena Vercel deteksi salah "Node" (Tanpa package.json, butuh entrypoint) → diperbaiki dengan `vercel.json` paksa static builder (`builds:[{src:'**',use:'@vercel/static'}]` + routes). Deploy kedua/ketiga sukses 13–15s. `.vercelignore` dibuat (eksklusi .git, server.js, bat, AGENTS.md, md). Meta og/twitter di-update ke domain vercel (commit `1db1299`). Next: domain kustom nanti. Opsional: GitHub Pages masih belum diaktifkan user.
- **10 Sep 2026 (malam)** — Domain & QA: user beli `pagarnusaindo.my.id` (Domainesia, status Aktif, NS nsx1/nsx2.domainesia.com); DNS global masih NXDOMAIN (delegasi PANDI belum aktif, normal ≤24 jam) → Vercel tampil merah "konfigurasi tidak valid" (wajar). Saran: tambah record A `@`→76.76.21.21 + CNAME `www`→cname.vercel-dns.com di DNS Zone Domainesia, tunggu propagasi, lalu ganti meta og ke domain baru + redeploy. QA halaman live vercel.app: semua OK (WA 6285736291986, template, countdown, grid). Temuan: handle IG (@kaospagarnusaindo) vs TikTok (@pagarnusaindo) belum seragam — konfirmasi user. Sesi ditutup: besok lanjut cek DNS → record → hijau → meta domain.
- **11 Sep 2026** — Analisa & perbaikan (item 1, 2, 4 rekomendasi): **(1) kanonik & meta domain** — tambah `<link rel="canonical">` + ganti og:url/og:image/twitter:image dari `vercel.app` → `https://pagarnusaindo.my.id/`; **(2) tombol WA melayang** `.wa-float` (kiri-bawah, teks disembunyikan di ≤640px jadi ikon bulat, `rel="noopener"`, otomatis terpasang `setupWaLinks()`); **(4) kompresi gambar** via System.Drawing: produk JPG resize→800 q72, galeri/testimoni resize→640 lebar q72, `background.png` 1.06MB → `background.jpg` 176KB (PNG dihapus), `logo.png` 187→132KB, `logo-icon-browser.png` 303→56KB; total 5.1MB→2.6MB (−49%). Verifikasi: DNS apex A + CNAME www resolve (domain live), deploy Vercel `Ready in 11s` (token sempat `Not authorized` → login ulang device flow), cek live URL canonical/meta/wa-float OK, semua gambar HTTP 200. Wait: `node --check` lolos. **BELUM/TO-DO**: (a) data produk tidak sinkron (Jacket 175K/Polo 125K/Kemeja 150K di kode vs doc; produk "Bundling 235K" tidak ada di kode) → verifikasi admin & samakan; (b) handle sosmed IG vs TikTok belum seragam; (c) size chart di halaman belum ada; (d) info ongkir/metode bayar/FAQ; (e) CTA hero masih statis ke `#preorder`; (f) og:image khusus 1200×630; (g) JSON-LD, sitemap/robots, Meta Pixel; (h) komit & push ke GitHub belum dilakukan.
- **11 Sep 2026** — **Google Analytics GA4 terpasang** (ID `G-ZJZKC90QFV`, snippet gtag di `<head>`: script async + inisialisasi). Deploy Vercel sukses 7s, verifikasi live `www.pagarnusaindo.my.id` → gtag js + config terdeteksi. Selanjutnya: cek **Realtime report** di GA (buka situs → lihat sinyal "Active users"); lanjut to-do (a)–(h) di atas.
- **11 Sep 2026** — **Event konversi klik WA terpasang di GA4**: fungsi `trackWaClick()` + event delegation di level `document` (mencakup semua `.wa-link` statis & dinamis tanpa dobel count) → `gtag('event','wa_click',{event_category:'WhatsApp',event_label:<nama produk atau 'Umum'>})`. Deploy 8s, terverifikasi live. **User harus tandai event ini sebagai konversi di GA**: Admin → Events → cari `wa_click` → toggle "Mark as key event". Catatan: untuk Google Ads nanti, pindahkan/link event ini ke akun Ads, dan belum ada tag konversi Google Ads terpisah.
- **11 Sep 2026** — **Verifikasi GA4 berhasil** setelah aktivasi `debug_mode:true` sementara + cek Realtime (cara tanpa DebugView). `debug_mode` sudah dimatikan & redeploy (16s). GA menerima data: Realtime menunjukkan user aktif + event `page_view`. Event `wa_click` akan mulai mencatat setelah user menandainya sebagai "key event" di GA. **Status GA4: aktif & berfungsi.**
- **15 Sep 2026** — **Update foto produk + kompresi**: user mengganti foto rompi (1–4) & T-Shirt Trident Bearer (1–4) dengan versi baru format PNG (total ±21MB, 14 Sep 2026). Dikonversi semua → JPG 800px q72 (total ±0.7MB, −97%), referensi `index.html` di-update `.png`→`.jpg`, PNG asli dihapus (backup: `%TEMP%\opencode\pagarnusaindo_orig\14sep2026`). `node --check` JS lolos. Proyek dibuka di VS Code (via `Code.exe` full path karena `code` tak ada di PATH). **BELUM**: commit+push ke GitHub & deploy Vercel (perubahan dari 11 Sep juga belum di-commit).
- **15 Sep 2026** — **Judul section + hero kolase + deploy**: (#1) judul `#preorder` diubah "Pre-Order & Promo Bundling" → **"Promo Pre-Order"** (HTML + footer link); (#2) hero slider diubah jadi **kolase persegi 1:1** (`.hero-slider` `width:80vmin;max-width:600px;aspect-ratio:1/1` + `.slide` flex) yang menampilkan **2 gambar per slide** (`.slide-img`), tetap auto-slide 3.5s — pasangan gambar = (k,k+1) wrap-around dari semua foto pre-order/ready; (#3) **commit `6864946`** 41 file + push GitHub; (#4) **deploy Vercel sukses `Ready in 12s`** (token sempat `Not authorized` → login ulang device flow) → live `www.pagarnusaindo.my.id` terverifikasi: judul baru, kolase slide-img, aspect-ratio 1/1, gambar rompi-4.jpg & t-shirt-trident-bearer-1.jpg HTTP 200. **Catatan**: URL deployment-preview Vercel menampilkan "Login - Vercel" (Deployment Protection aktif), tapi domain produksi normal & terbuka.
- **15 Sep 2026** — **Revisi ukuran hero kolase**: `.hero-slider` dikembalikan ke ukuran penuh header (`width:100%;height:100%`, aturan `80vmin/1:1` + mobile `72vmin` dihapus), **tetap kolase 2 gambar per slide** (`.slide` flex + `.slide-img`) auto-slide. Rekomendasi user: ukuran background seperti semula, tapi 2 gambar sekaligus. `node --check` JS lolos.
- **15 Sep 2026** — **Hero slider → infinite scroll**: transisi fade diganti **horizontal infinite scroll kanan→kiri seamless** — wrapper `.hero-track` (`display:flex;will-change:transform`) berisi slide diduplikasi, animasi `@keyframes heroScroll` `translateX(0)→translateX(-50%)` dengan durasi `slideCount*3.5s` linear infinite. HTML hero: `.hero-slider > .hero-track > .slide*2N`. `node --check` lolos, commit `4665017` + push, deploy Vercel `Ready in 6s`, live `www.pagarnusaindo.my.id` terverifikasi: `heroScroll`, `hero-track`, `max-content`, `slide-img` semua ada di HTML.
- **15 Sep 2026** — **Gambar hero utuh 1:1**: `.slide-img` diubah dari `flex:1 + background-size:cover` (gambar terpotong) → kotak **1:1** (`width:36vmin;max-width:40vw;aspect-ratio:1/1`) + `background-size:contain` + `background-position:center` + `background-repeat:no-repeat`, `.slide` pakai `align-items:center;justify-content:center;gap:3vw` — gambar tampil utuh tanpa potongan. Commit `34b1e02` + push, deploy `Ready in 10s`, live terverifikasi (`background-size: contain`, `aspect-ratio: 1 / 1`, `align-items: center`).
- **15 Sep 2026** — **Hero kembali full-width + HP seragam desktop**: user minta tampilan "seperti sebelumnya" tapi di HP disamakan dengan desktop. `.slide-img` dikembalikan ke `flex:1 + background-size:cover` (kolase 2 gambar memenuhi seluruh header), aturan 1:1/contain dihapus; `.hero-track .slide` kembali `display:flex`. Di `@media (max-width:640px)` header diubah `min-height:auto`→`min-height:420px` agar sama dengan desktop. Commit `28f652f` + push, deploy `Ready in 6s`, live terverifikasi (`background-size: cover`, `flex: 1`, `min-height: 420px`).
- **15 Sep 2026** — **Fix gambar hero tertimpa di HP**: kembali `cover` (flex:1) membuat 2 gambar persegi terpotong/tertimpa pada layar sempit. Diterapkan gambar **utuh 1:1** di semua ukuran layar: `.slide-img` `flex:0 0 auto; width:40vmin; max-width:44vw; aspect-ratio:1/1` + `background-size:contain` + `background-repeat:no-repeat`, `.slide` `align-items:center; justify-content:center; gap:3vw` — anti tertimpa & konsisten HP=desktop. Commit `a8c14b7` + push, deploy `Ready in 6s`, live terverifikasi (`contain`, `aspect-ratio`, `gap: 3vw`).
- **15 Sep 2026** — **Hero final: full-width cover + slide lambat**: user minta "seperti sebelumnya saja" tapi diperlambat. `.slide-img` kembali ke `flex:1 + background-size:cover` (kolase 2 gambar memenuhi header sepenuhnya), durasi animasi `heroScroll` dari `slideCount*3.5` → **`slideCount*7`** (2× lebih lambat). Commit `0c27d89` + push, deploy `Ready in 6s`, live terverifikasi (`cover`, `flex: 1`, durasi `* 7`).
- **15 Sep 2026** — **Fitur pause/resume hero slider**: klik pada foto background → slide **pause** (ikona tengah berubah ▶, `animationPlayState=paused`), klik lagi → **jalan lagi** (▶→⏸). Implementasi: `.hero-slider` diberi `cursor:pointer` + `z-index:1` (agar klik tidak tertutup overlay `header::after`), elemen indikator `.hero-toggle` (lingkaran ikon tengah, `pointer-events:none`, hilang 900ms setelah klik), listener klik toggle `paused`. Commit `eb3a73a` + push, deploy `Ready in 5s`, live terverifikasi (`hero-toggle`, `animationPlayState`, `cursor: pointer`).

<!-- Entri baru ditambahkan paling bawah, dengan format:
- **Tanggal** — Ringkasan: apa yang dikerjakan, file yang diubah, hasil/pengujian, dan apa yang belum selesai (to-do sesi berikutnya). -->