"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowLeft, Loader2, Shield } from "lucide-react";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 text-brand-green animate-spin" /></div>}>
      <SignupContent />
    </Suspense>
  );
}

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const vertical = searchParams.get("vertical");

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    city: "",
    state: "",
    pincode: "",
    otp: ["", "", "", "", "", ""],
  });
  const [error, setError] = useState("");

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...form.otp];
    newOtp[index] = value;
    setForm((prev) => ({ ...prev, otp: newOtp }));
    if (value && index < 5) {
      document.getElementById(`signup-otp-${index + 1}`)?.focus();
    }
  };

  const handleStep1 = async () => {
    if (!form.full_name || !form.phone || form.phone.length < 10) {
      setError("Please fill in your name and phone number");
      return;
    }
    setLoading(true);
    setError("");
    // Send OTP
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleStep2 = async () => {
    if (form.otp.join("").length < 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1000);
  };

  const handleStep3 = async () => {
    setLoading(true);
    setError("");
    // TODO: Create user in Supabase
    setTimeout(() => {
      setLoading(false);
      if (plan && vertical) {
        router.push(`/checkout?plan=${plan}&vertical=${vertical}`);
      } else {
        router.push("/dashboard");
      }
    }, 1000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1">
            <span className="font-display text-3xl font-bold text-brand-dark">Sukhya</span>
            <span className="text-brand-gold text-3xl">.</span>
          </Link>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s <= step ? "bg-brand-green w-12" : "bg-brand-border w-8"
              }`}
            />
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-brand-border/50 shadow-lg p-8">
          {step === 1 && (
            <div className="animate-fade-up">
              <h1 className="font-display text-2xl font-bold text-brand-dark mb-2 text-center">
                Create your account
              </h1>
              <p className="text-sm text-brand-muted text-center mb-8">
                Join 50,000+ patients on their wellness journey
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={form.full_name}
                    onChange={(e) => update("full_name", e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">Phone Number</label>
                  <div className="flex">
                    <div className="flex items-center gap-1 px-4 bg-brand-warm/50 border border-r-0 border-brand-border rounded-l-xl text-sm text-brand-dark">
                      🇮🇳 +91
                    </div>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="Enter mobile number"
                      className="flex-1 px-4 py-3 border border-brand-border rounded-r-xl outline-none focus:border-brand-green text-sm transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">Email (Optional)</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors"
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                  onClick={handleStep1}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-brand-green text-white py-3.5 rounded-full font-medium text-sm hover:bg-brand-green-light transition-all"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-up">
              <h1 className="font-display text-2xl font-bold text-brand-dark mb-2 text-center">Verify your phone</h1>
              <p className="text-sm text-brand-muted text-center mb-8">Enter the code sent to +91 {form.phone}</p>
              <div className="space-y-6">
                <div className="flex gap-3 justify-center">
                  {form.otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`signup-otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-brand-border rounded-xl outline-none focus:border-brand-green text-brand-dark transition-colors"
                    />
                  ))}
                </div>
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                <button onClick={handleStep2} disabled={loading} className="w-full flex items-center justify-center gap-2 bg-brand-green text-white py-3.5 rounded-full font-medium text-sm hover:bg-brand-green-light transition-all">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
                </button>
                <button onClick={() => setStep(1)} className="w-full text-center text-sm text-brand-muted hover:text-brand-green">
                  <ArrowLeft className="w-3 h-3 inline mr-1" /> Change number
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-up">
              <h1 className="font-display text-2xl font-bold text-brand-dark mb-2 text-center">Almost there!</h1>
              <p className="text-sm text-brand-muted text-center mb-8">Help us personalise your experience</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1.5">Age</label>
                    <input type="number" value={form.age} onChange={(e) => update("age", e.target.value)} placeholder="25" className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1.5">Gender</label>
                    <select value={form.gender} onChange={(e) => update("gender", e.target.value)} className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors bg-white">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">City</label>
                  <input type="text" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Mumbai" className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1.5">State</label>
                    <input type="text" value={form.state} onChange={(e) => update("state", e.target.value)} placeholder="Maharashtra" className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1.5">Pincode</label>
                    <input type="text" value={form.pincode} onChange={(e) => update("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="400001" className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
                  </div>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button onClick={handleStep3} disabled={loading} className="w-full flex items-center justify-center gap-2 bg-brand-green text-white py-3.5 rounded-full font-medium text-sm hover:bg-brand-green-light transition-all">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Complete Signup <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-brand-muted">
          <Shield className="w-3 h-3" />
          <span>Your information is encrypted and secure</span>
        </div>

        <p className="text-center mt-4">
          <span className="text-sm text-brand-muted">Already have an account? </span>
          <Link href="/auth/login" className="text-sm text-brand-green font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </section>
  );
}
