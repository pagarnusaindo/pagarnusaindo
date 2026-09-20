# PROYEK: Landing Page "pagarnusaindo"

Landing page penjualan apparel (jersey, kaos, jaket, polo, kemeja, rompi) — brand "pagarnusaindo". Satu file statis, tanpa backend, pemesanan via link WhatsApp.

## INFORMASI DASAR

- **Lokasi**: `C:\Users\Lenovo\Documents\pagarnusaindo`
- **Teknologi**: 1 file `index.html` (CSS inline + JS inline, tanpa build). Server statis Node.js.
- **WA bisnis**: `+62 857-3629-1986`
- **Google Analytics (GA4)**: Measurement ID `G-ZJZKC90QFV` (snippet di `<head>` index.html, terpasang 11 Sep 2026)
- **Sosmed (di halaman)**: IG `@kaospagarnusaindo` (13 ref) & TikTok `@pagarnusaindo` (2 ref) — **tidak seragam, perlu konfirmasi handle mana yang benar**
- **Menjalankan lokal**: klik `jalankan_server.bat` (menjalankan `node server.js`, port 8000) — IP Wi-Fi ditampilkan di panel .bat, buka di HP via IP itu, atau `node server.js` lalu `http://localhost:8000`
- **Catatan mesin**: Python TIDAK terpasang; Node v24 TERSEDIA. OS Windows. VS Code: perintah `code` kini GLOBAL di PATH user (BUKA folder proyek via `code .` dari sesi bash baru) + launcher 1-klik `buka_vscode.bat` di folder proyek. Jika `code` belum dikenal di sesi aktif, pakai `C:\Users\Lenovo\AppData\Local\Programs\Microsoft VS Code\Code.exe`.

## FILE PENTING

| File | Fungsi |
|---|---|
| `index.html` | Satu-satunya sumber halaman (semua CSS/JS di dalamnya) |
| `server.js` | Static server Node (MIME types, port 8000, host 0.0.0.0) |
| `jalankan_server.bat` | Shortcut: jalankan server + tampilkan IP |
| `buka_vscode.bat` | Shortcut: buka proyek ini di VS Code (16 Sep 2026) |
| `logo.png` | Logo brand di header |
| `og-image.jpg` | og:image twitter:image 1200×630 kolase produk (15 Sep 2026) |
| `banner-header.jpg` | ~~Banner poster gradasi hijau→kuning + 6 produk~~ **TIDAK DIPAKAI** — header kini transparan, gradient body menyatu. File masih ada di repo tapi tak direferensikan. |
| `logo-icon-browser.png` | Favicon + apple-touch-icon |
| `background.jpg` | Background CTA band (asli `background.png` 1063KB → dikonversi JPG 176KB) |
| `galeri-kami-1..11.jpeg` | 11 foto galeri sosial (link ke IG) |
| `testimoni-1..3.jpeg` | 3 screenshot testimoni |
| `nama-produk-1/2/3.jpg` | Foto produk (jersey-1..3, jacket-coach-1..3, kemeja-workshirt-1..3, polo-shirt-spesial-hut-ri-81-1..3, t-shirt-trident-bearer-1..5, rompi-1..4) |

## STRUKTUR HALAMAN (urutan section di index.html)

