export default function RefundPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-brand-dark mb-2">Refund Policy</h1>
        <p className="text-sm text-brand-muted mb-8">Last updated: March 2026</p>

        <div className="prose prose-sm max-w-none text-brand-muted space-y-6">
          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">90-Day Money-Back Guarantee</h2>
            <p>Complete plan subscribers are eligible for a full refund if they do not see improvement within 90 days, provided they have followed the prescribed treatment plan consistently. To claim this guarantee, you must have uploaded monthly progress photos and attended all scheduled check-ins.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">Subscription Cancellation</h2>
            <p>You may cancel your subscription at any time from your dashboard. Cancellation takes effect at the end of the current billing cycle. No partial refunds are provided for the remaining days of a billing period.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">Consultation Refunds</h2>
            <p>If a doctor consultation is not completed within 72 hours of your subscription start date, you are entitled to a full refund. Contact support@sukhya.com or reach us on WhatsApp.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">Medication Purchases</h2>
            <p>Since medications are purchased from third-party pharmacies, Sukhya is not responsible for medication refunds, returns, or exchanges. Please contact the respective pharmacy directly for their refund policies.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">How to Request a Refund</h2>
            <p>Email support@sukhya.com with your account details and reason for the refund request. Refunds are processed within 7-10 business days to the original payment method.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
