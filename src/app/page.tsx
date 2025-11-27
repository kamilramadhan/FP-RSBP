"use client";

import { useMemo, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultPanel } from "@/components/ResultPanel";
import { Logo } from "@/components/Logo";
import { symptoms, skinProfiles } from "@/lib/knowledgeBase";
import type { AnswerSheet, Diagnosis } from "@/lib/cf";

export default function Home() {
  const [answers, setAnswers] = useState<AnswerSheet>({});
  const [result, setResult] = useState<Diagnosis | null>(null);
  const [ranking, setRanking] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const progress = useMemo(() => (answeredCount / symptoms.length) * 100, [answeredCount]);
  const currentSymptom = symptoms[currentPage];
  const isLastQuestion = currentPage === symptoms.length - 1;
  const allAnswered = answeredCount === symptoms.length;

  const handleSelect = (symptomId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [symptomId]: value }));
  };

  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentPage((prev) => prev + 1);
    } else if (allAnswered) {
      submit();
    }
  };

  const handlePrevQuestion = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startQuestionnaire = () => {
    setShowQuestionnaire(true);
    setTimeout(() => {
      const element = document.getElementById("questionnaire-section");
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error ?? "Gagal menghubungi server");
      }

      const data = (await response.json()) as {
        topDiagnosis: Diagnosis;
        ranking: Diagnosis[];
      };
      setResult(data.topDiagnosis);
      setRanking(data.ranking);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan tak terduga");
    } finally {
      setLoading(false);
    }
  };

  const secondaryProfiles = useMemo(() => ranking.slice(1, 4), [ranking]);

  return (
    <div className="min-h-screen bg-white pb-16 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Logo />
      </div>
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-[480px] max-w-5xl blur-3xl">
          <div className="h-full w-full bg-gradient-to-br from-orange-200/40 via-orange-100/20 to-transparent opacity-40 animate-float-blur" />
        </div>
        <section className="mx-auto flex max-w-4xl flex-col items-center gap-10 px-4 pb-12 pt-20 text-center">
          <div className="space-y-6">
            <div className="flex justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-orange-600">Kulitmu</p>
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl text-slate-900">
              Sistem Pakar untuk membaca<br />
              bahasa kulit wajahmu dengan<br />
              <span className="text-orange-500">Certainty Factor.</span>
            </h1>
            <p className="text-base text-slate-600 md:text-lg">
              Terinspirasi dari pengalaman playground 16personalities: interaktif, emosional, dan penuh cerita
              visual. Jawab pertanyaan singkat lalu dapatkan profil kulit beserta ritual yang cocok.
            </p>
          </div>
          <button
            onClick={startQuestionnaire}
            disabled={loading}
            className="rounded-full bg-orange-500/90 px-8 py-3 text-base font-semibold text-white transition hover:bg-orange-400/90 shadow-lg shadow-orange-500/30 disabled:cursor-not-allowed disabled:opacity-60 flex items-center gap-2"
          >
            Ambil Test <span>➜</span>
          </button>
        </section>
      </div>

      <main className="mx-auto mt-16 flex max-w-6xl flex-col gap-10 px-4 md:flex-row" id="questionnaire-section">
        {!showQuestionnaire ? (
          <div className="hidden">
            <div className="flex-1 space-y-6">
              <div className="rounded-3xl border border-slate-100 bg-white/80 p-12 text-center shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">Siap memulai?</p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-900">Tekan tombol 'Ambil Test' di atas untuk memulai kuis</h3>
              </div>
            </div>
          </div>
        ) : result ? (
          <div className="flex-1 space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Hasil Analisis</h2>
              <p className="text-slate-600 mb-4">Semua pertanyaan sudah terjawab! Berikut adalah hasil analisis kulit Anda.</p>
              <button
                onClick={() => {
                  setShowQuestionnaire(false);
                  setCurrentPage(0);
                  setAnswers({});
                  setResult(null);
                  setRanking([]);
                }}
                className="rounded-2xl bg-orange-500/90 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
              >
                Mulai Ulang
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-lg">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Pertanyaan {currentPage + 1} dari {symptoms.length}
                  </span>
                  <span className="text-sm font-semibold text-orange-600">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {currentSymptom && (
              <QuestionCard
                symptom={currentSymptom}
                value={answers[currentSymptom.id]}
                onSelect={(value) => handleSelect(currentSymptom.id, value)}
              />
            )}

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handlePrevQuestion}
                disabled={currentPage === 0}
                className="flex-1 rounded-2xl border border-orange-300 bg-white px-5 py-4 text-base font-semibold text-orange-600 transition hover:border-orange-400 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ← Sebelumnya
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={!(currentSymptom?.id in answers)}
                className="flex-1 rounded-2xl bg-orange-500/90 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLastQuestion && allAnswered ? "Lihat Hasil →" : "Selanjutnya →"}
              </button>
            </div>
          </div>
        )}
        {showQuestionnaire && (
        <aside className="w-full max-w-xl space-y-6 md:sticky md:top-4 md:self-start">
          <div className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">Insight tambahan</p>
            <p className="mt-2 text-base text-slate-600">
              Kulit jarang berdiri di satu spektrum. Kami menampilkan 3 kemungkinan lain agar kamu bisa memantau
              perubahan harian.
            </p>
          </div>
          {result ? (
            <ResultPanel diagnosis={result} loading={loading} />
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 p-6 text-sm text-slate-500">
              Insight akan tampil setelah analisis pertama selesai.
            </div>
          )}
        </aside>
        )}
      </main>

      <section className="mx-auto mt-16 max-w-6xl rounded-3xl border border-slate-200 bg-slate-50 px-6 py-10 text-slate-900 shadow-inner">
        <p className="text-sm uppercase tracking-[0.4em] text-orange-600">Kulitmu Framework</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Dibangun di atas kepercayaan diri, bukan ketakutan.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Algoritma Certainty Factor",
              body: "Mengukur keyakinan berdasarkan variasi intensitas gejala agar rekomendasi terasa personal.",
            },
            {
              title: "Insight storytelling",
              body: "Meniru pengalaman 16personalities dengan narasi penuh warna, bukan sekadar angka kering.",
            },
            {
              title: "Ritual praktis",
              body: "Setiap profil dibekali ritual harian, kandungan favorit, dan suara afimasi yang lembut.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl bg-white border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
