"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Shield, Truck, MessageCircle, ArrowRight } from "lucide-react";
import { PRICING } from "@/lib/constants";
import type { Vertical } from "@/lib/types";

export default function PricingPage() {
  const [vertical, setVertical] = useState<Vertical>("hair");

  const plans = PRICING.filter((p) => p.vertical === vertical);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-brand-dark mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-brand-muted max-w-xl mx-auto text-lg">
            Everything included. Doctor consultation, prescription, medications
            guidance, and ongoing support.
          </p>
        </div>

        {/* Vertical toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1 border border-brand-border/50">
            {(["hair", "skin"] as Vertical[]).map((v) => (
              <button
                key={v}
                onClick={() => setVertical(v)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  vertical === v
                    ? "bg-brand-green text-white"
                    : "text-brand-muted hover:text-brand-dark"
                }`}
              >
                {v === "hair" ? "Hair Regrowth" : "Skin Care"}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-8 ${
                plan.highlighted
                  ? "bg-brand-green text-white shadow-xl shadow-brand-green/20"
                  : "bg-white border border-brand-border/50 shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-dark text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className={`font-display text-xl font-semibold mb-2 ${plan.highlighted ? "text-white" : "text-brand-dark"}`}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`font-display text-4xl font-bold ${plan.highlighted ? "text-white" : "text-brand-dark"}`}>
                  ₹{plan.price}
                </span>
                <span className={plan.highlighted ? "text-brand-glow/70" : "text-brand-muted"}>/month</span>
                {plan.originalPrice && (
                  <span className={`text-sm line-through ml-2 ${plan.highlighted ? "text-white/40" : "text-brand-muted"}`}>
                    ₹{plan.originalPrice}
                  </span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className={`flex items-center gap-2 text-sm ${plan.highlighted ? "text-white/90" : "text-brand-dark"}`}>
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? "text-brand-gold" : "text-brand-glow"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/assessment/${vertical}`}
                className={`block text-center py-3.5 rounded-full font-medium transition-all ${
                  plan.highlighted
                    ? "bg-white text-brand-green hover:bg-brand-gold hover:text-brand-dark"
                    : "bg-brand-green text-white hover:bg-brand-green-light"
                }`}
              >
                Get Started <ArrowRight className="w-4 h-4 inline ml-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {[
            { icon: Shield, text: "90-day money-back guarantee" },
            { icon: Truck, text: "Free shipping across India" },
            { icon: MessageCircle, text: "24/7 WhatsApp support" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-brand-muted">
              <item.icon className="w-5 h-5 text-brand-green" />
              {item.text}
            </div>
          ))}
        </div>

        {/* What's included */}
        <div className="bg-white rounded-3xl border border-brand-border/50 p-8 md:p-12">
          <h2 className="font-display text-2xl font-bold text-brand-dark mb-8 text-center">
            What&apos;s included in every plan
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Licensed Doctor", desc: "Verified dermatologist reviews your case personally" },
              { title: "E-Prescription", desc: "Signed digital prescription you can use at any pharmacy" },
              { title: "Treatment Plan", desc: "Personalised treatment plan based on your assessment" },
              { title: "WhatsApp Support", desc: "Chat with our support team anytime you need help" },
              { title: "Monthly Check-ins", desc: "Regular follow-ups to track progress and adjust treatment" },
              { title: "Pharmacy Comparison", desc: "Compare prices across 5+ pharmacies for best deals" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-glow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-brand-dark">{item.title}</p>
                  <p className="text-xs text-brand-muted mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
