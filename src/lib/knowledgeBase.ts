export type SymptomOption = {
  label: string;
  value: number;
  helper: string;
};

export type Symptom = {
  id: string;
  category: "Sebum" | "Hidrasi" | "Sensitivitas" | "Tekstur" | "Lifestyle";
  question: string;
  detail: string;
  options: SymptomOption[];
};

export type SkinProfile = {
  id: string;
  name: string;
  tone: string;
  summary: string;
  mantra: string;
  heroColor: string;
  highlight: string;
  careRitual: string[];
  ingredientFocus: string[];
};

export type Rule = {
  skinTypeId: SkinProfile["id"];
  symptomId: Symptom["id"];
  weight: number; // certainty of hypothesis when symptom is fully true
};

const likert: SymptomOption[] = [
  { label: "Tidak pernah", value: 0, helper: "Jarang bahkan tidak terjadi" },
  { label: "Jarang", value: 0.25, helper: "Hanya sesekali terasa" },
  { label: "Kadang", value: 0.5, helper: "Muncul beberapa kali seminggu" },
  { label: "Sering", value: 0.75, helper: "Hampir setiap hari" },
  { label: "Selalu", value: 1, helper: "Konstan atau menjadi keluhan utama" },
];

export const symptoms: Symptom[] = [
  {
    id: "oiliness_tzone",
    category: "Sebum",
    question: "Seberapa sering T-zone Anda tampak mengilap dalam 4 jam setelah membersihkan wajah?",
    detail: "T-zone mencakup dahi, hidung, dan dagu.",
    options: likert,
  },
  {
    id: "dry_patches",
    category: "Hidrasi",
    question: "Apakah Anda merasakan area wajah yang kering atau mengelupas?",
    detail: "Biasanya muncul di pipi atau sekitar mulut.",
    options: likert,
  },
  {
    id: "tight_after_wash",
    category: "Hidrasi",
    question: "Apakah kulit terasa kencang setelah mencuci wajah tanpa memakai pelembap?",
    detail: "Sensasi ketarik menandakan lapisan pelindung kurang seimbang.",
    options: likert,
  },
  {
    id: "visible_pores",
    category: "Tekstur",
    question: "Seberapa jelas pori terlihat terutama di hidung dan pipi bagian dalam?",
    detail: "Pori yang tampak besar biasanya terkait produksi minyak berlebih.",
    options: likert,
  },
  {
    id: "acne_frequency",
    category: "Sebum",
    question: "Seberapa sering muncul jerawat meradang atau komedo aktif?",
    detail: "Hitung baik pustula, papula, maupun komedo hitam/putih.",
    options: likert,
  },
  {
    id: "redness",
    category: "Sensitivitas",
    question: "Apakah kulit mudah memerah saat terkena panas, sinar matahari, atau produk baru?",
    detail: "Termasuk rasa perih, panas, atau gatal.",
    options: likert,
  },
  {
    id: "product_reaction",
    category: "Sensitivitas",
    question: "Seberapa sering Anda mengalami reaksi negatif setelah mencoba produk skincare?",
    detail: "Misal muncul bentol kecil, rasa terbakar, atau iritasi.",
    options: likert,
  },
  {
    id: "mixed_zones",
    category: "Tekstur",
    question: "Apakah Anda memiliki area sangat berminyak sekaligus area sangat kering secara bersamaan?",
    detail: "Contoh: T-zone berminyak tetapi pipi terasa kering.",
    options: likert,
  },
  {
    id: "makeup_sits",
    category: "Tekstur",
    question: "Bagaimana makeup menempel di kulit?",
    detail: "Kulit berminyak membuat makeup cepat luntur, kulit kering membuat retak.",
    options: [
      { label: "Selalu rata", value: 0.2, helper: "Makeup menempel konsisten" },
      { label: "Sedikit pudar", value: 0.4, helper: "Ada area yang butuh touch-up" },
      { label: "Sering cakey", value: 0.6, helper: "Area kering/berminyak menonjol" },
      { label: "Cepat rusak", value: 0.8, helper: "Dalam 2 jam sudah berubah" },
      { label: "Tidak bertahan", value: 1, helper: "Langsung pecah/luntur" },
    ],
  },
  {
    id: "lifestyle_humidity",
    category: "Lifestyle",
    question: "Seberapa sering Anda berada di ruang ber-AC atau iklim kering?",
    detail: "Lingkungan memengaruhi hidrasi kulit.",
    options: likert,
  },
];

