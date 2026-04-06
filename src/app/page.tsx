"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ClipboardList,
  Stethoscope,
  Pill,
  TrendingUp,
  Star,
  Shield,
  Truck,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { TESTIMONIALS, HOW_IT_WORKS, STATS, FAQ } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <TrustBar />
      <HowItWorksSection />
      <VerticalsSection />
      <ResultsSection />
      <TestimonialsSection />
      <PricingPreview />
      <FAQSection />
      <FinalCTA />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center grain">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-warm/60 via-brand-light to-brand-light" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-brand-glow/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              AI-Powered Telehealth Platform
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark leading-[1.1] mb-6 animate-fade-up">
              Your hair & skin
              <br />
              deserve a{" "}
              <span className="text-brand-green relative">
                real doctor
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <path
                    d="M1 5.5C47 2 153 2 199 5.5"
                    stroke="#D4A853"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="font-body text-lg text-brand-muted leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Consult licensed dermatologists online. Get personalised
              prescriptions. Medications delivered to your door. All starting at
              just ₹999/month.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center gap-2 bg-brand-green text-white px-8 py-4 rounded-full font-body font-medium text-base hover:bg-brand-green-light transition-all hover:shadow-xl hover:shadow-brand-green/20 hover:-translate-y-0.5"
              >
                Start Free Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-dark px-8 py-4 rounded-full font-body font-medium text-base border border-brand-border hover:border-brand-green/30 transition-all"
              >
                View Plans
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-green-light to-brand-glow border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-brand-gold text-brand-gold"
                    />
                  ))}
                </div>
                <p className="text-xs text-brand-muted mt-0.5">
                  Trusted by 50,000+ patients across India
                </p>
              </div>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main card */}
              <div className="absolute inset-8 bg-white rounded-3xl shadow-2xl shadow-brand-green/10 border border-brand-border/50 overflow-hidden">
                <div className="h-full bg-gradient-to-br from-brand-warm/30 to-white p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-4">
                      <Stethoscope className="w-6 h-6 text-brand-green" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-brand-dark mb-2">
                      Your Treatment Plan
                    </h3>
                    <p className="text-sm text-brand-muted">
                      Prescribed by Dr. Meera Sharma
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Minoxidil 5% (Topical)",
                      "Finasteride 1mg (Oral)",
                      "Biotin Supplement",
                    ].map((med, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-brand-light rounded-xl p-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-brand-glow flex-shrink-0" />
                        <span className="text-sm font-medium text-brand-dark">
                          {med}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating card - Progress */}
              <div className="absolute -top-2 -right-4 bg-white rounded-2xl shadow-lg border border-brand-border/50 p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-glow/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-brand-glow" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-muted">Progress</p>
                    <p className="text-sm font-bold text-brand-dark">
                      +73% growth
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating card - Delivery */}
              <div className="absolute -bottom-2 -left-4 bg-white rounded-2xl shadow-lg border border-brand-border/50 p-4 animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-muted">Next delivery</p>
                    <p className="text-sm font-bold text-brand-dark">
                      In 2 days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-y border-brand-border/50 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-2xl md:text-3xl font-bold text-brand-green">
                {stat.value}
              </p>
              <p className="text-sm text-brand-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const icons = [ClipboardList, Stethoscope, Pill, TrendingUp];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            How Sukhya works
          </h2>
          <p className="text-brand-muted max-w-2xl mx-auto">
            From assessment to treatment in under 48 hours. No clinic visits, no
            waiting rooms — just results.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="relative group">
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-brand-border" />
                )}
                <div className="relative bg-white rounded-2xl p-6 border border-brand-border/50 hover:border-brand-green/20 hover:shadow-lg hover:shadow-brand-green/5 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5 text-brand-green group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-display text-3xl font-bold text-brand-border group-hover:text-brand-green/20 transition-colors">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-brand-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {step.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-green bg-brand-green/5 px-3 py-1 rounded-full">
                    ⏱ {step.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VerticalsSection() {
  const verticals = [
    {
      title: "Hair Regrowth",
      description:
        "Clinically-proven Minoxidil & Finasteride treatments prescribed by specialists. 94% of patients see results in 90 days.",
      features: [
        "FDA-approved medications",
        "AI progress tracking",
        "Monthly doctor check-ins",
      ],
      href: "/assessment/hair",
      available: true,
      badge: "Most Popular",
      gradient: "from-brand-green/5 to-brand-glow/5",
    },
    {
      title: "Skin & Dermatology",
      description:
        "Custom prescriptions for acne, pigmentation, and anti-aging. Tretinoin, Adapalene, and more — from real dermatologists.",
      features: [
        "Custom skincare prescriptions",
        "Dermatologist consultations",
        "Before/after analysis",
      ],
      href: "/assessment/skin",
      available: true,
      badge: "New",
      gradient: "from-brand-green-light/5 to-brand-glow/5",
    },
    {
      title: "Weight Management",
      description:
        "Doctor-guided weight loss programs with evidence-based treatments and nutritionist support.",
      features: [
        "Prescription treatments",
        "Nutrition coaching",
        "Weekly accountability",
      ],
      href: "#",
      available: false,
      badge: "Coming Q3 2026",
      gradient: "from-brand-gold/5 to-brand-warm/30",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            What we treat
          </h2>
          <p className="text-brand-muted max-w-2xl mx-auto">
            Evidence-based treatments prescribed by licensed specialists,
            delivered to your door.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {verticals.map((v, i) => (
            <div
              key={i}
              className={`relative bg-gradient-to-br ${v.gradient} rounded-3xl p-8 border border-brand-border/50 ${v.available ? "hover:border-brand-green/30 hover:shadow-xl hover:shadow-brand-green/5 hover:-translate-y-1" : "opacity-75"} transition-all duration-300`}
            >
              <div className="inline-flex items-center gap-1 bg-white text-xs font-medium px-3 py-1 rounded-full mb-6 text-brand-green border border-brand-border/50">
                {v.badge}
              </div>
              <h3 className="font-display text-2xl font-bold text-brand-dark mb-3">
                {v.title}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed mb-6">
                {v.description}
              </p>
              <ul className="space-y-2 mb-8">
                {v.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-brand-dark">
                    <CheckCircle2 className="w-4 h-4 text-brand-glow flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              {v.available ? (
                <Link
                  href={v.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-green hover:gap-3 transition-all"
                >
                  Start assessment <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <p className="text-sm text-brand-muted">
                  Join the waitlist →
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden grain">
      <div className="absolute inset-0 bg-brand-green" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-glow/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              Real treatments.
              <br />
              Real results.
            </h2>
            <p className="text-brand-glow/80 text-lg leading-relaxed mb-8">
              Our doctors prescribe FDA-approved medications backed by decades of
              clinical research. No gimmicks, no miracle cures — just medicine
              that works.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Average hair count increase", value: "23%" },
                { label: "Patients see visible results", value: "94%" },
                { label: "Would recommend to a friend", value: "97%" },
                { label: "Average time to first results", value: "90 days" },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <p className="font-display text-2xl font-bold text-white">
                    {s.value}
                  </p>
                  <p className="text-sm text-brand-glow/70 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <p className="text-sm text-brand-glow/70 mb-2">
                  Before & After — 6 months
                </p>
                <h3 className="font-display text-xl font-semibold text-white">
                  Hair Regrowth Treatment
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <div className="text-center">
                    <p className="text-4xl mb-2">📷</p>
                    <p className="text-xs text-white/50">Before</p>
                    <p className="text-xs text-white/30">Month 0</p>
                  </div>
                </div>
                <div className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <div className="text-center">
                    <p className="text-4xl mb-2">📷</p>
                    <p className="text-xs text-white/50">After</p>
                    <p className="text-xs text-white/30">Month 6</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/40 text-center mt-4">
                Individual results may vary. Photos from real Sukhya patients
                with consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            What our patients say
          </h2>
          <p className="text-brand-muted">
            Real stories from real people on their wellness journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-brand-border/50 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>
              <p className="text-sm text-brand-dark leading-relaxed mb-6">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-dark">
                    {t.name}
                  </p>
                  <p className="text-xs text-brand-muted">
                    {t.age}, {t.city}
                  </p>
                </div>
                <span className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded-full">
                  {t.months} months
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-brand-muted text-center mt-8">
          * Individual results may vary. Testimonials represent individual
          experiences and are not guaranteed outcomes.
        </p>
      </div>
    </section>
  );
}

function PricingPreview() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-brand-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-brand-muted max-w-xl mx-auto">
            Everything you need for your treatment journey. No hidden fees, no
            surprise charges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Starter */}
          <div className="bg-white rounded-3xl p-8 border border-brand-border/50 hover:shadow-lg transition-shadow">
            <h3 className="font-display text-xl font-semibold text-brand-dark mb-2">
              Starter
            </h3>
            <p className="text-sm text-brand-muted mb-6">
              Everything you need to get started
            </p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-display text-4xl font-bold text-brand-dark">
                ₹999
              </span>
              <span className="text-brand-muted">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Doctor consultation",
                "Personalized treatment plan",
                "FDA-approved medications",
                "Free shipping",
                "WhatsApp support",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-brand-dark">
                  <CheckCircle2 className="w-4 h-4 text-brand-glow flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/assessment"
              className="block text-center bg-white text-brand-green border-2 border-brand-green px-6 py-3 rounded-full font-medium text-sm hover:bg-brand-green hover:text-white transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Complete */}
          <div className="relative bg-brand-green rounded-3xl p-8 text-white hover:shadow-xl hover:shadow-brand-green/20 transition-shadow">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-dark text-xs font-bold px-4 py-1 rounded-full">
              MOST POPULAR
            </div>
            <h3 className="font-display text-xl font-semibold text-white mb-2">
              Complete
            </h3>
            <p className="text-sm text-brand-glow/70 mb-6">
              Maximum results, guaranteed
            </p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-display text-4xl font-bold text-white">
                ₹1,499
              </span>
              <span className="text-brand-glow/70">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Everything in Starter",
                "Advanced prescriptions",
                "AI photo progress analysis",
                "Nutrition plan",
                "Video consultations",
                "90-day money-back guarantee",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/assessment"
              className="block text-center bg-white text-brand-green px-6 py-3 rounded-full font-medium text-sm hover:bg-brand-gold hover:text-brand-dark transition-all"
            >
              Get Complete Plan
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {[
            { icon: Shield, text: "90-day guarantee" },
            { icon: Truck, text: "Free shipping" },
            { icon: MessageCircle, text: "24/7 WhatsApp support" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-brand-muted">
              <item.icon className="w-4 h-4 text-brand-green" />
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-brand-border/50 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-body font-medium text-brand-dark pr-4">
                  {faq.q}
                </span>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-brand-muted flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-brand-muted flex-shrink-0" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 animate-fade-in">
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden grain">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-green to-brand-green-light" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-glow/20 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to start your
          <br />
          wellness journey?
        </h2>
        <p className="text-lg text-brand-glow/80 mb-8 max-w-xl mx-auto">
          Take our free 2-minute assessment. A licensed doctor will review your
          case within 48 hours.
        </p>
        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 bg-white text-brand-green px-10 py-4 rounded-full font-body font-semibold text-lg hover:bg-brand-gold hover:text-brand-dark transition-all hover:shadow-xl hover:-translate-y-0.5"
        >
          Start Free Assessment
          <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="text-sm text-white/50 mt-6">
          No payment required. Free consultation with every plan.
        </p>
      </div>
    </section>
  );
}
