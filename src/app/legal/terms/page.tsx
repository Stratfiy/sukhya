export default function TermsPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-brand-dark mb-2">Terms of Service</h1>
        <p className="text-sm text-brand-muted mb-8">Last updated: March 2026</p>

        <div className="prose prose-sm max-w-none text-brand-muted space-y-6">
          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">1. Platform Nature</h2>
            <p>Sukhya is a telehealth PLATFORM that connects patients with licensed, independent medical practitioners. Sukhya does not provide medical advice, diagnose conditions, prescribe treatments, or dispense medications. All medical decisions are made solely by the consulting physician based on their independent clinical judgment.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">2. Eligibility</h2>
            <p>You must be at least 18 years of age and a resident of India to use Sukhya&apos;s services. By using our platform, you represent that the information you provide is accurate and truthful.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">3. Medical Disclaimer</h2>
            <p>The AI-powered health assessments on Sukhya are for pre-screening purposes only and do not constitute medical advice or diagnosis. All treatment plans and prescriptions are issued by licensed physicians registered with the Indian Medical Council or respective State Medical Councils. Individual results may vary.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">4. Prescription & Medication</h2>
            <p>Prescriptions generated on Sukhya are signed digital prescriptions from licensed doctors. Sukhya does not manufacture, sell, or dispense medications. Patients purchase medications from third-party pharmacies of their choice. Sukhya provides pharmacy comparison links as a convenience and is not responsible for pharmacy operations, pricing, or fulfillment.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">5. Subscriptions & Payments</h2>
            <p>Subscription plans are billed monthly through Razorpay. You may cancel at any time from your dashboard. Cancellation takes effect at the end of the current billing period. The 90-day money-back guarantee applies only to Complete plan subscribers who have followed their prescribed treatment plan.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">6. Regulatory Compliance</h2>
            <p>Sukhya operates in compliance with the Indian IT Act (2000), Telemedicine Practice Guidelines (2020), Indian Medical Council regulations, and applicable data protection laws. We reserve the right to modify services to maintain compliance with evolving regulations.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">7. Limitation of Liability</h2>
            <p>Sukhya&apos;s liability is limited to the subscription fees paid. We are not liable for any medical outcomes, pharmacy errors, shipping delays, or any indirect or consequential damages. Use of the platform constitutes acceptance of these terms.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">8. Contact</h2>
            <p>For questions about these terms, contact us at legal@sukhya.com.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
