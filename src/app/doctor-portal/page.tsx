"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Search,
  Pill,
  Loader2,
  Send,
} from "lucide-react";

const MOCK_PATIENTS_QUEUE = [
  {
    id: "p1",
    name: "Arjun Mehta",
    age: 28,
    gender: "Male",
    vertical: "hair",
    severity: "moderate",
    severity_score: 6,
    submitted: "2026-04-05",
    status: "pending",
    summary: "Crown thinning for 2 years, family history on father's side. Tried Minoxidil before. Stress level 4/5.",
    concerns: ["Crown thinning", "Family history", "High stress"],
    suggested: ["Minoxidil 5%", "Finasteride 1mg", "Biotin"],
  },
  {
    id: "p2",
    name: "Rohan Das",
    age: 34,
    gender: "Male",
    vertical: "hair",
    severity: "severe",
    severity_score: 8,
    submitted: "2026-04-05",
    status: "pending",
    summary: "Receding hairline 5+ years. Both parents with hair loss. Previous PRP therapy with limited results.",
    concerns: ["Receding hairline", "Strong family history", "Previous treatment failure"],
    suggested: ["Finasteride 1mg", "Minoxidil 5%", "Ketoconazole shampoo", "Biotin"],
  },
  {
    id: "p3",
    name: "Priya Singh",
    age: 26,
    gender: "Female",
    vertical: "skin",
    severity: "moderate",
    severity_score: 5,
    submitted: "2026-04-04",
    status: "reviewed",
    summary: "Persistent acne for 1 year. Oily skin. Basic skincare routine. No previous prescription treatments.",
    concerns: ["Persistent acne", "Oily skin", "Scarring"],
    suggested: ["Adapalene 0.1%", "Benzoyl Peroxide 2.5%", "Niacinamide serum"],
  },
];

