import { NextResponse } from "next/server";
import { diagnose, normalizeAnswers, type AnswerSheet } from "@/lib/cf";
import { symptoms } from "@/lib/knowledgeBase";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { answers?: AnswerSheet } | null;
    if (!payload || typeof payload !== "object" || !payload.answers) {
      return NextResponse.json(
        { error: "Kirimkan jawaban dengan format { answers: { [symptomId]: nilai } }." },
        { status: 400 }
      );
    }

    const normalized = normalizeAnswers(payload.answers);
    const answered = Object.keys(normalized).length;
    if (answered === 0) {
      return NextResponse.json(
        { error: "Isi minimal satu pertanyaan untuk melakukan diagnosis." },
        { status: 400 }
      );
    }

    const result = diagnose(normalized);
    return NextResponse.json({
      ...result,
      meta: {
        answered,
        totalQuestions: symptoms.length,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("diagnose-endpoint", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memproses data. Coba ulang beberapa saat lagi." },
      { status: 500 }
    );
  }
}