1. `<header>` — hero slider **infinite scroll kanan→kiri seamless (7s/slide)**, kolase **2 gambar full-width `flex:1 cover`**, **klik background = pause/resume** (`.hero-toggle` ikon tengah)
2. "Tentang pagarnusaindo" — prolog + grid nilai (Berkualitas, Terjangkau, Original, Hubungan Baik)
3. `#preorder` "Promo Pre-Order" — countdown + grid produk pre-order; **produk pre-order tampil 2 gambar sejajar (`.pre-img-grid`, grid 2 kolom) + 1 tombol "Pre-Order Sekarang" di bawahnya** (mulai 17 Sep 2026); **klik gambar → lightbox perbesar** dengan panah antar foto produk (mulai 20 Sep 2026)
4. `#ready-stock` "Ready Stock" — grid produk + tombol "Lihat Semua Produk" (modal)
5. `#cara-order` — 4 langkah cara order
6. `#testimoni` — grid screenshot testimoni (hanya gambar, tanpa teks)
7. CTA band "Siap Tampil dengan Koleksi Kami?" — background.jpg + overlay hijau
8. `#galeri` "Galeri Kami" — 11 foto, klik → IG
9. Modal "Semua Produk Ready Stock" (`#all-products-modal` + `#all-products-grid`)
10. Footer 3 kolom — brand+sosmed, menu cepat, kontak & layanan
11. Tombol WA melayang kiri bawah (`.wa-float`, ditambahkan 11 Sep 2026 — sebelumnya di kode TIDAK ada padahal tercatat di doc)

## LOGIKA PENTING — PRE-ORDER OTOMATIS PINDAH KE READY STOCK **(JANGAN UBAH MANUAL)**

- Konstanta `PREORDER_START = '2026-09-25T00:00:00'` & `PREORDER_END = '2026-10-04T23:59:59'` di bagian atas `<script>` (periode 17 Sep 2026 diubah dari 14–19 Sep).
- `isPreorderActive()` → true sebelum deadline (END). Countdown pintar: sebelum START tampil "Pre-Order Dimulai Dalam", sesudahnya "Sisa Waktu Pre-Order Berakhir".
- `getEffectiveProducts()` → salinan PRODUCTS; saat deadline lewat, produk `type:'preorder'` otomatis menjadi `type:'ready'` dan `price` = `priceOld` (harga normal, TANPA diskon).
- `renderPreorderSection()` → jika pre-order berakhir/kosong, tampilkan kartu pesan **"Nantikan Pre-Order & Promo selanjutnya, Stay tune..!!"** (class `.empty-preorder`) + tombol "Lihat Ready Stock", dan countdown disembunyikan.
- Semua render memakai produk "efektif": grid ready stock, modal semua produk, hero slider (jika pre-order habis → pakai foto ready stock).
- **Aturan tambah produk baru**: cukup isi array `PRODUCTS`; produk pre-order wajib punya `priceOld` (harga normal) + `priceNew` (harga promo). Jangan mengubah `type` produk lama secara manual — biarkan logika otomatis bekerja.

### DATA PRODUK SAAT INI (per 10 Sep 2026)

`type:'ready'` (5, harga dari kode 11 Sep 2026 — **perlu verifikasi akhir ke admin karena berbeda dengan doc lama**):
- Jersey 86 Oversize — Rp 145.000
- The Weapon — Rp 110.000 (BARU 16 Sep 2026)
- T-Shirt Trident Bearer — Rp 110.000
- Jacket Coach — Rp 175.000 (doc lama 150.000)
- Polo Shirt Spesial HUT RI 81 — Rp 125.000 (doc lama 135.000)
- Kemeja Workshirt — Rp 150.000 (doc lama 135.000)
- Catatan: produk **"Bundling (Jersey 86 Oversize + T-Shirt Trident Bearer) Rp 235.000"** tercatat di doc lama tapi TIDAK ada di array `PRODUCTS` — konfirmasi apakah masih dijual, jika ya tambahkan ke kode.