export default function DoctorPortalPage() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [prescriptionMode, setPrescriptionMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "reviewed">("all");

  const filtered = MOCK_PATIENTS_QUEUE.filter((p) => {
    if (filter !== "all" && p.status !== filter) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const selected = MOCK_PATIENTS_QUEUE.find((p) => p.id === selectedPatient);

  return (
    <section className="min-h-screen bg-brand-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-dark">Doctor Portal</h1>
            <p className="text-brand-muted mt-1">Review assessments and write prescriptions</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-brand-muted">Dr. Meera Sharma</span>
            <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-bold text-sm">MS</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Pending Reviews", value: MOCK_PATIENTS_QUEUE.filter((p) => p.status === "pending").length, icon: Clock, color: "text-brand-gold" },
            { label: "Reviewed Today", value: 5, icon: CheckCircle2, color: "text-brand-glow" },
            { label: "Total Patients", value: 142, icon: Users, color: "text-brand-green" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-brand-border/50">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <p className="font-display text-2xl font-bold text-brand-dark">{s.value}</p>
              <p className="text-xs text-brand-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Patient queue */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-brand-border/50 overflow-hidden">
              <div className="p-4 border-b border-brand-border/30">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-brand-border rounded-xl text-sm outline-none focus:border-brand-green transition-colors"
                  />
                </div>
                <div className="flex gap-2">
                  {(["all", "pending", "reviewed"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors capitalize ${
                        filter === f ? "bg-brand-green text-white" : "bg-brand-light text-brand-muted"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                {filtered.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => { setSelectedPatient(patient.id); setPrescriptionMode(false); }}
                    className={`w-full text-left p-4 border-b border-brand-border/20 hover:bg-brand-light/50 transition-colors ${
                      selectedPatient === patient.id ? "bg-brand-green/5 border-l-4 border-l-brand-green" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-brand-dark">{patient.name}</p>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        patient.status === "pending" ? "bg-brand-gold/10 text-brand-gold" : "bg-brand-glow/10 text-brand-glow"
                      }`}>
                        {patient.status}
                      </span>
                    </div>
                    <p className="text-xs text-brand-muted">{patient.age}y, {patient.gender} • {patient.vertical}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        patient.severity === "severe" ? "bg-red-50 text-red-500" :
                        patient.severity === "moderate" ? "bg-brand-gold/10 text-brand-gold" :
                        "bg-brand-glow/10 text-brand-glow"
                      }`}>
                        {patient.severity} ({patient.severity_score}/10)
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Patient detail / Prescription writer */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-white rounded-2xl border border-brand-border/50 p-6">
                {!prescriptionMode ? (
                  <PatientDetail patient={selected} onPrescribe={() => setPrescriptionMode(true)} />
                ) : (
                  <PrescriptionWriter patient={selected} onBack={() => setPrescriptionMode(false)} />
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-brand-border/50 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                <ClipboardList className="w-12 h-12 text-brand-border mb-4" />
                <p className="text-brand-muted">Select a patient to review their assessment</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PatientDetail({ patient, onPrescribe }: { patient: typeof MOCK_PATIENTS_QUEUE[0]; onPrescribe: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl font-bold text-brand-dark">{patient.name}</h2>
          <p className="text-sm text-brand-muted">{patient.age}y, {patient.gender} • {patient.vertical} assessment</p>
        </div>
        <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
          patient.severity === "severe" ? "bg-red-50 text-red-500" : "bg-brand-gold/10 text-brand-gold"
        }`}>
          Severity: {patient.severity_score}/10
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-brand-dark mb-2">AI Assessment Summary</h3>
          <p className="text-sm text-brand-muted bg-brand-light rounded-xl p-4">{patient.summary}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-brand-dark mb-2">Key Concerns</h3>
          <div className="flex flex-wrap gap-2">
            {patient.concerns.map((c, i) => (
              <span key={i} className="bg-brand-warm px-3 py-1.5 rounded-full text-xs text-brand-dark">{c}</span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-brand-dark mb-2">AI Suggested Treatments</h3>
          <div className="space-y-2">
            {patient.suggested.map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-brand-dark bg-brand-green/5 rounded-lg p-3">
                <Pill className="w-4 h-4 text-brand-green" /> {t}
              </div>
            ))}
          </div>
          <p className="text-xs text-brand-muted mt-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> AI suggestions are for reference only. Final decision is yours.
          </p>
        </div>

        <button
          onClick={onPrescribe}
          className="w-full flex items-center justify-center gap-2 bg-brand-green text-white py-3 rounded-full font-medium hover:bg-brand-green-light transition-all"
        >
          <FileText className="w-4 h-4" /> Write Prescription
        </button>
      </div>
    </div>
  );
}

function PrescriptionWriter({ patient, onBack }: { patient: typeof MOCK_PATIENTS_QUEUE[0]; onBack: () => void }) {
  const [medications, setMedications] = useState(
    patient.suggested.map((name) => ({
      name,
      dosage: "",
      frequency: "",
      duration: "3 months",
      instructions: "",
    }))
  );
  const [generalInstructions, setGeneralInstructions] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateMed = (index: number, field: string, value: string) => {
    setMedications((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  };

  const addMedication = () => {
    setMedications((prev) => [...prev, { name: "", dosage: "", frequency: "", duration: "3 months", instructions: "" }]);
  };

  const removeMed = (index: number) => {
    setMedications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-brand-glow mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold text-brand-dark mb-2">Prescription Sent!</h3>
        <p className="text-sm text-brand-muted mb-6">
          {patient.name} will be notified via WhatsApp with their prescription and pharmacy links.
        </p>
        <button onClick={onBack} className="text-brand-green font-medium hover:underline">← Back to queue</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="text-sm text-brand-muted hover:text-brand-dark mb-4 flex items-center gap-1">
        ← Back to assessment
      </button>

      <h2 className="font-display text-xl font-bold text-brand-dark mb-1">
        Prescription for {patient.name}
      </h2>
      <p className="text-sm text-brand-muted mb-6">{patient.age}y, {patient.gender}</p>

      <div className="space-y-4 mb-6">
        {medications.map((med, i) => (
          <div key={i} className="bg-brand-light rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-brand-muted">Medication {i + 1}</span>
              {medications.length > 1 && (
                <button onClick={() => removeMed(i)} className="text-xs text-red-400 hover:text-red-500">Remove</button>
              )}
            </div>
            <input type="text" value={med.name} onChange={(e) => updateMed(i, "name", e.target.value)} placeholder="Medication name" className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm outline-none focus:border-brand-green" />
            <div className="grid grid-cols-3 gap-3">
              <input type="text" value={med.dosage} onChange={(e) => updateMed(i, "dosage", e.target.value)} placeholder="Dosage" className="px-3 py-2 border border-brand-border rounded-lg text-sm outline-none focus:border-brand-green" />
              <input type="text" value={med.frequency} onChange={(e) => updateMed(i, "frequency", e.target.value)} placeholder="Frequency" className="px-3 py-2 border border-brand-border rounded-lg text-sm outline-none focus:border-brand-green" />
              <input type="text" value={med.duration} onChange={(e) => updateMed(i, "duration", e.target.value)} placeholder="Duration" className="px-3 py-2 border border-brand-border rounded-lg text-sm outline-none focus:border-brand-green" />
            </div>
            <input type="text" value={med.instructions} onChange={(e) => updateMed(i, "instructions", e.target.value)} placeholder="Special instructions" className="w-full px-3 py-2 border border-brand-border rounded-lg text-sm outline-none focus:border-brand-green" />
          </div>
        ))}
        <button onClick={addMedication} className="w-full py-2 border-2 border-dashed border-brand-border rounded-xl text-sm text-brand-muted hover:border-brand-green/30 hover:text-brand-green transition-colors">
          + Add Medication
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-brand-dark mb-1.5">General Instructions</label>
        <textarea
          value={generalInstructions}
          onChange={(e) => setGeneralInstructions(e.target.value)}
          rows={3}
          placeholder="Instructions for the patient..."
          className="w-full px-4 py-3 border border-brand-border rounded-xl text-sm outline-none focus:border-brand-green resize-none"
        />
      </div>

      <div className="bg-brand-warm/50 rounded-xl p-4 mb-6 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
        <p className="text-xs text-brand-muted">
          This prescription will be digitally signed with your name, registration number, and timestamp. It will be sent to the patient&apos;s dashboard and via WhatsApp.
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting || medications.some((m) => !m.name)}
        className="w-full flex items-center justify-center gap-2 bg-brand-green text-white py-3.5 rounded-full font-medium hover:bg-brand-green-light transition-all disabled:opacity-50"
      >
        {submitting ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Signing & sending...</>
        ) : (
          <><Send className="w-4 h-4" /> Sign & Send Prescription</>
        )}
      </button>
    </div>
  );
}
