"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Upload,
  Loader2,
  Shield,
  Stethoscope,
  Users,
  CheckCircle2,
  FileText,
  AlertCircle,
} from "lucide-react";

export default function DoctorsPage() {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero for doctors */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Stethoscope className="w-4 h-4" />
            For Medical Professionals
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-brand-dark mb-4">
            Join India&apos;s leading
            <br />
            telehealth platform
          </h1>
          <p className="text-brand-muted max-w-2xl mx-auto text-lg">
            Partner with Sukhya to provide consultations online, on your
            schedule. We handle everything else — patient acquisition, tech,
            payments, and pharmacy coordination.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Users,
              title: "Steady Patient Flow",
              description:
                "We bring you patients. No marketing, no clinic overhead. Focus purely on practising medicine.",
            },
            {
              icon: Shield,
              title: "Full Compliance",
              description:
                "Our platform follows Telemedicine Practice Guidelines (2020) and Indian Medical Council regulations.",
            },
            {
              icon: FileText,
              title: "Easy E-Prescriptions",
              description:
                "Write prescriptions digitally with our built-in tool. Auto-signed with your registration details.",
            },
          ].map((benefit, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-brand-border/50 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="font-display text-lg font-semibold text-brand-dark mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-brand-muted">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        {!showRegistration ? (
          <div className="text-center">
            <button
              onClick={() => setShowRegistration(true)}
              className="inline-flex items-center gap-2 bg-brand-green text-white px-8 py-4 rounded-full font-medium hover:bg-brand-green-light transition-all hover:shadow-lg"
            >
              Register as a Doctor <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <DoctorRegistrationForm />
        )}
      </div>
    </section>
  );
}

function DoctorRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    specialization: "",
    license_number: "",
    medical_council: "",
    experience_years: "",
    bio: "",
  });
  const [files, setFiles] = useState<{
    license_doc?: File;
    degree_cert?: File;
    photo?: File;
    signature?: File;
  }>({});

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async () => {
    if (!form.full_name || !form.license_number || !form.phone || !form.specialization) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!files.license_doc || !files.degree_cert || !files.signature) {
      alert("Please upload all required documents.");
      return;
    }
    setLoading(true);
    // TODO: Upload to Supabase
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl border border-brand-border/50 shadow-lg p-8 text-center animate-fade-up">
        <CheckCircle2 className="w-16 h-16 text-brand-glow mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold text-brand-dark mb-2">
          Registration Submitted!
        </h2>
        <p className="text-brand-muted mb-6">
          Thank you, Dr. {form.full_name.split(" ").pop()}. Our team will verify
          your credentials within 48 hours. You&apos;ll receive a confirmation via
          WhatsApp and email once approved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand-green font-medium hover:underline"
        >
          Back to home <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-brand-border/50 shadow-lg p-8 animate-fade-up">
      <h2 className="font-display text-2xl font-bold text-brand-dark mb-2 text-center">
        Doctor Registration
      </h2>
      <p className="text-sm text-brand-muted text-center mb-8">
        All fields marked with * are required
      </p>

      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Full Name *</label>
            <input type="text" value={form.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="Dr. Full Name" className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Phone *</label>
            <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1.5">Email *</label>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="doctor@email.com" className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Specialization *</label>
            <select value={form.specialization} onChange={(e) => update("specialization", e.target.value)} className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors bg-white">
              <option value="">Select</option>
              <option value="dermatology">Dermatology</option>
              <option value="trichology">Trichology</option>
              <option value="endocrinology">Endocrinology</option>
              <option value="general_medicine">General Medicine</option>
              <option value="nutrition">Clinical Nutrition</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Experience (years)</label>
            <input type="number" value={form.experience_years} onChange={(e) => update("experience_years", e.target.value)} placeholder="5" className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Medical License Number *</label>
            <input type="text" value={form.license_number} onChange={(e) => update("license_number", e.target.value)} placeholder="MCI-XXXXX" className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1.5">Medical Council *</label>
            <input type="text" value={form.medical_council} onChange={(e) => update("medical_council", e.target.value)} placeholder="Maharashtra Medical Council" className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1.5">Short Bio</label>
          <textarea value={form.bio} onChange={(e) => update("bio", e.target.value)} rows={3} placeholder="Brief professional bio..." className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors resize-none" />
        </div>

        {/* File uploads */}
        <div className="border-t border-brand-border/50 pt-5">
          <h3 className="text-sm font-medium text-brand-dark mb-4">
            Required Documents
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { key: "license_doc", label: "Medical License Certificate *", accept: ".pdf,.jpg,.png" },
              { key: "degree_cert", label: "Degree Certificate (MBBS/MD) *", accept: ".pdf,.jpg,.png" },
              { key: "photo", label: "Profile Photo", accept: ".jpg,.png" },
              { key: "signature", label: "Signature Image *", accept: ".jpg,.png" },
            ].map((doc) => (
              <div key={doc.key}>
                <label className="block text-xs font-medium text-brand-dark mb-1.5">{doc.label}</label>
                <label className="flex items-center gap-2 px-4 py-3 border border-brand-border rounded-xl cursor-pointer hover:border-brand-green/30 transition-colors">
                  <Upload className="w-4 h-4 text-brand-muted" />
                  <span className="text-xs text-brand-muted truncate">
                    {files[doc.key as keyof typeof files]?.name || "Choose file"}
                  </span>
                  <input type="file" accept={doc.accept} className="hidden" onChange={(e) => handleFileChange(doc.key, e)} />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2 bg-brand-warm/50 rounded-xl p-4">
          <AlertCircle className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
          <p className="text-xs text-brand-muted">
            Your credentials will be verified by our medical team. This process
            typically takes 24-48 hours. You&apos;ll be notified via WhatsApp and
            email upon approval.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-brand-green text-white py-4 rounded-full font-medium hover:bg-brand-green-light transition-all"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
          ) : (
            <>Submit Registration <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
}
