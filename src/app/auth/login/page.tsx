"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Phone, Shield } from "lucide-react";

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async () => {
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    setLoading(true);
    setError("");
    // TODO: Integrate Supabase phone auth
    // const { error } = await supabase.auth.signInWithOtp({ phone: `+91${phone}` });
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length < 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }
    setLoading(true);
    setError("");
    // TODO: Verify with Supabase
    // const { error } = await supabase.auth.verifyOtp({ phone: `+91${phone}`, token: otpString, type: 'sms' });
    setTimeout(() => {
      setLoading(false);
      // router.push('/dashboard');
      window.location.href = "/dashboard";
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1">
            <span className="font-display text-3xl font-bold text-brand-dark">
              Sukhya
            </span>
            <span className="text-brand-gold text-3xl">.</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-brand-border/50 shadow-lg p-8">
          {step === "phone" ? (
            <>
              <h1 className="font-display text-2xl font-bold text-brand-dark mb-2 text-center">
                Welcome back
              </h1>
              <p className="text-sm text-brand-muted text-center mb-8">
                Log in with your phone number
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Phone Number
                  </label>
                  <div className="flex">
                    <div className="flex items-center gap-1 px-4 bg-brand-warm/50 border border-r-0 border-brand-border rounded-l-xl text-sm text-brand-dark">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="Enter your mobile number"
                      className="flex-1 px-4 py-3 border border-brand-border rounded-r-xl outline-none focus:border-brand-green text-sm font-body transition-colors"
                      maxLength={10}
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <button
                  onClick={handleSendOTP}
                  disabled={loading || phone.length < 10}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-medium text-sm transition-all ${
                    phone.length >= 10 && !loading
                      ? "bg-brand-green text-white hover:bg-brand-green-light"
                      : "bg-brand-border text-brand-muted cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Send OTP <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold text-brand-dark mb-2 text-center">
                Verify OTP
              </h1>
              <p className="text-sm text-brand-muted text-center mb-8">
                Enter the 6-digit code sent to +91 {phone}
              </p>

              <div className="space-y-6">
                <div className="flex gap-3 justify-center">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-brand-border rounded-xl outline-none focus:border-brand-green text-brand-dark transition-colors"
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <button
                  onClick={handleVerifyOTP}
                  disabled={loading || otp.join("").length < 6}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-medium text-sm transition-all ${
                    otp.join("").length >= 6 && !loading
                      ? "bg-brand-green text-white hover:bg-brand-green-light"
                      : "bg-brand-border text-brand-muted cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Verify & Login"
                  )}
                </button>

                <div className="text-center">
                  <button
                    onClick={() => setStep("phone")}
                    className="text-sm text-brand-muted hover:text-brand-green transition-colors"
                  >
                    Change phone number
                  </button>
                  <span className="mx-2 text-brand-border">•</span>
                  <button
                    onClick={handleSendOTP}
                    className="text-sm text-brand-muted hover:text-brand-green transition-colors"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-brand-muted">
          <Shield className="w-3 h-3" />
          <span>Your information is encrypted and secure</span>
        </div>

        <p className="text-center mt-4">
          <span className="text-sm text-brand-muted">
            Don&apos;t have an account?{" "}
          </span>
          <Link
            href="/auth/signup"
            className="text-sm text-brand-green font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
