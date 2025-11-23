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

const combineCF = (current: number, evidence: number) => {
  if (current === 0) return evidence;
  if (current > 0 && evidence > 0) {
    return current + evidence * (1 - current);
  }
  if (current < 0 && evidence < 0) {
    return current + evidence * (1 + current);
  }

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

export function diagnose(answers: AnswerSheet): DiagnosisResponse {
  const symptomMap = new Map(symptoms.map((s) => [s.id, s.question]));

  const aggregation = new Map<
    SkinProfile["id"],
    { confidence: number; contributions: Contribution[] }
  >();

  for (const rule of rules) {
    const answer = answers[rule.symptomId];
    if (typeof answer !== "number" || answer === 0) continue;

    const evidence = clamp(answer * rule.weight);
    if (evidence === 0) continue;

    const record = aggregation.get(rule.skinTypeId) ?? {
      confidence: 0,
      contributions: [],
    };

    record.confidence = combineCF(record.confidence, evidence);
    record.contributions.push({
      symptomId: rule.symptomId,
      symptomLabel: symptomMap.get(rule.symptomId) ?? rule.symptomId,
      evidence,
      weight: rule.weight,
    });

    aggregation.set(rule.skinTypeId, record);
  }

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
