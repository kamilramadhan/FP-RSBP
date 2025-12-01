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

const certaintyOptions: SymptomOption[] = [
  { label: "Tidak/ Tidak Tahu", value: 0, helper: "Unknown" },
  { label: "Kemungkinan", value: 0.4, helper: "Maybe" },
  { label: "Kemungkinan Besar", value: 0.6, helper: "Probably" },
  { label: "Hampir Pasti", value: 0.8, helper: "Almost Certainly" },
  { label: "Pasti", value: 1, helper: "Definitely" },
];

export const symptoms: Symptom[] = [
  {
    id: "symptom_1",
    category: "Sebum",
    question: "Tidak berminyak",
    detail: "Kulit tidak terlihat mengkilap atau berkeringat",
    options: certaintyOptions,
  },
  {
    id: "symptom_2",
    category: "Tekstur",
    question: "Segar dan halus",
    detail: "Tekstur kulit terasa lembut dan terawat",
    options: certaintyOptions,
  },
  {
    id: "symptom_3",
    category: "Tekstur",
    question: "Bahan-bahan kosmetik mudah menempel di kulit",
    detail: "Makeup dan skincare products dapat menempel dengan baik",
    options: certaintyOptions,
  },
  {
    id: "symptom_4",
    category: "Tekstur",
    question: "Terlihat sehat",
    detail: "Kulit memiliki warna dan kondisi yang baik",
    options: certaintyOptions,
  },
  {
    id: "symptom_5",
    category: "Sebum",
    question: "Tidak berjerawat",
    detail: "Kulit bebas dari jerawat dan komedo",
    options: certaintyOptions,
  },
  {
    id: "symptom_6",
    category: "Tekstur",
    question: "Mudah dalam memilih kosmetik",
    detail: "Produk skincare dan makeup cocok dengan kulit",
    options: certaintyOptions,
  },
  {
    id: "symptom_7",
    category: "Sebum",
    question: "Pori-pori kulit besar terutama di area hidung, pipi, dagu",
    detail: "Pori-pori terlihat menonjol di area tertentu",
    options: certaintyOptions,
  },
  {
    id: "symptom_8",
    category: "Sebum",
    question: "Kulit di bagian wajah terlihat mengkilat",
    detail: "Wajah memiliki kilau yang berlebihan",
    options: certaintyOptions,
  },
  {
    id: "symptom_9",
    category: "Sebum",
    question: "Sering ditumbuhi jerawat",
    detail: "Jerawat muncul dengan frekuensi tinggi",
    options: certaintyOptions,
  },
  {
    id: "symptom_10",
    category: "Hidrasi",
    question: "Kulit kelihatan kering sekali",
    detail: "Kulit terasa sangat kekurangan kelembapan",
    options: certaintyOptions,
  },
  {
    id: "symptom_11",
    category: "Tekstur",
    question: "Pori-pori halus",
    detail: "Pori-pori tidak terlihat atau sangat kecil",
    options: certaintyOptions,
  },
  {
    id: "symptom_12",
    category: "Tekstur",
    question: "Tekstur kulit wajah tipis",
    detail: "Kulit terasa dan terlihat sangat tipis",
    options: certaintyOptions,
  },
  {
    id: "symptom_13",
    category: "Tekstur",
    question: "Cepat menampakkan kerutan-kerutan",
    detail: "Garis halus dan kerutan cepat terlihat",
    options: certaintyOptions,
  },
  {
    id: "symptom_14",
    category: "Sebum",
    question: "Sebagian kulit kelihatan berminyak",
    detail: "Beberapa area kulit memiliki produksi minyak berlebih",
    options: certaintyOptions,
  },
  {
    id: "symptom_15",
    category: "Hidrasi",
    question: "Sebagian kulit kelihatan kering",
    detail: "Beberapa area kulit terasa kekurangan kelembapan",
    options: certaintyOptions,
  },
  {
    id: "symptom_16",
    category: "Sebum",
    question: "Kadang berjerawat",
    detail: "Jerawat muncul sesekali atau tidak konsisten",
    options: certaintyOptions,
  },
  {
    id: "symptom_17",
    category: "Tekstur",
    question: "Susah mendapat hasil polesan kosmetik yang sempurna",
    detail: "Makeup tidak merata atau sulit diterapkan dengan sempurna",
    options: certaintyOptions,
  },
  {
    id: "symptom_18",
    category: "Sensitivitas",
    question: "Mudah alergi",
    detail: "Kulit sering mengalami reaksi alergi terhadap produk",
    options: certaintyOptions,
  },
  {
    id: "symptom_19",
    category: "Sensitivitas",
    question: "Mudah iritasi dan terluka",
    detail: "Kulit sensitif dan mudah teriritasi",
    options: certaintyOptions,
  },
  {
    id: "symptom_20",
    category: "Sensitivitas",
    question: "Kulit mudah terlihat kemerahan",
    detail: "Kulit sering menunjukkan tanda-tanda kemerahan",
    options: certaintyOptions,
  },
];

