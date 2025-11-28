import { diagnose } from './src/lib/cf';
import { rules, skinProfiles } from './src/lib/knowledgeBase';

// Test Case 1: Clear Normal Skin Indicators
const testCase1 = {
  name: "Case 1: Normal Skin (Strong Indicators)",
  answers: {
    symptom_1: 1.0,  // Tidak berminyak
    symptom_2: 1.0,  // Segar dan halus
    symptom_3: 1.0,  // Kosmetik mudah menempel
    symptom_4: 1.0,  // Terlihat sehat
    symptom_5: 1.0,  // Tidak berjerawat
    symptom_6: 1.0,  // Mudah pilih kosmetik
    symptom_11: 1.0, // Pori-pori halus
    symptom_7: 0.0,  // Pori-pori tidak besar
    symptom_8: 0.0,  // Tidak mengkilat
    symptom_9: 0.0,  // Tidak berjerawat
  },
};

// Test Case 2: Clear Oily Skin Indicators
const testCase2 = {
  name: "Case 2: Oily Skin (Strong Indicators)",
  answers: {
    symptom_7: 1.0,  // Pori-pori besar
    symptom_8: 1.0,  // Mengkilat
    symptom_9: 1.0,  // Sering berjerawat
    symptom_16: 1.0, // Kadang berjerawat
    symptom_1: 0.0,  // Tidak indikasi normal
    symptom_2: 0.0,
    symptom_3: 0.0,
  },
};

// Test Case 3: Clear Dry Skin Indicators
const testCase3 = {
  name: "Case 3: Dry Skin (Strong Indicators)",
  answers: {
    symptom_10: 1.0, // Kering sekali
    symptom_12: 1.0, // Tekstur tipis
    symptom_11: 1.0, // Pori-pori halus
    symptom_1: 0.8,  // Tidak berminyak
    symptom_5: 0.8,  // Tidak berjerawat
    symptom_7: 0.0,  // Tidak pori besar
    symptom_8: 0.0,
  },
};

// Test Case 4: Clear Sensitive Skin Indicators
const testCase4 = {
  name: "Case 4: Sensitive Skin (Strong Indicators)",
  answers: {
    symptom_12: 1.0, // Tekstur tipis
    symptom_18: 1.0, // Mudah alergi
    symptom_19: 1.0, // Mudah iritasi
    symptom_20: 1.0, // Kemerahan
    symptom_1: 0.0,
    symptom_7: 0.0,
  },
};

// Test Case 5: Combination Skin (Mixed Indicators)
const testCase5 = {
  name: "Case 5: Combination Skin (Mixed)",
  answers: {
    symptom_7: 0.8,  // Pori-pori besar (oily zone)
    symptom_14: 0.8, // Sebagian berminyak
    symptom_15: 0.8, // Sebagian kering
    symptom_16: 0.6, // Kadang berjerawat
    symptom_17: 0.7, // Sulit makeup sempurna
    symptom_10: 0.0, // Tidak kering sekali
  },
};

// Test Case 6: Ambiguous/Moderate (Multiple indicators)
const testCase6 = {
  name: "Case 6: Ambiguous (Moderate indicators)",
  answers: {
    symptom_1: 0.6,  // Sedikit berminyak
    symptom_2: 0.5,  // Kurang segar
    symptom_9: 0.6,  // Kadang jerawat
    symptom_10: 0.4, // Sedikit kering
    symptom_18: 0.5, // Sedikit mudah alergi
  },
};

console.log("=" .repeat(80));
console.log("CERTAINTY FACTOR DIAGNOSTIC SYSTEM - TEST RESULTS");
console.log("=" .repeat(80));
console.log("");

const testCases = [testCase1, testCase2, testCase3, testCase4, testCase5, testCase6];

testCases.forEach((testCase) => {
  console.log(`\n📋 ${testCase.name}`);
  console.log("-".repeat(80));
  
  const result = diagnose(testCase.answers);
  
  console.log(`\n✅ Top Diagnosis: ${result.topDiagnosis.profile.name}`);
  console.log(`   ID: ${result.topDiagnosis.profile.id}`);
  console.log(`   Confidence: ${(result.topDiagnosis.confidence * 100).toFixed(2)}%`);
  console.log(`   Label: ${result.topDiagnosis.label}`);
  
  console.log(`\n📊 Full Ranking:`);
  result.ranking.forEach((item, idx) => {
    console.log(
      `   ${idx + 1}. ${item.profile.name} (${item.profile.id}): ${(item.confidence * 100).toFixed(2)}% - ${item.label}`
    );
  });
  
  console.log(`\n📝 Contributing Symptoms (${result.topDiagnosis.contributions.length} used):`);
  result.topDiagnosis.contributions.forEach((contrib) => {
    console.log(
      `   - ${contrib.symptomId}: evidence=${contrib.evidence.toFixed(2)}, weight=${contrib.weight.toFixed(2)}`
    );
  });
  
  console.log("");
});

console.log("=" .repeat(80));
console.log("TEST COMPLETE");
console.log("=" .repeat(80));