export const skinProfiles: SkinProfile[] = [
  {
    id: "normal",
    name: "Kulit Seimbang",
    tone: "#1f2937",
    summary:
      "Sebum dan hidrasi stabil, pori halus, jarang reaktif. Fokusnya menjaga ritme sehat agar tetap resilien.",
    mantra: "Keseimbangan adalah kekuatanmu.",
    heroColor: "from-emerald-200 via-emerald-50 to-white",
    highlight: "Kulit terasa nyaman sepanjang hari dan mudah menerima produk baru.",
    careRitual: [
      "Double cleansing ringan tiap malam",
      "Hydrating toner + serum antioksidan",
      "Moisturizer gel-cream dan SPF 50",
    ],
    ingredientFocus: ["Niacinamide", "Hyaluronic Acid", "Green Tea"],
  },
  {
    id: "dry",
    name: "Kulit Pencari Hidrasi",
    tone: "#8b5cf6",
    summary:
      "Barrier cenderung rapuh, cepat terasa kencang dan mengelupas. Dibutuhkan lapisan oklusif lembut.",
    mantra: "Rawat diri dengan kelembutan.",
    heroColor: "from-violet-200 via-rose-50 to-white",
    highlight: "Kulit mudah dehidrasi terutama di pipi dan sekitar mata.",
    careRitual: [
      "Cleanser creamy tanpa SLS",
      "Essence berlapis untuk water-lock",
      "Moisturizer balmy + face oil malam hari",
    ],
    ingredientFocus: ["Ceramide", "Squalane", "Panthenol"],
  },
  {
    id: "oily",
    name: "Kulit Penjaga Kilau",
    tone: "#ea580c",
    summary:
      "Produksi sebum aktif menyebabkan pori besar dan jerawat. Butuh kontrol minyak tanpa membuat kering.",
    mantra: "Kilau sehat, bukan berminyak.",
    heroColor: "from-amber-200 via-orange-50 to-white",
    highlight: "T-zone sangat aktif dengan kilap cepat muncul.",
    careRitual: [
      "Cleanser gel berbusa lembut",
      "Serum BHA/AHA mingguan",
      "Moisturizer ringan + SPF matte",
    ],
    ingredientFocus: ["Salicylic Acid", "Zinc PCA", "Tea Tree"],
  },
  {
    id: "combination",
    name: "Kulit Harmoni Dua Dunia",
    tone: "#0ea5e9",
    summary:
      "Area T-zone berminyak tapi pipi bisa kering. Perlu pendekatan zona spesifik.",
    mantra: "Sesuaikan sesuai kebutuhan area.",
    heroColor: "from-sky-200 via-cyan-50 to-white",
    highlight: "Harus pandai layer produk berbeda dalam satu ritual.",
    careRitual: [
      "Cleanser pH seimbang",
      "Serum hidrasi di seluruh wajah",
      "Clay mask di T-zone, sleeping mask di pipi",
    ],
    ingredientFocus: ["PHA", "Beta Glucan", "Licorice Root"],
  },
  {
    id: "sensitive",
    name: "Kulit Sang Empu Pelindung",
    tone: "#f43f5e",
    summary:
      "Mudah memerah, terasa panas, dan reaktif terhadap perubahan cuaca maupun produk baru.",
    mantra: "Minimalkan stimulasi, maksimalkan proteksi.",
    heroColor: "from-rose-200 via-rose-50 to-white",
    highlight: "Prioritaskan produk hipoalergenik dengan daftar bahan ringkas.",
    careRitual: [
      "Cleanser susu hangat",
      "Serum anti-redness",
      "Moisturizer barrier + SPF mineral",
    ],
    ingredientFocus: ["Centella Asiatica", "Allantoin", "Bisabolol"],
  },
];

export const rules: Rule[] = [
  { skinTypeId: "oily", symptomId: "oiliness_tzone", weight: 0.9 },
  { skinTypeId: "oily", symptomId: "visible_pores", weight: 0.8 },
  { skinTypeId: "oily", symptomId: "acne_frequency", weight: 0.85 },
  { skinTypeId: "oily", symptomId: "makeup_sits", weight: 0.6 },
  { skinTypeId: "oily", symptomId: "mixed_zones", weight: 0.4 },

  { skinTypeId: "dry", symptomId: "dry_patches", weight: 0.9 },
  { skinTypeId: "dry", symptomId: "tight_after_wash", weight: 0.85 },
  { skinTypeId: "dry", symptomId: "lifestyle_humidity", weight: 0.5 },
  { skinTypeId: "dry", symptomId: "makeup_sits", weight: 0.65 },

  { skinTypeId: "combination", symptomId: "mixed_zones", weight: 0.95 },
  { skinTypeId: "combination", symptomId: "oiliness_tzone", weight: 0.65 },
  { skinTypeId: "combination", symptomId: "dry_patches", weight: 0.6 },

  { skinTypeId: "sensitive", symptomId: "redness", weight: 0.85 },
  { skinTypeId: "sensitive", symptomId: "product_reaction", weight: 0.9 },
  { skinTypeId: "sensitive", symptomId: "lifestyle_humidity", weight: 0.45 },

  { skinTypeId: "normal", symptomId: "oiliness_tzone", weight: -0.4 },
  { skinTypeId: "normal", symptomId: "dry_patches", weight: -0.4 },
  { skinTypeId: "normal", symptomId: "redness", weight: -0.3 },
  { skinTypeId: "normal", symptomId: "product_reaction", weight: -0.4 },
];
