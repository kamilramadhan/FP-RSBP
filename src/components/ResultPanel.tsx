"use client";

import type { Diagnosis } from "@/lib/cf";

type ResultPanelProps = {
  diagnosis: Diagnosis | null;
  loading: boolean;
};

export function ResultPanel({ diagnosis, loading }: ResultPanelProps) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-white/40 bg-white/70 p-8 text-center shadow-xl backdrop-blur-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Kulitmu</p>
        <p className="mt-4 text-lg font-medium text-slate-600">Sedang melakukan analisis...</p>
        <div className="mt-6 flex justify-center">
          <span className="h-3 w-3 animate-ping rounded-full bg-orange-400" />
        </div>
      </div>
    );
  }

  if (!diagnosis) {
    return (
      <div className="rounded-3xl border border-white/40 bg-white/70 p-8 shadow-xl backdrop-blur-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Kulitmu</p>
        <h3 className="mt-4 text-2xl font-semibold text-slate-900">Mulai dari Dirimu</h3>
        <p className="mt-2 text-sm text-slate-600">
          Jawab minimal satu pertanyaan untuk membuka rekomendasi ritual perawatan personal.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br p-[1px] shadow-2xl backdrop-blur-2xl from-white/80 via-white/30 to-white/10">
      <div className="rounded-[calc(1.5rem-1px)] bg-white/80 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Kulitmu mendiagnosis</p>
        <h3 className="mt-3 text-3xl font-bold text-slate-900">{diagnosis.profile.name}</h3>
        <p className="mt-2 text-sm font-semibold text-orange-600">{diagnosis.label}</p>
        <p className="mt-4 text-base text-slate-600">{diagnosis.profile.summary}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Mantra</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{diagnosis.profile.mantra}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Ritual Inti</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-600">
              {diagnosis.profile.careRitual.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Kandungan Favorit</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {diagnosis.profile.ingredientFocus.map((ingredient) => (
              <span
                key={ingredient}
                className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600 shadow"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