export const skinProfiles: SkinProfile[] = [
  {
    id: "normal",
    name: "Kulit Normal",
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
    name: "Kulit Kering",
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
    name: "Kulit Berminyak",
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
    name: "Kulit Kombinasi",
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
    name: "Kulit Sensitif",
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
  // ============================================
  // NORMAL SKIN (Kulit Seimbang)
  // ============================================
  { skinTypeId: "normal", symptomId: "symptom_1", weight: 0.8 },  // Tidak berminyak
  { skinTypeId: "normal", symptomId: "symptom_2", weight: 0.8 },  // Segar dan halus
  { skinTypeId: "normal", symptomId: "symptom_3", weight: 0.8 },  // Bahan kosmetik mudah menempel
  { skinTypeId: "normal", symptomId: "symptom_4", weight: 0.8 },  // Terlihat sehat
  { skinTypeId: "normal", symptomId: "symptom_5", weight: 0.8 },  // Tidak berjerawat
  { skinTypeId: "normal", symptomId: "symptom_6", weight: 0.8 },  // Mudah memilih kosmetik
  { skinTypeId: "normal", symptomId: "symptom_11", weight: 0.8 }, // Pori-pori halus

  // ============================================
  // OILY SKIN (Kulit Berminyak)
  // ============================================
  { skinTypeId: "oily", symptomId: "symptom_7", weight: 0.8 },   // Pori-pori besar
  { skinTypeId: "oily", symptomId: "symptom_8", weight: 0.8 },   // Kulit mengkilat
  { skinTypeId: "oily", symptomId: "symptom_9", weight: 0.8 },   // Sering berjerawat
  { skinTypeId: "oily", symptomId: "symptom_16", weight: 0.8 },  // Kadang berjerawat

  // ============================================
  // DRY SKIN (Kulit Kering)
  // ============================================
  { skinTypeId: "dry", symptomId: "symptom_1", weight: 0.6 },    // Tidak berminyak
  { skinTypeId: "dry", symptomId: "symptom_5", weight: 0.6 },    // Tidak berjerawat
  { skinTypeId: "dry", symptomId: "symptom_10", weight: 0.8 },   // Kulit kelihatan kering
  { skinTypeId: "dry", symptomId: "symptom_11", weight: 0.6 },   // Pori-pori halus
  { skinTypeId: "dry", symptomId: "symptom_12", weight: 0.6 },   // Tekstur kulit tipis

  // ============================================
  // COMBINATION SKIN (Kulit Kombinasi)
  // ============================================
  { skinTypeId: "combination", symptomId: "symptom_7", weight: 0.6 },   // Pori-pori besar
  { skinTypeId: "combination", symptomId: "symptom_14", weight: 0.4 },  // Sebagian berminyak
  { skinTypeId: "combination", symptomId: "symptom_15", weight: 0.6 },  // Sebagian kering
  { skinTypeId: "combination", symptomId: "symptom_16", weight: 0.4 },  // Kadang berjerawat
  { skinTypeId: "combination", symptomId: "symptom_17", weight: 0.6 },  // Sulit polesan kosmetik

  // ============================================
  // SENSITIVE SKIN (Kulit Sensitif)
  // ============================================
  { skinTypeId: "sensitive", symptomId: "symptom_12", weight: 0.8 },  // Tekstur kulit tipis
  { skinTypeId: "sensitive", symptomId: "symptom_18", weight: 0.8 },  // Mudah alergi
  { skinTypeId: "sensitive", symptomId: "symptom_19", weight: 0.8 },  // Mudah iritasi
  { skinTypeId: "sensitive", symptomId: "symptom_20", weight: 0.8 },  // Mudah kemerahan
];
