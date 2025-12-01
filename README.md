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
 
## 📤 Deploy ke Vercel

Langkah singkat untuk deploy ke Vercel (recommended — Vercel akan membangun situs di cloud):

1. Pastikan kode sudah ada di repository Git (GitHub / GitLab / Bitbucket) dan ter-push.
2. Buka https://vercel.com/import dan pilih repository Anda.
3. Pada halaman pengaturan project di Vercel:
	 - Framework Preset: Next.js
	 - Build Command: `npm run build` (atau biarkan default `next build`)
	 - Output Directory: kosongkan (Next.js akan otomatis)
4. Jika aplikasi memerlukan environment variables, tambahkan di Settings -> Environment Variables sebelum deploy.
5. Klik Deploy — Vercel akan menjalankan instalasi dependensi dan build di cloud.

Catatan penting:
- Saya mencoba menjalankan `npm install` di mesin Anda untuk memverifikasi build lokal, namun proses gagal karena "no space left on device" (ENOSPC). Anda punya dua opsi:
	1. Kosongkan ruang disk di mesin lokal Anda lalu jalankan `npm install` dan `npm run build` untuk verifikasi lokal, atau
	2. Langsung deploy ke Vercel — Vercel akan membangun aplikasi di servernya sehingga verifikasi lokal tidak wajib.

Opsional: file `vercel.json` biasanya tidak diperlukan untuk Next.js di Vercel, tapi jika Anda ingin mengatur build command khusus, buat file `vercel.json` minimal seperti:

```
{
	"buildCommand": "npm run build"
}
```

Jika Anda mau, saya bisa bantu membuat `vercel.json` atau menambahkan instruksi khusus lain untuk environment vars.
