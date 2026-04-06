import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default razorpay;

// Plan IDs will be created on first run and cached
const PLAN_CACHE: Record<string, string> = {};

export async function getOrCreatePlan(
  planKey: string,
  amount: number,
  planName: string
): Promise<string> {
  if (PLAN_CACHE[planKey]) return PLAN_CACHE[planKey];

  try {
    // Try to find existing plan by fetching all plans
    const plans = await razorpay.plans.all({ count: 100 });
    const existing = plans.items?.find(
      (p: any) => p.item?.name === planName && p.item?.amount === amount * 100
    );

    if (existing) {
      PLAN_CACHE[planKey] = existing.id;
      return existing.id;
    }
  } catch (e) {
    // Plans API might not return, create new
  }

  // Create new plan
  const plan = await razorpay.plans.create({
    period: "monthly",
    interval: 1,
    item: {
      name: planName,
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      description: `Sukhya ${planName} — Monthly Subscription`,
    },
  });

  PLAN_CACHE[planKey] = plan.id;
  return plan.id;
}

export async function createSubscription(
  planId: string,
  customerEmail?: string,
  customerPhone?: string
) {
  const subscriptionData: any = {
    plan_id: planId,
    total_count: 12, // 12 months max
    quantity: 1,
    customer_notify: 1,
  };

  if (customerEmail || customerPhone) {
    subscriptionData.notes = {
      email: customerEmail || "",
      phone: customerPhone || "",
    };
  }

  const subscription = await razorpay.subscriptions.create(subscriptionData);
  return subscription;
}

export async function createOrder(amount: number, receiptId: string) {
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: receiptId,
    notes: {
      platform: "sukhya",
    },
  });
  return order;
}

export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const crypto = require("crypto");
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}

export function verifySubscriptionSignature(
  subscriptionId: string,
  paymentId: string,
  signature: string
): boolean {
  const crypto = require("crypto");
  const body = paymentId + "|" + subscriptionId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}
