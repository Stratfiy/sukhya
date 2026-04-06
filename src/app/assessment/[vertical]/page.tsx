"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { QUIZ_MAP, VERTICALS } from "@/lib/constants";
import { trackEvent } from "@/lib/posthog";
import type { QuizQuestion } from "@/lib/types";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const vertical = params.vertical as string;
  const verticalInfo = VERTICALS[vertical as keyof typeof VERTICALS];
  const questions = QUIZ_MAP[vertical];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!questions || !verticalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-brand-muted mx-auto mb-4" />
          <h2 className="font-display text-xl font-semibold text-brand-dark mb-2">
            Assessment not available
          </h2>
          <p className="text-brand-muted mb-6">
            This service is coming soon. Check back later!
          </p>
          <button
            onClick={() => router.push("/assessment")}
            className="text-brand-green font-medium hover:underline"
          >
            ← Back to services
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentStep];
  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const currentAnswer = answers[question.id];
  const canProceed =
    !question.required ||
    (currentAnswer &&
      (typeof currentAnswer === "string"
        ? currentAnswer.length > 0
        : currentAnswer.length > 0));

  const handleSingleSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: option }));
  };

  const handleMultiSelect = (option: string) => {
    const current = (answers[question.id] as string[]) || [];
    if (current.includes(option)) {
      setAnswers((prev) => ({
        ...prev,
        [question.id]: current.filter((o) => o !== option),
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [question.id]: [...current, option],
      }));
    }
  };

  const handleTextInput = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vertical,
          responses: answers,
        }),
      });

      if (!response.ok) throw new Error("Failed to analyze assessment");

      const data = await response.json();

      // Store results in sessionStorage for results page
      sessionStorage.setItem(
        "assessmentResult",
        JSON.stringify({
          vertical,
          responses: answers,
          analysis: data.analysis,
          assessmentId: data.assessmentId,
        })
      );

      // Track completion
      trackEvent("assessment_completed", {
        vertical,
        severity_score: data.analysis?.severity_score,
        recommended_plan: data.analysis?.recommended_plan,
      });

      router.push("/assessment/results");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen py-8 md:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={currentStep > 0 ? handleBack : () => router.push("/assessment")}
            className="flex items-center gap-1 text-sm text-brand-muted hover:text-brand-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep > 0 ? "Back" : "Exit"}
          </button>
          <span className="text-sm text-brand-muted">
            {currentStep + 1} of {totalSteps}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-brand-border/50 rounded-full mb-12 overflow-hidden">
          <div
            className="h-full bg-brand-green rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <div className="animate-fade-up" key={currentStep}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark mb-3">
            {question.question}
          </h2>
          {question.helpText && (
            <p className="text-sm text-brand-muted mb-8">{question.helpText}</p>
          )}

          {/* Options */}
          <div className="space-y-3 mt-8">
            {question.type === "single" &&
              question.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSingleSelect(option)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    currentAnswer === option
                      ? "border-brand-green bg-brand-green/5 text-brand-dark"
                      : "border-brand-border/50 bg-white hover:border-brand-green/30 text-brand-dark"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm">{option}</span>
                    {currentAnswer === option && (
                      <CheckCircle2 className="w-5 h-5 text-brand-green" />
                    )}
                  </div>
                </button>
              ))}

            {question.type === "multiple" &&
              question.options?.map((option) => {
                const selected = ((currentAnswer as string[]) || []).includes(
                  option
                );
                return (
                  <button
                    key={option}
                    onClick={() => handleMultiSelect(option)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      selected
                        ? "border-brand-green bg-brand-green/5 text-brand-dark"
                        : "border-brand-border/50 bg-white hover:border-brand-green/30 text-brand-dark"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sm">{option}</span>
                      {selected && (
                        <CheckCircle2 className="w-5 h-5 text-brand-green" />
                      )}
                    </div>
                  </button>
                );
              })}

            {question.type === "scale" && (
              <div className="flex gap-3 justify-center mt-4">
                {question.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSingleSelect(option)}
                    className={`w-14 h-14 rounded-2xl border-2 font-display text-lg font-bold transition-all ${
                      currentAnswer === option
                        ? "border-brand-green bg-brand-green text-white scale-110"
                        : "border-brand-border/50 bg-white hover:border-brand-green/30 text-brand-dark"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {question.type === "text" && (
              <textarea
                value={(currentAnswer as string) || ""}
                onChange={(e) => handleTextInput(e.target.value)}
                placeholder="Type your answer here..."
                rows={3}
                className="w-full p-4 rounded-xl border-2 border-brand-border/50 bg-white focus:border-brand-green focus:ring-0 outline-none text-sm font-body text-brand-dark resize-none transition-colors"
              />
            )}
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Next button */}
          <div className="mt-10">
            <button
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-body font-medium text-base transition-all ${
                canProceed && !isSubmitting
                  ? "bg-brand-green text-white hover:bg-brand-green-light hover:shadow-lg"
                  : "bg-brand-border text-brand-muted cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing your responses...
                </>
              ) : currentStep === totalSteps - 1 ? (
                "Get My Results"
              ) : (
                <>
                  Continue <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {!question.required && question.type === "text" && (
              <button
                onClick={handleNext}
                className="w-full text-center mt-3 text-sm text-brand-muted hover:text-brand-dark transition-colors"
              >
                Skip this question
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
