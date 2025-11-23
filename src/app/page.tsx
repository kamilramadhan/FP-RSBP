"use client";

import { useMemo, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultPanel } from "@/components/ResultPanel";
import { symptoms, skinProfiles } from "@/lib/knowledgeBase";
import type { AnswerSheet, Diagnosis } from "@/lib/cf";

export default function Home() {
  const [answers, setAnswers] = useState<AnswerSheet>({});
  const [result, setResult] = useState<Diagnosis | null>(null);
  const [ranking, setRanking] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const answeredCount = Object.keys(answers).length;
  const progress = useMemo(() => (answeredCount / symptoms.length) * 100, [answeredCount]);

  const handleSelect = (symptomId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [symptomId]: value }));
  };

  const handleReset = () => {
    setAnswers({});
    setResult(null);
    setRanking([]);
    setError(null);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pb-16 text-slate-900">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-[480px] max-w-5xl blur-3xl">
          <div className="h-full w-full bg-gradient-to-br from-emerald-400/60 via-cyan-300/40 to-indigo-400/50 opacity-50" />
        </div>
        <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-12 pt-16 md:flex-row md:items-center">
          <div className="flex-1 space-y-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-emerald-200">Kulitmu</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Sistem Pakar untuk membaca bahasa kulit wajahmu dengan Certainty Factor.
            </h1>
            <p className="text-base text-slate-200 md:text-lg">
              Terinspirasi dari pengalaman playground 16personalities: interaktif, emosional, dan penuh cerita
              visual. Jawab pertanyaan singkat lalu dapatkan profil kulit beserta ritual yang cocok.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={submit}
                disabled={loading}
                className="rounded-full bg-emerald-400/90 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Jalankan Analisis
              </button>
              <button
                onClick={handleReset}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Reset jawaban
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-200/80">
              <div>
                <p className="text-3xl font-bold text-white">{Math.round(progress)}%</p>
                <p>Selesai menjawab {answeredCount}/{symptoms.length} pertanyaan</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{skinProfiles.length}</p>
                <p>Profil Kulit referensi Kulitmu</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <ResultPanel diagnosis={result} loading={loading} />
          </div>
        </section>
      </div>

      <main className="mx-auto mt-2 flex max-w-6xl flex-col gap-10 px-4 md:flex-row">
        <div className="flex-1 space-y-6">
          {symptoms.map((symptom) => (
            <QuestionCard
              key={symptom.id}
              symptom={symptom}
              value={answers[symptom.id]}
              onSelect={(value) => handleSelect(symptom.id, value)}
            />
          ))}
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={submit}
              disabled={loading}
              className="flex-1 rounded-2xl bg-emerald-500/90 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Proses Jawaban
            </button>
            <button
              onClick={handleReset}
              className="flex-1 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 text-base font-semibold text-slate-700 transition hover:border-slate-400"
            >
              Hapus Jawaban
            </button>
          </div>
        </div>
        <aside className="w-full max-w-xl space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">Insight tambahan</p>
            <p className="mt-2 text-base text-slate-600">
              Kulit jarang berdiri di satu spektrum. Kami menampilkan 3 kemungkinan lain agar kamu bisa memantau
              perubahan harian.
            </p>
          </div>
          {secondaryProfiles.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 p-6 text-sm text-slate-500">
              Insight akan tampil setelah analisis pertama selesai.
            </div>
          ) : (
            <div className="space-y-4">
              {secondaryProfiles.map((item) => (
                <div
                  key={item.profile.id}
                  className="rounded-3xl border border-slate-100 bg-gradient-to-r from-white via-white/80 to-slate-50 p-5 shadow"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{item.label}</p>
                  <h4 className="text-xl font-semibold text-slate-900">{item.profile.name}</h4>
                  <p className="mt-2 text-sm text-slate-600">{item.profile.highlight}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                    {item.profile.ingredientFocus.map((ingredient) => (
                      <span key={ingredient} className="rounded-full bg-white/80 px-3 py-1 shadow">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 h-1.5 rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-emerald-400"
                      style={{ width: `${Math.round(item.confidence * 100)}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Keyakinan {Math.round(item.confidence * 100)}%
                  </p>
                </div>
              ))}
            </div>
          )}
        </aside>
      </main>

      <section className="mx-auto mt-16 max-w-6xl rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-white shadow-inner">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-200">Kulitmu Framework</p>
        <h2 className="mt-3 text-3xl font-semibold">Dibangun di atas kepercayaan diri, bukan ketakutan.</h2>
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
            <div key={item.title} className="rounded-3xl bg-white/10 p-6">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-100/90">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
