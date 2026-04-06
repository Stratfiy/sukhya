"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Upload,
  TrendingUp,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const MOCK_PROGRESS = [
  {
    month: 1,
    date: "2026-01-15",
    score: 3,
    label: "Baseline",
    observations: ["Initial assessment completed", "Treatment started"],
  },
  {
    month: 2,
    date: "2026-02-15",
    score: 5,
    label: "Slight improvement",
    observations: ["Reduced hair fall noticed", "Scalp health improving"],
  },
  {
    month: 3,
    date: "2026-03-15",
    score: 7,
    label: "Moderate improvement",
    observations: ["New hair growth visible", "Crown area filling in", "Hairline stabilized"],
  },
];

export default function ProgressPage() {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    // TODO: Upload to Supabase Storage + AI analysis
    setTimeout(() => {
      setUploading(false);
      setSelectedFile(null);
      setPreview(null);
      alert("Progress photo uploaded! Your doctor will review it shortly.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-dark mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-dark mb-2">
          Your Progress
        </h1>
        <p className="text-brand-muted mb-8">
          Track your treatment journey with monthly progress photos and AI analysis.
        </p>

        {/* Upload section */}
        <div className="bg-white rounded-2xl border border-brand-border/50 p-6 mb-8">
          <h3 className="font-display text-lg font-semibold text-brand-dark mb-4">
            Upload Progress Photo — Month 4
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="progress-photo"
                className="block border-2 border-dashed border-brand-border rounded-2xl p-8 text-center cursor-pointer hover:border-brand-green/30 transition-colors"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                ) : (
                  <>
                    <Camera className="w-10 h-10 text-brand-muted mx-auto mb-3" />
                    <p className="text-sm font-medium text-brand-dark mb-1">
                      Tap to upload photo
                    </p>
                    <p className="text-xs text-brand-muted">
                      JPG, PNG up to 10MB
                    </p>
                  </>
                )}
                <input
                  id="progress-photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div>
              <h4 className="text-sm font-medium text-brand-dark mb-3">Photo tips:</h4>
              <ul className="space-y-2 text-sm text-brand-muted">
                {[
                  "Use good, natural lighting",
                  "Take photo from the same angle each month",
                  "Include top of head, hairline, and sides",
                  "Keep a neutral background",
                  "Dry hair works best",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-glow flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
              {selectedFile && (
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-brand-green text-white py-3 rounded-full font-medium text-sm hover:bg-brand-green-light transition-all"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" /> Upload & Analyze
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress timeline */}
        <div className="bg-white rounded-2xl border border-brand-border/50 p-6">
          <h3 className="font-display text-lg font-semibold text-brand-dark mb-6">
            Progress Timeline
          </h3>

          {/* Progress bar visual */}
          <div className="flex items-end gap-3 mb-8 h-32">
            {MOCK_PROGRESS.map((entry, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-brand-green to-brand-glow rounded-t-lg transition-all"
                  style={{ height: `${(entry.score / 10) * 100}%` }}
                />
                <span className="text-xs text-brand-muted">M{entry.month}</span>
              </div>
            ))}
            {/* Placeholder for current month */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full h-0 border-2 border-dashed border-brand-border rounded-t-lg flex items-center justify-center" style={{ height: "30%" }}>
                <span className="text-[10px] text-brand-muted">?</span>
              </div>
              <span className="text-xs text-brand-green font-medium">M4</span>
            </div>
          </div>

          {/* Detailed entries */}
          <div className="space-y-4">
            {MOCK_PROGRESS.map((entry, i) => (
              <div key={i} className="flex gap-4 p-4 bg-brand-light rounded-xl">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-brand-green" />
                  </div>
                  {i < MOCK_PROGRESS.length - 1 && (
                    <div className="w-px h-full bg-brand-border mt-2" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-brand-dark">
                      Month {entry.month} — {entry.label}
                    </p>
                    <span className="text-xs text-brand-muted">
                      {new Date(entry.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-2 bg-brand-border/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-glow rounded-full"
                        style={{ width: `${(entry.score / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-brand-dark">{entry.score}/10</span>
                  </div>
                  <ul className="space-y-1">
                    {entry.observations.map((obs, j) => (
                      <li key={j} className="text-xs text-brand-muted flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-brand-glow" />
                        {obs}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
