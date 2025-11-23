<img src="public/next.svg" alt="Kulitmu" width="0" height="0" hidden />

# Kulitmu — Sistem Pakar Jenis Kulit dengan Certainty Factor

Kulitmu adalah aplikasi web fullstack berbasis Next.js 14 (App Router) yang membantu mengidentifikasi jenis kulit wajah melalui metode Certainty Factor (CF). UI/UX dirancang mengikuti pengalaman storytelling 16personalities: hero imersif, pertanyaan bernuansa kartu, dan rekomendasi personal.

## ✨ Fitur utama

- **Questionnaire adaptif** dengan skala likert 5 tingkat untuk mengukur intensitas gejala kulit.
- **Mesin inferensi Certainty Factor** dengan basis aturan lima profil kulit (normal, kering, berminyak, kombinasi, sensitif).
- **API `/api/diagnose`** yang menerima jawaban pengguna dan mengembalikan ranking profil lengkap beserta kontribusi gejala.
- **UI responsif** yang meniru estetika 16personalities: gradient lembut, kartu berlapis, insight naratif.
- **Ritual & rekomendasi kandungan** untuk setiap profil agar pengguna langsung tahu langkah perawatan.

## 🚀 Menjalankan proyek

Pastikan Node.js 18+ dan npm terpasang. Semua perintah dieksekusi dari akar repo (`d:\RSBP FP`).

```bash
npm install
npm run dev
# buka http://localhost:3000
```

### Build produksi

```bash
npm run build
npm run start
```

### Lint (opsional)

```bash
npm run lint
```

## 🧠 Arsitektur sistem pakar

- **`src/lib/knowledgeBase.ts`** — definisi gejala, opsi jawaban, profil kulit, dan bobot aturan.
- **`src/lib/cf.ts`** — utilitas Certainty Factor (normalisasi jawaban, kombinasi evidensi, label keyakinan).
- **`src/app/api/diagnose/route.ts`** — endpoint Next.js yang menerima payload `{ answers: { [symptomId]: value } }` dan merespons ranking profil.
- **`src/app/page.tsx`** — pengalaman frontend lengkap (hero, kartu pertanyaan, panel hasil, insight tambahan).

## 📦 Tech stack

- Next.js 16.0.3 (App Router) + React 19.
- Tailwind CSS v4 experimental (melalui `@tailwindcss/postcss`).
- TypeScript penuh dengan alias `@/*`.

## 🧩 Pengembangan lanjutan

- Tambahkan penyimpanan sesi (misal, Supabase atau Redis) bila ingin menyimpan riwayat diagnosa.
- Perluas basis pengetahuan dengan parameter gaya hidup tambahan (tidur, pola makan).
- Integrasikan tracker progres perawatan harian.

## 🛡️ Lisensi

Proyek ini dibuat untuk kebutuhan Final Project RSBP FP. Gunakan dan modifikasi sesuai kebutuhan akademik atau demonstrasi.
