"use client";

import Link from "next/link";
import { ArrowLeft, Video, MessageSquare, FileText, Clock, CheckCircle2, User } from "lucide-react";

const MOCK_CONSULTATIONS = [
  {
    id: "CONS-003",
    doctor: "Dr. Meera Sharma",
    specialization: "Dermatologist",
    type: "async",
    status: "completed",
    date: "2026-03-15",
    notes: "Treatment showing positive results. Continuing current regimen. Added Biotin supplement.",
  },
  {
    id: "CONS-002",
    doctor: "Dr. Meera Sharma",
    specialization: "Dermatologist",
    type: "chat",
    status: "completed",
    date: "2026-02-15",
    notes: "Initial side effects subsiding. Adjusting Minoxidil application routine.",
  },
  {
    id: "CONS-001",
    doctor: "Dr. Meera Sharma",
    specialization: "Dermatologist",
    type: "async",
    status: "completed",
    date: "2026-01-15",
    notes: "Initial consultation. Started Minoxidil 5% and Finasteride 1mg. Discussed expectations.",
  },
];

const TYPE_ICONS = { async: FileText, video: Video, chat: MessageSquare };
const STATUS_STYLES: Record<string, string> = {
  completed: "bg-brand-glow/10 text-brand-glow",
  scheduled: "bg-blue-50 text-blue-500",
  pending: "bg-brand-gold/10 text-brand-gold",
};

export default function ConsultationsPage() {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-dark mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-dark">Consultations</h1>
            <p className="text-brand-muted mt-1">Your consultation history with doctors</p>
          </div>
        </div>

        {/* Doctor card */}
        <div className="bg-white rounded-2xl border border-brand-border/50 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center">
              <User className="w-7 h-7 text-brand-green" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-brand-dark">Dr. Meera Sharma</h3>
              <p className="text-sm text-brand-muted">Dermatologist • MCI-98765 • 12 years experience</p>
            </div>
            <button className="bg-brand-green text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-green-light transition-colors hidden sm:block">
              Book Follow-up
            </button>
          </div>
        </div>

        {/* Consultation list */}
        <div className="space-y-4">
          {MOCK_CONSULTATIONS.map((consult) => {
            const TypeIcon = TYPE_ICONS[consult.type as keyof typeof TYPE_ICONS];
            return (
              <div key={consult.id} className="bg-white rounded-2xl border border-brand-border/50 p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center">
                      <TypeIcon className="w-5 h-5 text-brand-green" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-dark">{consult.doctor}</p>
                      <p className="text-xs text-brand-muted">{consult.specialization} • {consult.type === "async" ? "Async Review" : consult.type === "video" ? "Video Call" : "Chat"}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${STATUS_STYLES[consult.status]}`}>
                    {consult.status}
                  </span>
                </div>
                <p className="text-sm text-brand-muted mb-3">{consult.notes}</p>
                <div className="flex items-center gap-2 text-xs text-brand-muted">
                  <Clock className="w-3 h-3" />
                  {new Date(consult.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
