"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Shield,
  User,
  Sparkles,
  Loader2,
} from "lucide-react";
import type { AIAnalysis } from "@/lib/types";
import { VERTICALS, PRICING } from "@/lib/constants";

interface AssessmentResult {
  vertical: string;
  responses: Record<string, string>;
  analysis: AIAnalysis;
  assessmentId?: string;
}

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("assessmentResult");
    if (stored) {
      setResult(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-green animate-spin" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-brand-gold mx-auto mb-4" />
          <h2 className="font-display text-xl font-semibold text-brand-dark mb-2">
            No assessment found
          </h2>
          <p className="text-brand-muted mb-6">
            Please complete an assessment first to see your results.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-full font-medium hover:bg-brand-green-light transition-colors"
          >
            Take Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const { analysis, vertical } = result;
  const verticalInfo = VERTICALS[vertical as keyof typeof VERTICALS];
  const plans = PRICING.filter((p) => p.vertical === vertical);

  const severityColor = {
    mild: "text-brand-glow",
    moderate: "text-brand-gold",
    severe: "text-red-500",
  }[analysis.severity_label];

  const severityBg = {
    mild: "bg-brand-glow/10",
    moderate: "bg-brand-gold/10",
    severe: "bg-red-50",
  }[analysis.severity_label];

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI Assessment Complete
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Your {verticalInfo?.label} Assessment Results
          </h1>
          <p className="text-brand-muted max-w-xl mx-auto">
            Based on your responses, our AI has generated a preliminary
            analysis. A licensed doctor will review this before prescribing.
          </p>
        </div>

        {/* Analysis Card */}
        <div className="bg-white rounded-3xl border border-brand-border/50 shadow-lg overflow-hidden mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {/* Severity header */}
          <div className={`${severityBg} px-8 py-6 border-b border-brand-border/30`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-brand-muted mb-1">
                  Severity Assessment
                </p>
                <p className={`font-display text-2xl font-bold capitalize ${severityColor}`}>
                  {analysis.severity_label}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-brand-muted">Score:</span>
                <span className="font-display text-3xl font-bold text-brand-dark">
                  {analysis.severity_score}
                </span>
                <span className="text-sm text-brand-muted">/10</span>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Summary */}
            <div>
              <h3 className="font-display text-lg font-semibold text-brand-dark mb-3">
                Summary
              </h3>
              <p className="text-brand-muted leading-relaxed">
                {analysis.summary}
              </p>
            </div>

            {/* Key concerns */}
            <div>
              <h3 className="font-display text-lg font-semibold text-brand-dark mb-3">
                Key Concerns Identified
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.key_concerns.map((concern, i) => (
                  <span
                    key={i}
                    className="bg-brand-warm px-4 py-2 rounded-full text-sm text-brand-dark"
                  >
                    {concern}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggested treatments */}
            <div>
              <h3 className="font-display text-lg font-semibold text-brand-dark mb-3">
                Potential Treatment Options
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {analysis.suggested_treatments.map((treatment, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-brand-green/5 rounded-xl p-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0" />
                    <span className="text-sm text-brand-dark">{treatment}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-brand-muted mt-3">
                * Final treatment decisions are made by your assigned physician
                based on clinical judgment.
              </p>
            </div>

            {/* Lifestyle recommendations */}
            <div>
              <h3 className="font-display text-lg font-semibold text-brand-dark mb-3">
                Lifestyle Recommendations
              </h3>
              <ul className="space-y-2">
                {analysis.lifestyle_recommendations.map((rec, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-brand-muted"
                  >
                    <span className="text-brand-glow mt-0.5">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommended Plan */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="font-display text-2xl font-bold text-brand-dark mb-6 text-center">
            Recommended Plan for You
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border-2 transition-all ${
                  plan.plan === analysis.recommended_plan
                    ? "border-brand-green bg-brand-green/5 shadow-lg"
                    : "border-brand-border/50 bg-white"
                }`}
              >
                {plan.plan === analysis.recommended_plan && (
                  <span className="inline-block bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    RECOMMENDED FOR YOU
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-brand-dark mb-1">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-display text-3xl font-bold text-brand-dark">
                    ₹{plan.price}
                  </span>
                  <span className="text-brand-muted">/mo</span>
                  {plan.originalPrice && (
                    <span className="text-sm text-brand-muted line-through ml-2">
                      ₹{plan.originalPrice}
                    </span>
                  )}
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-sm text-brand-dark"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-glow flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/auth/signup?plan=${plan.plan}&vertical=${vertical}`}
                  className={`block text-center py-3 rounded-full font-medium text-sm transition-all ${
                    plan.plan === analysis.recommended_plan
                      ? "bg-brand-green text-white hover:bg-brand-green-light"
                      : "bg-white text-brand-green border-2 border-brand-green hover:bg-brand-green hover:text-white"
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {[
            { icon: Shield, text: "Your data is encrypted & private" },
            { icon: User, text: "Real licensed doctors only" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-brand-muted"
            >
              <item.icon className="w-4 h-4 text-brand-green" />
              {item.text}
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-brand-warm/50 rounded-2xl p-6 border border-brand-border/30">
          <p className="text-xs text-brand-muted leading-relaxed text-center">
            <strong>Medical Disclaimer:</strong> This AI-generated assessment is
            for informational purposes only and does not constitute medical
            advice, diagnosis, or treatment. All treatment plans and
            prescriptions are issued by licensed physicians registered with the
            Indian Medical Council. Individual results may vary. Always consult
            with a qualified healthcare provider regarding any medical
            condition.
          </p>
        </div>
      </div>
    </section>
  );
}
