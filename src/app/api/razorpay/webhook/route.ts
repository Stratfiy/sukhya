import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    // Verify webhook signature
    if (signature) {
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(body)
        .digest("hex");

      if (expectedSignature !== signature) {
        console.error("[Razorpay Webhook] Invalid signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const event = JSON.parse(body);
    const eventType = event.event;

    console.log(`[Razorpay Webhook] ${eventType}`, JSON.stringify(event.payload, null, 2).slice(0, 500));

    switch (eventType) {
      case "subscription.activated": {
        const sub = event.payload.subscription.entity;
        console.log(`[Razorpay] Subscription activated: ${sub.id}, Plan: ${sub.plan_id}`);
        // TODO: Update Supabase
        // await supabase.from("subscriptions").update({
        //   status: "active",
        //   razorpay_subscription_id: sub.id,
        // }).eq("razorpay_subscription_id", sub.id);
        break;
      }

      case "subscription.charged": {
        const payment = event.payload.payment.entity;
        const sub = event.payload.subscription.entity;
        console.log(`[Razorpay] Charged ₹${payment.amount / 100} for sub ${sub.id}`);
        // TODO: Create new monthly order in Supabase
        // TODO: Trigger medication delivery workflow
        // TODO: Send WhatsApp confirmation
        break;
      }

      case "subscription.pending": {
        const sub = event.payload.subscription.entity;
        console.log(`[Razorpay] Subscription pending: ${sub.id}`);
        // TODO: Send payment reminder via WhatsApp
        break;
      }

      case "subscription.halted": {
        const sub = event.payload.subscription.entity;
        console.log(`[Razorpay] Subscription halted (payment failed): ${sub.id}`);
        // TODO: Update status, notify patient
        break;
      }

      case "subscription.cancelled": {
        const sub = event.payload.subscription.entity;
        console.log(`[Razorpay] Subscription cancelled: ${sub.id}`);
        // TODO: Update Supabase
        // await supabase.from("subscriptions").update({
        //   status: "cancelled",
        //   cancelled_at: new Date().toISOString(),
        // }).eq("razorpay_subscription_id", sub.id);
        break;
      }

      case "payment.failed": {
        const payment = event.payload.payment.entity;
        console.log(`[Razorpay] Payment failed: ${payment.id}, Reason: ${payment.error_description}`);
        // TODO: Notify patient, offer retry
        break;
      }

      default:
        console.log(`[Razorpay] Unhandled event: ${eventType}`);
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Razorpay webhook error:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}

// Webhook verification (GET)
export async function GET() {
  return NextResponse.json({ status: "webhook_active", platform: "sukhya" });
}
