# OP3 — Website (Prototype)

Website prototype untuk Organisasi Siswa Intra Sekolah "OP3 Tahun 2026".

Fitur:
- Dibangun dengan Tailwind CSS (CDN) untuk prototyping cepat.
- Animasi interaktif menggunakan anime.js (CDN).
- Responsif, dengan mobile menu dan smooth-scroll.
- Bagian: Beranda, Tentang, Program, Pengurus, Kontak.

Cara menjalankan:
1. Clone atau unduh repo.
2. Pastikan file `index.html` dan folder `assets/js/app.js` ada.
3. Buka `index.html` di browser (cukup double click) atau jalankan live server:
   - Contoh: `npx serve` atau extension Live Server di VS Code.
4. Untuk produksi: pertimbangkan memasang Tailwind via npm dan membangun CSS agar lebih optimal.

Catatan pengembangan:
- Untuk menambah pengurus atau program, edit bagian HTML di masing-masing section.
- Untuk produksi, migrasikan Tailwind ke workflow PostCSS + PurgeCSS untuk mengurangi ukuran.
- Jika ingin menyimpan pesan kontak, tambahkan endpoint backend atau layanan form (Formspree, Netlify Forms, dsb).