`type:'preorder'` (1, aktif 25 Sep – 4 Okt 2026):
- **Vest/Rompi Casual** (sebelumnya "Rompi") — ~~Rp 155.000~~ **Rp 145.000** (priceOld 155.000, priceNew 145.000)

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
- **DOMAIN SELESAI (11 Sep 2026)**: DNS apex A `@`→76.76.21.21 + CNAME `www`→cname.vercel-dns.com aktif; meta og/twitter & canonical sudah `https://pagarnusaindo.my.id/`. og:image 1200×630 kolase produk (`og-image.jpg`) SELESAI (15 Sep 2026).
- **QA live page (10 Sep malam)**: title/meta description OK; nomor WA `6285736291986` benar (link dibangun runtime, bukan di HTML statis); template pesan WA OK; countdown `2026-09-19T23:59:59`; grid pre-order/ready/modal/"Stay tune" semuanya ada. **Temuan**: handle IG (@kaospagarnusaindo) berbeda dengan TikTok (@pagarnusaindo) → konfirmasi handle yang benar lalu samakan di halaman + doc.
- **Opsional**: tambahkan JSON-LD (data terstruktur toko/produk) untuk SEO; siapkan 3–5 aset iklan + caption (untuk Meta nanti); GitHub Pages bisa jadi cadangan (belum diaktifkan)
- Halaman dioptimasi seluler: header kini pakai **banner poster statis** `banner-header.jpg` (1920×480, gradasi hijau→kuning + 6 produk). Gambar lain dikompres total 5.1MB→2.6MB; backup: `%TEMP%\opencode\pagarnusaindo_orig`.
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
- **15 Sep 2026** — **og:image khusus 1200×630 (kolase produk)**: dibuat `og-image.jpg` via System.Drawing (`og-image.jpg: 1200x630, 95 KB`, grid 3×2: Jersey 86 Oversize, T-Shirt Trident, Jacket Coach, Polo HUT RI 81, Kemeja Workshirt, Rompi + header brand & caption). `og:image`/`twitter:image` di-index.html diganti dari `logo.png` → `og-image.jpg`, tambah `og:image:width/height` 1200×630 + `og:image:alt`. Commit `4b35164` + push, deploy `Ready in 16s` (token sempat `Not authorized` → login ulang), live terverifikasi: og:image & twitter:image menunjuk og-image.jpg, file HTTP 200 (95 KB). **CATATAN**: user belum bisa preview gambar sendiri (model tidak dukung input gambar) → sarankan cek manual di og.gg/share preview.
- **16 Sep 2026** — **Produk baru + update gambar & kompresi (auto-sync)**: user menambah produk **"The Weapon"** (`type:'ready'`, Rp 110.000) di array `PRODUCTS` namun awalnya masih mengarah ke gambar Jersey — diperbaiki ke `the-weapon-1..5.jpg`. Foto **Jacket Coach** diganti (PNG 1–2, total ±4.6MB) + ditambah 4–5; foto **Kemeja Workshirt** diganti+ditambah (PNG 1–4, total ±8.3MB). Semua 11 PNG (±26MB) dikompres → **JPG 800px q72 white-background** (total ±0.9MB, −97%); PNG asli dibackup `%TEMP%\opencode\pagarnusaindo_orig\16sep2026` lalu dihapus. Array PRODUCTS diperbarui: The Weapon 5 gambar, Jacket Coach 5 gambar, Kemeja 4 gambar. Verifikasi: node --check JS OK, semua file gambar ada. Commit `473516c` + push; deploy Vercel `Ready in 9s` (token sempat `Not authorized` → login ulang device flow); live terverifikasi: nama The Weapon + semua gambar HTTP 200, tanpa referensi .png. Dokumen produk di AGENTS.md ditambah The Weapon.
- **16 Sep 2026** — **Koneksi permanen opencode ↔ VS Code**: `code` didaftarkan ke PATH user (`C:\Users\Lenovo\AppData\Local\Programs\Microsoft VS Code\bin`) — aktif di sesi baru, tinggal `code .` dari folder proyek. Tambah `buka_vscode.bat` (1-klik, buka proyek di VS Code via Code.exe). AGENTS.md diperbarui (Catatan mesin + file tabel). Commit `8a375ae` + push.
- **16 Sep 2026** — **Auto-deploy Vercel via Git DIBATALKAN (tetap manual 2 langkah)**: `vercel git connect` berkali-kali gagal ("Failed to connect... make sure you have access") meskipun repo public & sudah relogin Vercel (`kaospagarnusaindo-6591`), diduga GitHub App Vercel belum terpasang/dipakai akun GitHub `pagarnusaindo` (pemilik repo). User memilih TIDAK lanjut otomatisasi, tetap alur manual memakai GANDA langkah: (1) commit+push GitHub, (2) `vercel.cmd deploy --prod --yes`. Jangan ulangi coba connect Git di sesi berikut.
- **16 Sep 2026** — **Header: banner poster produk menggantikan hero slider**. Dibuat `banner-header.jpg` (1920×480, 23 KB) via System.Drawing: gradasi hijau→kuning vertikal (tema situs `#1f4a2d`→`#DAB139`) + glow + band bawah hijau gelap (tanpa produk). Di header: hero slider & `<h1>` dihapus total; ditambah **carousel produk HTML/JS** (3 kartu terlihat di desktop, 2 tablet, 1 mobile) dengan panah kiri/kanan (`carouselMove()`), kartu putih-bingkai emas `border:3px solid rgba(245,214,71,0.55)`, responsive `calc((100%-32px)/3)`. Logo diperbesar 120→175px, header min-height 580px (480px mobile). Verifikasi JS OK, carousel-track/arrow/carouselMove ada, banner HTTP 200. Commit `5a149ff` + push, deploy `Ready in 7s`.
- **16 Sep 2026** — **Logo diperkecil + header transparan gradient menyatu body**: logo 175→130px, header `background: transparent` (gradient body menembus tanpa gambar statis), `banner-header.jpg` tidak dipakai lagi. Commit `4b24955`.
- **16 Sep 2026** — **Navbar navigasi fixed di atas**: logo kecil `nav-logo` 32px + teks "PAGARNUSAINDO" kuning emas + tautan Promo/Ready Stock/Cara Order/Galeri + "Kontak & Layanan" (hijau WA). Di mobile (≤640px): hamburger toggle, dropdown vertikal. Logo besar `header .logo` dihapus total. Header min-height 420px (desktop) / 400px (mobile), padding-top ditambah 5.5rem (desktop) / 4.5rem (mobile) untuk fixed nav. JS toggle + auto-close saat klik link. Commit `fd0a809` + push, deploy `Ready in 5s`.
- **16 Sep 2026** — **Analisa kelayakan iklan (skor 6.5/10) + 2 perbaikan siap-iklan**: diberi kritik objektif (blocker: key event GA4 & link Google Ads belum selesai, belum ada Meta Pixel, tidak ada H1/value proposition, kartu carousel tak bisa diklik, handle IG/TikTok belum seragam, mismatch kampanye vs PREORDER_END). User pilih 2 perbaikan: **(1) Tombol "Pesan" di kartu carousel header** — `.carousel-btn` hijau WA di tiap kartu (flex-column card), `setupWaLinks()` dipanggil ulang di `buildCarousel()`; **(2) Pelacakan sumber iklan (UTM/gclid)** — `AD_SOURCE` dibaca dari `location.search` (utm_campaign/source/medium/gclid) + helper `withAdSource()` menambahkan baris `[Sumber Iklan: ...]` ke semua pesan WA (via `setupWaLinks` & `buildWaMessage`, anti-dobel dengan guard string), + param `campaign` ikut event GA4 `wa_click`. Verifikasi JS OK, live deploy `Ready in 6s` (test dengan URL `?utm_campaign=testads&utm_source=instagram` OK). Commit `8c634c2` + push. **BELUM dikerjakan (opsional, user belum pilih)**: H1+headline header, info ongkir/metode bayar + size chart di halaman, seragam penulisan brand & handle sosmed, JSON-LD, Meta Pixel.
- **16 Sep 2026** — **H1 + headline value proposition di header (saran #3)**: ditambah `<h1 class="header-title">` **"Kaos, Jersey &amp; Jaket Lokal Berkualitas"** (font Poppins 800, `clamp(1.5rem,4.5vw,2.5rem)`, putih + text-shadow, z-index 1 di atas overlay) tepat di atas carousel — satu-satunya H1 di halaman (SEO & relevansi iklan). Subtitle lama diganti "Gaya kasual modern untuk aktivitas sehari-hari — pesan mudah via WhatsApp". Verifikasi: JS OK, jumlah H1=1, live deploy `Ready in 6s` terverifikasi. Commit `0805794` + push.
- **16 Sep 2026** — **H1 diubah** menjadi **"Official Merchandise Pagar Nusa Indonesia"** (permintaan user). Commit `fcb2bb1` + push, deploy `Ready in 6s`, live terverifikasi.
- **17 Sep 2026** — **Periode pre-order diganti + tampilan produk pre-order 2 gambar sejajar + deploy**: (1) periode pre-order dari 14–19 Sep 2026 → **25 Sep – 4 Okt 2026**: `PREORDER_START = '2026-09-25T00:00:00'`, `PREORDER_END = '2026-10-04T23:59:59'` (di comment block + JS + teks sub-label "Periode pre-order: 25 September – 4 Oktober 2026"); countdown pintar: sebelum START label jadi "Pre-Order Dimulai Dalam" + note "dibuka 25 September", setelahnya "Sisa Waktu Pre-Order Berakhir" (tambah `id="cd-label"` di HTML `countdown-label`); `isPreorderActive()` tetap end-only (produk Rompi tetap tampil sebelum 25 Sep). (2) **Produk pre-order ditampilkan tanpa slider** → **`.pre-img-grid`** (grid 2 kolom, `gap:3px`, semua gambar sejajar berpasangan — rompi-1&2 lalu rompi-3&4) + **1 tombol "Pre-Order Sekarang" di bawah gambar** (via branch `isPre` di `renderProductCards`); CSS `.pre-img-grid`/`.pre-img-grid img` ditambah; ready stock tetap slider. Verifikasi: `node --check` JS OK, commit `756c695` + push, deploy Vercel `Ready in 7s` (token sempat `Not authorized` → login ulang device flow), live `www.pagarnusaindo.my.id` HTTP 200: teks periode, `PREORDER_END 2026-10-04`, `pre-img-grid`, `cd-label` semua terdeteksi.
- **17 Sep 2026** — **Nama produk pre-order diganti**: `Rompi` → **`Vest/Rompi Casual`** (array `PRODUCTS`, `index.html` 1 baris). `node --check` OK, commit `37ba0db` + push, deploy Vercel `Ready in 8s`, live terverifikasi (`Vest/Rompi Casual` ada, `name: 'Rompi'` tidak ada).
- **20 Sep 2026** — **Lightbox perbesar gambar produk pre-order**: `.pre-img-grid img` diberi `cursor:zoom-in`; tambah CSS `.lightbox` (overlay z-index 2000, gambar `object-fit:contain` max 92vw/85vh, tombol tutup ×, panah prev/next, counter "n / total"); markup `#lightbox` di bawah modal semua produk; JS `openLightbox(images,index)`/`closeLightbox()`/`lightboxNav(dir)` + delegasi klik `document` pada gambar `.pre-img-grid` (kumpulkan semua src foto produk tsb, buka di index yang diklik) + tutup via backdrop/Escape, navigasi panah kiri/kanan. Scroll body dikunci saat lightbox terbuka. Verifikasi: `node --check` JS OK. **BELUM**: commit+push GitHub & deploy Vercel.

<!-- Entri baru ditambahkan paling bawah, dengan format:
- **Tanggal** — Ringkasan: apa yang dikerjakan, file yang diubah, hasil/pengujian, dan apa yang belum selesai (to-do sesi berikutnya). -->