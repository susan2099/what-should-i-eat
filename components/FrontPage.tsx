"use client";

import { useMemo, useState } from "react";

type AnswerKey = "source" | "vibe" | "time" | "budget";

type Question = {
  key: AnswerKey;
  title: string;
  subtitle?: string;
  options: { label: string; value: string }[];
};

export default function Header() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<AnswerKey, string>>({
    source: "",
    vibe: "",
    time: "",
    budget: "",
  });

  const questions: Question[] = useMemo(
    () => [
      {
        key: "source",
        title: "Cook or order?",
        options: [
          { label: "Cook", value: "cook" },
          { label: "Order", value: "order" },
        ],
      },
      {
        key: "vibe",
        title: "What’s the vibe?",
        options: [
          { label: "Healthy", value: "healthy" },
          { label: "Comfort", value: "comfort" },
        ],
      },
      {
        key: "time",
        title: "How much time do you have?",
        options: [
          { label: "Quick", value: "quick" },
          { label: "I have time", value: "time" },
        ],
      },
      {
        key: "budget",
        title: "Budget?",
        options: [
          { label: "Cheap", value: "cheap" },
          { label: "Pricier", value: "treat" },
        ],
      },
    ],
    []
  );

  const current = questions[step];
  const isLast = step === questions.length - 1;

  function choose(value: string) {
    setAnswers((prev) => ({ ...prev, [current.key]: value }));

    if (!isLast) {
      setStep((s) => s + 1);
    } else {
    }
  }

  function reset() {
    setStarted(false);
    setStep(0);
    setAnswers({ source: "", vibe: "", time: "", budget: "" });
  }

  return (
    <header className="flex min-h-screen items-center justify-center">
      {!started ? (
        // Landing bubble
        <button
          onClick={() => setStarted(true)}
          className="
            px-12 py-6 rounded-full
            bg-white/15 text-white text-2xl font-semibold
            shadow-[0_20px_50px_rgba(0,0,0,0.6)]
            animate-[float_4s_ease-in-out_infinite]
            transition hover:scale-105 active:scale-100
          "
        >
          What Should I Eat?
        </button>
      ) : (
        // Questions card
        <div className="w-full max-w-md rounded-3xl bg-white/15 border border-white/20 p-6 text-white shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-white/70">
                Question {step + 1} of {questions.length}
              </p>
              <h2 className="mt-1 text-2xl font-semibold">{current.title}</h2>
              {current.subtitle ? (
                <p className="mt-1 text-sm text-white/80">{current.subtitle}</p>
              ) : null}
            </div>

            <button
              onClick={reset}
              className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
            >
              Restart
            </button>
          </div>

          <div className="mt-6 flex gap-4">
            {current.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => choose(opt.value)}
                className="
                  flex-1 rounded-2xl bg-blue-300 text-blue-950
                  py-4 text-lg font-semibold
                  hover:bg-blue-200 transition
                "
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Summary once finished */}
          {isLast && answers.budget ? (
            <div className="mt-6 rounded-2xl bg-black/20 p-4">
              <button
                className="w-full rounded-2xl bg-white text-blue-950 py-3 font-semibold hover:bg-blue-50 transition"
                onClick={() => alert("Next: route to /swipe with these answers")}
              >
                Start recommendations →
              </button>
            </div>
          ) : null}
        </div>
      )}
    </header>
  );
}