import Link from "next/link";

export default function PrivacyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-brand-dark mb-2">Privacy Policy</h1>
        <p className="text-sm text-brand-muted mb-8">Last updated: March 2026</p>

        <div className="prose prose-sm max-w-none text-brand-muted space-y-6">
          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">1. Information We Collect</h2>
            <p>Sukhya Health Technologies Pvt. Ltd. (&quot;Sukhya,&quot; &quot;we,&quot; &quot;us&quot;) collects information you provide directly: name, phone number, email, age, gender, city, health assessment responses, progress photos, and communication history. We also collect device information, IP address, and usage data automatically through cookies and analytics.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">2. How We Use Your Information</h2>
            <p>We use your information to: provide telehealth services, connect you with licensed doctors, process AI-powered health assessments, facilitate prescription and pharmacy coordination, send treatment reminders via WhatsApp, improve our services, and comply with legal obligations under Indian law including the Information Technology Act, 2000 and the Telemedicine Practice Guidelines, 2020.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">3. Data Sharing</h2>
            <p>We share your health information only with: your assigned doctor for consultation, partner pharmacies (only prescription details for order fulfillment), AI processing services (anonymized for analysis), and as required by Indian law. We never sell your personal data to third parties.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">4. Data Security</h2>
            <p>We implement industry-standard security measures including encryption at rest and in transit, row-level security on our database, secure authentication, and regular security audits. All health data is stored on servers compliant with Indian data protection regulations.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. You can download your health records from your dashboard at any time. To request data deletion, contact us at privacy@sukhya.com.</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-brand-dark">6. Contact Us</h2>
            <p>For privacy-related queries, contact our Data Protection Officer at privacy@sukhya.com or write to: Sukhya Health Technologies Pvt. Ltd., Mumbai, Maharashtra, India.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
