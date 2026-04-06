"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Pill,
  ShieldCheck,
  Clock,
  User,
  CheckCircle2,
} from "lucide-react";
import { PHARMACY_SOURCES } from "@/lib/constants";

const MOCK_PRESCRIPTION = {
  id: "RX-2026-0001",
  created_at: "2026-03-15",
  doctor: {
    name: "Dr. Meera Sharma",
    specialization: "Dermatologist",
    license: "MCI-98765",
    council: "Maharashtra Medical Council",
  },
  patient: {
    name: "Arjun Mehta",
    age: 28,
    gender: "Male",
    phone: "+91 98765 43210",
  },
  medications: [
    {
      name: "Minoxidil Topical Solution 5%",
      generic: "Minoxidil",
      dosage: "1ml applied to scalp",
      frequency: "Twice daily (morning and night)",
      duration: "3 months",
      instructions: "Apply to dry scalp. Do not wash hair for 4 hours after application.",
      searchTerm: "minoxidil 5%",
    },
    {
      name: "Finasteride 1mg Tablets",
      generic: "Finasteride",
      dosage: "1 tablet",
      frequency: "Once daily",
      duration: "3 months",
      instructions: "Take with or without food at the same time each day.",
      searchTerm: "finasteride 1mg",
    },
    {
      name: "Biotin 10000mcg Tablets",
      generic: "Biotin",
      dosage: "1 tablet",
      frequency: "Once daily with food",
      duration: "3 months",
      instructions: "Take after breakfast.",
      searchTerm: "biotin 10000mcg",
    },
  ],
  instructions:
    "Continue treatment for minimum 3 months for visible results. Do not skip doses. Report any side effects immediately via WhatsApp. Next review appointment in 30 days.",
  is_active: true,
  duration_months: 3,
};

export default function PrescriptionsPage() {
  const [selectedMed, setSelectedMed] = useState<number | null>(null);
  const prescription = MOCK_PRESCRIPTION;

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-dark mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-dark">
              Your Prescriptions
            </h1>
            <p className="text-brand-muted mt-1">
              Prescribed by {prescription.doctor.name}
            </p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-brand-border px-4 py-2 rounded-xl text-sm text-brand-dark hover:border-brand-green/30 transition-colors">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>

        {/* Prescription card */}
        <div className="bg-white rounded-2xl border border-brand-border/50 shadow-sm overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-brand-green/5 px-6 py-4 border-b border-brand-border/30">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-green" />
                <div>
                  <p className="text-sm font-medium text-brand-dark">
                    E-Prescription #{prescription.id}
                  </p>
                  <p className="text-xs text-brand-muted">
                    Issued on {new Date(prescription.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              <span className="text-xs bg-brand-glow/10 text-brand-glow px-3 py-1 rounded-full font-medium">
                Active
              </span>
            </div>
          </div>

          {/* Doctor & Patient */}
          <div className="grid md:grid-cols-2 gap-6 p-6 border-b border-brand-border/30">
            <div>
              <p className="text-xs text-brand-muted uppercase tracking-wider mb-2">Prescribing Doctor</p>
              <p className="text-sm font-medium text-brand-dark">{prescription.doctor.name}</p>
              <p className="text-xs text-brand-muted">{prescription.doctor.specialization}</p>
              <p className="text-xs text-brand-muted">Reg. No: {prescription.doctor.license}</p>
              <p className="text-xs text-brand-muted">{prescription.doctor.council}</p>
            </div>
            <div>
              <p className="text-xs text-brand-muted uppercase tracking-wider mb-2">Patient</p>
              <p className="text-sm font-medium text-brand-dark">{prescription.patient.name}</p>
              <p className="text-xs text-brand-muted">{prescription.patient.age} years, {prescription.patient.gender}</p>
              <p className="text-xs text-brand-muted">{prescription.patient.phone}</p>
            </div>
          </div>

          {/* Medications */}
          <div className="p-6">
            <h3 className="font-display text-lg font-semibold text-brand-dark mb-4">
              Prescribed Medications
            </h3>
            <div className="space-y-4">
              {prescription.medications.map((med, i) => (
                <div key={i} className="border border-brand-border/50 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setSelectedMed(selectedMed === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 hover:bg-brand-light/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center">
                        <Pill className="w-5 h-5 text-brand-green" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-brand-dark">{med.name}</p>
                        <p className="text-xs text-brand-muted">{med.dosage} — {med.frequency}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-brand-green text-white px-3 py-1 rounded-full">
                      Buy Now
                    </span>
                  </button>
                  {selectedMed === i && (
                    <div className="px-4 pb-4 animate-fade-in">
                      <div className="bg-brand-light rounded-xl p-4 mb-4">
                        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                          <div>
                            <p className="text-xs text-brand-muted">Duration</p>
                            <p className="font-medium text-brand-dark">{med.duration}</p>
                          </div>
                          <div>
                            <p className="text-xs text-brand-muted">Generic Name</p>
                            <p className="font-medium text-brand-dark">{med.generic}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-brand-muted">Instructions</p>
                          <p className="text-sm text-brand-dark mt-1">{med.instructions}</p>
                        </div>
                      </div>
                      <p className="text-xs text-brand-muted mb-3 font-medium">
                        Buy from trusted pharmacies:
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {PHARMACY_SOURCES.map((pharmacy, j) => (
                          <a
                            key={j}
                            href={`${pharmacy.searchUrl}${encodeURIComponent(med.searchTerm)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white border border-brand-border rounded-lg p-3 hover:border-brand-green/30 hover:shadow-sm transition-all text-left"
                          >
                            <div className="flex-1">
                              <p className="text-xs font-medium text-brand-dark">{pharmacy.name}</p>
                              <p className="text-[10px] text-brand-glow flex items-center gap-0.5 mt-0.5">
                                Buy now <ExternalLink className="w-2.5 h-2.5" />
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="px-6 pb-6">
            <div className="bg-brand-warm/50 rounded-xl p-4">
              <h4 className="text-sm font-medium text-brand-dark mb-2">General Instructions</h4>
              <p className="text-sm text-brand-muted">{prescription.instructions}</p>
            </div>
          </div>

          {/* Digital signature */}
          <div className="px-6 pb-6 border-t border-brand-border/30 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-brand-muted">Digitally signed by</p>
                <p className="text-sm font-medium text-brand-dark font-display italic">
                  {prescription.doctor.name}
                </p>
                <p className="text-xs text-brand-muted">
                  {new Date(prescription.created_at).toLocaleString("en-IN")} IST
                </p>
              </div>
              <div className="flex items-center gap-2 text-brand-green">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-xs font-medium">Verified</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-brand-muted text-center">
          Prescribed by licensed doctors based on clinical judgment. Sukhya is a
          telehealth platform and does not manufacture or sell medications
          directly.
        </p>
      </div>
    </div>
  );
}
