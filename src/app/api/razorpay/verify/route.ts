import { NextRequest, NextResponse } from "next/server";
import { verifySubscriptionSignature } from "@/lib/razorpay";

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
      plan,
      vertical,
    } = await request.json();

    if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
    }

    const isValid = verifySubscriptionSignature(
      razorpay_subscription_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // TODO: Save to Supabase subscriptions table
    // TODO: Assign doctor, send WhatsApp confirmation

    return NextResponse.json({
      success: true,
      subscription_id: razorpay_subscription_id,
    });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
