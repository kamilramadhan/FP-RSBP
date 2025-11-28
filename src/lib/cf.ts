import { rules, skinProfiles, symptoms, type SkinProfile } from "./knowledgeBase";

export type AnswerSheet = Record<string, number>;

export type Contribution = {
  symptomId: string;
  symptomLabel: string;
  evidence: number;
  weight: number;
};

export type Diagnosis = {
  profile: SkinProfile;
  confidence: number;
  label: string;
  contributions: Contribution[];
};

export type DiagnosisResponse = {
  topDiagnosis: Diagnosis;
  ranking: Diagnosis[];
};

const clamp = (value: number, min = -1, max = 1) => Math.min(Math.max(value, min), max);

/**
 * Kombinasi CF menggunakan formula Dempster-Shafer
 * CF(H, E1^E2) = CF(H, E1) + CF(H, E2) × (1 - CF(H, E1))
 * 
 * Digunakan untuk mengkombinasikan dua bukti (evidence) untuk hipotesis yang sama
 */
const combineCF = (current: number, evidence: number) => {
  // Jika ini adalah evidence pertama
  if (current === 0) return evidence;
  
  // Jika kedua CF positif: CF baru = CF1 + CF2 × (1 - CF1)
  if (current > 0 && evidence > 0) {
    return current + evidence * (1 - current);
  }
  
  // Jika kedua CF negatif: CF baru = CF1 + CF2 × (1 + CF1)
  if (current < 0 && evidence < 0) {
    return current + evidence * (1 + current);
  }

  // Jika CF bertanda berlawanan
  const denominator = 1 - Math.min(Math.abs(current), Math.abs(evidence));
  if (denominator === 0) return 0;
  return (current + evidence) / denominator;
};

const confidenceLabel = (value: number) => {
  if (value >= 0.85) return "Pasti";
  if (value >= 0.65) return "Sangat meyakinkan";
  if (value >= 0.45) return "Cukup kuat";
  if (value >= 0.25) return "Perlu verifikasi";
  return "Belum meyakinkan";
};

/**
 * Setiap user answer dikonversi menjadi CF(H, E):
 * - 0.0 "Tidak Tahu" → CF = 0 (no evidence)
 * - 0.4 "Kemungkinan" → CF = 0.4 (weak evidence)
 * - 0.6 "Kemungkinan Besar" → CF = 0.6 (moderate evidence)
 * - 0.8 "Hampir Pasti" → CF = 0.8 (strong evidence)
 * - 1.0 "Pasti" → CF = 1.0 (definite evidence)
 * 
 * CF final = Evidence (User Answer) × Weight (Rule)
 */
export function diagnose(answers: AnswerSheet): DiagnosisResponse {
  const symptomMap = new Map(symptoms.map((s) => [s.id, s.question]));

  const aggregation = new Map<
    SkinProfile["id"],
    { confidence: number; contributions: Contribution[] }
  >();

  // Iterasi setiap rule (kombinasi gejala + tipe kulit)
  for (const rule of rules) {
    const answer = answers[rule.symptomId];
    // Skip jika belum dijawab atau jawaban 0 (tidak tahu)
    if (typeof answer !== "number" || answer === 0) continue;

    // Hitung CF(Diagnosis, Evidence) = User Answer × Rule Weight
    // Contoh: User jawab 0.8 (hampir pasti) × weight 0.9 = 0.72
    const evidence = clamp(answer * rule.weight);
    if (evidence === 0) continue;

    const record = aggregation.get(rule.skinTypeId) ?? {
      confidence: 0,
      contributions: [],
    };

    // Kombinasikan dengan CF sebelumnya menggunakan Dempster-Shafer
    record.confidence = combineCF(record.confidence, evidence);
    record.contributions.push({
      symptomId: rule.symptomId,
      symptomLabel: symptomMap.get(rule.symptomId) ?? rule.symptomId,
      evidence,
      weight: rule.weight,
    });

    aggregation.set(rule.skinTypeId, record);
  }

  // Normalisasi hasil diagnosis untuk semua skin type
  const diagnoses: Diagnosis[] = skinProfiles.map((profile) => {
    const record = aggregation.get(profile.id);
    const confidence = clamp(record?.confidence ?? 0, 0, 1);
    return {
      profile,
      confidence,
      label: confidenceLabel(confidence),
      contributions: record?.contributions ?? [],
    };
  });

  // Urutkan berdasarkan confidence tertinggi
  diagnoses.sort((a, b) => b.confidence - a.confidence);

  return {
    topDiagnosis: diagnoses[0],
    ranking: diagnoses,
  };
}

export function normalizeAnswers(raw: AnswerSheet): AnswerSheet {
  const normalized: AnswerSheet = {};
  for (const symptom of symptoms) {
    const value = raw[symptom.id];
    if (typeof value !== "number") continue;
    normalized[symptom.id] = clamp(value, 0, 1);
  }
  return normalized;
}
