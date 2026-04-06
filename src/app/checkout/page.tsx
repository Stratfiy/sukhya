"use client";

import { useState, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import {
  Shield,
  Lock,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Building2,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { PRICING, VERTICALS } from "@/lib/constants";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-brand-green animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get("plan") || "complete";
  const vertical = searchParams.get("vertical") || "hair";

  const plan = PRICING.find((p) => p.plan === planId && p.vertical === vertical);
  const verticalInfo = VERTICALS[vertical as keyof typeof VERTICALS];

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const handlePayment = useCallback(async () => {
    if (!razorpayLoaded) {
      setError("Payment system is loading. Please wait a moment.");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      // Step 1: Create subscription on server
      const res = await fetch("/api/razorpay/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planId,
          vertical,
          email: "", // Will come from auth
          phone: "",
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create subscription");
      }

      const data = await res.json();

      // Step 2: Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: data.subscription_id,
        name: "Sukhya Health",
        description: data.name + " — Monthly Subscription",
        image: "", // Add logo URL later
        handler: async function (response: any) {
          // Step 3: Verify payment on server
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_signature: response.razorpay_signature,
                plan: planId,
                vertical,
              }),
            });

            if (!verifyRes.ok) {
              throw new Error("Payment verification failed");
            }

            // Payment success — redirect to dashboard
            router.push("/dashboard?payment=success");
          } catch (err) {
            setError("Payment was received but verification failed. Please contact support.");
            setProcessing(false);
          }
        },
        prefill: {
          email: "",
          contact: "",
        },
        notes: {
          plan: planId,
          vertical: vertical,
          platform: "sukhya",
        },
        theme: {
          color: "#2D6A4F",
          backdrop_color: "rgba(0,0,0,0.6)",
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
          confirm_close: true,
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        setError(
          response.error?.description ||
            "Payment failed. Please try again or use a different method."
        );
        setProcessing(false);
      });

      rzp.open();
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setProcessing(false);
    }
  }, [razorpayLoaded, planId, vertical, router]);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-brand-muted mx-auto mb-4" />
          <p className="text-brand-muted mb-4">Plan not found</p>
          <Link href="/pricing" className="text-brand-green hover:underline">
            View plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Load Razorpay SDK */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
        strategy="afterInteractive"
      />

      <section className="min-h-screen py-12">
        <div className="max-w-lg mx-auto px-4">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-dark mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to pricing
          </Link>

          <h1 className="font-display text-2xl font-bold text-brand-dark mb-8 text-center">
            Complete your subscription
          </h1>

          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-brand-border/50 shadow-sm p-6 mb-6">
            <h3 className="text-sm font-medium text-brand-muted uppercase tracking-wider mb-4">
              Order Summary
            </h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-display text-lg font-semibold text-brand-dark">
                  {plan.name} Plan
                </p>
                <p className="text-sm text-brand-muted">
                  {verticalInfo?.label}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-bold text-brand-dark">
                  ₹{plan.price}
                </p>
                <p className="text-xs text-brand-muted">/month</p>
              </div>
            </div>

            <hr className="border-brand-border/50 my-4" />

            <ul className="space-y-2">
              {plan.features.slice(0, 5).map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-brand-dark"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-glow flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <hr className="border-brand-border/50 my-4" />

            <div className="flex justify-between text-sm">
              <span className="text-brand-muted">Subtotal</span>
              <span className="text-brand-dark">₹{plan.price}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-brand-muted">Shipping</span>
              <span className="text-brand-glow font-medium">FREE</span>
            </div>
            {plan.originalPrice && (
              <div className="flex justify-between text-sm mt-2">
                <span className="text-brand-muted">You save</span>
                <span className="text-brand-green font-medium">
                  ₹{plan.originalPrice - plan.price}/month
                </span>
              </div>
            )}
            <hr className="border-brand-border/50 my-4" />
            <div className="flex justify-between font-display text-lg font-bold">
              <span className="text-brand-dark">Total today</span>
              <span className="text-brand-dark">₹{plan.price}</span>
            </div>
            <p className="text-xs text-brand-muted mt-1 text-right">
              Then ₹{plan.price}/month • Cancel anytime
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Payment button */}
          <button
            onClick={handlePayment}
            disabled={processing || !razorpayLoaded}
            className="w-full flex items-center justify-center gap-2 bg-brand-green text-white py-4 rounded-full font-medium text-base hover:bg-brand-green-light transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Opening
                Razorpay...
              </>
            ) : !razorpayLoaded ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Loading payment...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" /> Pay ₹{plan.price} — Subscribe
              </>
            )}
          </button>

          {/* Payment methods */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-1 text-xs text-brand-muted">
              <CreditCard className="w-3.5 h-3.5" /> Cards
            </div>
            <div className="flex items-center gap-1 text-xs text-brand-muted">
              <Smartphone className="w-3.5 h-3.5" /> UPI
            </div>
            <div className="flex items-center gap-1 text-xs text-brand-muted">
              <Building2 className="w-3.5 h-3.5" /> Net Banking
            </div>
          </div>

          {/* Trust */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-brand-muted">
            <Shield className="w-3.5 h-3.5 text-brand-green" />
            <span>Secured by Razorpay • 256-bit SSL encryption</span>
          </div>

          <p className="text-xs text-brand-muted text-center mt-6 max-w-sm mx-auto">
            By subscribing, you agree to our{" "}
            <Link
              href="/legal/terms"
              className="text-brand-green hover:underline"
            >
              Terms
            </Link>
            ,{" "}
            <Link
              href="/legal/privacy"
              className="text-brand-green hover:underline"
            >
              Privacy Policy
            </Link>
            , and{" "}
            <Link
              href="/legal/refund"
              className="text-brand-green hover:underline"
            >
              Refund Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
