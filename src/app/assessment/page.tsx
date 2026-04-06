"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { VERTICALS } from "@/lib/constants";

export default function AssessmentPage() {
  const entries = Object.entries(VERTICALS);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            What can we help you with?
          </h1>
          <p className="text-brand-muted max-w-xl mx-auto">
            Choose your concern below. Our AI will guide you through a quick
            assessment, then match you with the right specialist.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {entries.map(([key, vertical]) => (
            <div key={key}>
              {vertical.available ? (
                <Link
                  href={`/assessment/${key}`}
                  className="group block bg-white rounded-2xl p-6 border border-brand-border/50 hover:border-brand-green/30 hover:shadow-xl hover:shadow-brand-green/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{vertical.icon}</span>
                    <ArrowRight className="w-5 h-5 text-brand-muted group-hover:text-brand-green group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-brand-dark mb-2">
                    {vertical.label}
                  </h3>
                  <p className="text-sm text-brand-muted">{vertical.tagline}</p>
                </Link>
              ) : (
                <div className="block bg-white/50 rounded-2xl p-6 border border-brand-border/30 opacity-60 cursor-not-allowed">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl grayscale">{vertical.icon}</span>
                    <Lock className="w-4 h-4 text-brand-muted" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-brand-dark mb-2">
                    {vertical.label}
                  </h3>
                  <p className="text-sm text-brand-muted">
                    {vertical.tagline}
                  </p>
                  <span className="inline-block mt-3 text-xs bg-brand-warm px-3 py-1 rounded-full text-brand-muted">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-brand-muted text-center mt-8 max-w-lg mx-auto">
          This assessment is for informational purposes only. It does not
          constitute medical advice. A licensed physician will review your
          responses and provide personalised recommendations.
        </p>
      </div>
    </section>
  );
}
