# Implementasi Certainty Factor (CF) - Sistem Pakar Kulitmu

## Ringkasan Metode

Sistem ini menggunakan **metode Certainty Factor dengan kombinasi Dempster-Shafer** untuk mendiagnosis tipe kulit berdasarkan jawaban user.

## Tahapan Perhitungan

### 1. Input User (Evidence)

User menjawab 20 pertanyaan dengan opsi:
- **"Tidak Tahu"** = 0.0 (No Evidence)
- **"Kemungkinan"** = 0.4 (Weak Evidence)  
- **"Kemungkinan Besar"** = 0.6 (Moderate Evidence)
- **"Hampir Pasti"** = 0.8 (Strong Evidence)
- **"Pasti"** = 1.0 (Definite Evidence)

### 2. Rule Base

Setiap rule menghubungkan gejala dengan tipe kulit menggunakan weight (bobot):

```
Rule: IF (Pori-pori kulit besar) THEN (Oily Skin) with weight 0.9
```

Bobot menunjukkan kepastian bahwa gejala benar-benar mengindikasikan tipe kulit tersebut.

### 3. Perhitungan Evidence (E)

Untuk setiap gejala yang dijawab:

```
CF(Hypothesis, Evidence) = User Answer × Rule Weight
```

**Contoh:**
- User jawab "Hampir Pasti" (0.8) untuk pertanyaan "Pori-pori kulit besar"
- Rule weight untuk Oily Skin = 0.9
- CF = 0.8 × 0.9 = **0.72**

### 4. Kombinasi CF (Dempster-Shafer)

Ketika ada multiple evidence untuk hipotesis yang sama, gunakan formula:

```
CF(H, E1^E2) = CF(H, E1) + CF(H, E2) × (1 - CF(H, E1))
```

**Contoh - User menunjukkan 2 gejala oily:**

```
Gejala 1: Pori-pori besar
  CF = 0.8 × 0.9 = 0.72

Gejala 2: Kulit mengkilat
  CF = 0.9 × 0.9 = 0.81

Kombinasi CF:
  CF_combined = 0.72 + 0.81 × (1 - 0.72)
  CF_combined = 0.72 + 0.81 × 0.28
  CF_combined = 0.72 + 0.2268
  CF_combined = 0.9468
```

### 5. Normalisasi Hasil

Setiap skin type mendapatkan confidence value (0 - 1), kemudian diurutkan dari tertinggi ke terendah.

### 6. Output Label Confidence

Hasil confidence dikonversi ke label bahasa Indonesia:

| CF Range | Label |
|----------|-------|
| ≥ 0.85 | Pasti |
| ≥ 0.65 | Sangat meyakinkan |
| ≥ 0.45 | Cukup kuat |
| ≥ 0.25 | Perlu verifikasi |
| < 0.25 | Belum meyakinkan |

## Implementasi Teknis

### File: `src/lib/cf.ts`

```typescript
// Kombinasi CF menggunakan Dempster-Shafer
const combineCF = (current: number, evidence: number) => {
  if (current === 0) return evidence; // First evidence
  if (current > 0 && evidence > 0) {
    return current + evidence * (1 - current); // Both positive
  }
  // ... handle negative cases
}

// Perhitungan diagnosis
export function diagnose(answers: AnswerSheet): DiagnosisResponse {
  // 1. Iterasi setiap rule
  for (const rule of rules) {
    const answer = answers[rule.symptomId]; // 0-1 dari user
    const evidence = clamp(answer * rule.weight); // CF = evidence × weight
    
    // 2. Kombinasikan dengan CF sebelumnya
    record.confidence = combineCF(record.confidence, evidence);
  }
  
  // 3. Urutkan berdasarkan confidence
  diagnoses.sort((a, b) => b.confidence - a.confidence);
  
  return { topDiagnosis: diagnoses[0], ranking: diagnoses };
}
```

### File: `src/app/api/diagnose/route.ts`

```typescript
export async function POST(request: Request) {
  const payload = await request.json(); // { answers: { [symptomId]: 0-1 } }
  const normalized = normalizeAnswers(payload.answers);
  const result = diagnose(normalized); // Run CF calculation
  return NextResponse.json(result);
}
```

## Contoh Kasus Lengkap

**Input User:**
```json
{
  "symptom_7": 1.0,  // Pori-pori besar - Pasti
  "symptom_8": 0.8,  // Kulit mengkilat - Hampir Pasti
  "symptom_9": 0.6   // Sering berjerawat - Kemungkinan Besar
}
```

**Perhitungan:**

```
OILY SKIN:
  Rule: symptom_7 → oily (weight 0.9)
    Evidence = 1.0 × 0.9 = 0.90
    CF = 0.90
  
  Rule: symptom_8 → oily (weight 0.9)
    Evidence = 0.8 × 0.9 = 0.72
    CF_combined = 0.90 + 0.72 × (1 - 0.90) = 0.90 + 0.072 = 0.972
  
  Rule: symptom_9 → oily (weight 0.85)
    Evidence = 0.6 × 0.85 = 0.51
    CF_combined = 0.972 + 0.51 × (1 - 0.972) = 0.972 + 0.0141 = 0.9861
  
  FINAL: Confidence = 0.9861 → Label = "Pasti"

NORMAL SKIN:
  No matching rules
  FINAL: Confidence = 0 → Label = "Belum meyakinkan"
```

**Output:**
```json
{
  "topDiagnosis": {
    "profile": { "id": "oily", "name": "Kulit Penjaga Kilau", ... },
    "confidence": 0.9861,
    "label": "Pasti",
    "contributions": [
      { "symptomId": "symptom_7", "evidence": 0.9, "weight": 0.9 },
      { "symptomId": "symptom_8", "evidence": 0.72, "weight": 0.9 },
      { "symptomId": "symptom_9", "evidence": 0.51, "weight": 0.85 }
    ]
  },
  "ranking": [ ... all 5 skin types sorted by confidence ]
}
```

## Validasi Sesuai Laporan

✅ **Metode**: Dempster-Shafer (sesuai teori CF standard)
✅ **Formula**: CF(H,E1^E2) = CF(H,E1) + CF(H,E2) × (1 - CF(H,E1))
✅ **Normalisasi**: Answer dan CF dijaga dalam range [0, 1]
✅ **Agregasi**: Multiple evidence dikombinasikan per skin type
✅ **Output**: Confidence + Kontribusi setiap gejala

## Cara Verify Hasil

1. Test dengan semua jawaban "Pasti" untuk gejala tertentu
2. Lihat apakah confidence mendekati 1.0
3. Periksa contributions untuk melihat detail perhitungan
4. Bandingkan dengan perhitungan manual menggunakan formula

---

**Last Updated**: 2025-11-28
**Status**: ✅ Implementation Complete - Sesuai Laporan/Standar CF
