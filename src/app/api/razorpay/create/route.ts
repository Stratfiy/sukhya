import { NextRequest, NextResponse } from "next/server";
import { getOrCreatePlan, createSubscription } from "@/lib/razorpay";

const PLAN_CONFIG: Record<string, { amount: number; name: string }> = {
  "hair-starter": { amount: 999, name: "Hair Regrowth Starter" },
  "hair-complete": { amount: 1499, name: "Hair Regrowth Complete" },
  "skin-starter": { amount: 799, name: "Skin Care Starter" },
  "skin-complete": { amount: 1199, name: "Skin Care Complete" },
};

export async function POST(request: NextRequest) {
  try {
    const { plan, vertical, email, phone } = await request.json();

    const planKey = `${vertical}-${plan}`;
    const config = PLAN_CONFIG[planKey];

    if (!config) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Get or create the Razorpay plan
    const razorpayPlanId = await getOrCreatePlan(
      planKey,
      config.amount,
      config.name
    );

    // Create subscription
    const subscription = await createSubscription(
      razorpayPlanId,
      email,
      phone
    );

    return NextResponse.json({
      subscription_id: subscription.id,
      razorpay_plan_id: razorpayPlanId,
      amount: config.amount,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      name: config.name,
      short_url: subscription.short_url,
    });
  } catch (error: any) {
    console.error("Razorpay create subscription error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create subscription" },
      { status: 500 }
    );
  }
}
