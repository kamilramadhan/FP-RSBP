"use client";

import type { Symptom } from "@/lib/knowledgeBase";

type QuestionCardProps = {
  symptom: Symptom;
  value: number | undefined;
  onSelect: (value: number) => void;
};

export function QuestionCard({ symptom, value, onSelect }: QuestionCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur-md">
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400" />
        {symptom.category}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-slate-900">{symptom.question}</h3>
      <p className="mt-1 text-sm text-slate-500">{symptom.detail}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {symptom.options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                active
                  ? "border-emerald-500 bg-emerald-50/80 text-emerald-900 shadow"
                  : "border-slate-200 bg-white/70 text-slate-600 hover:border-emerald-200"
              }`}
            >
              <p className="font-semibold">{option.label}</p>
              <p className="text-xs text-slate-500">{option.helper}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
