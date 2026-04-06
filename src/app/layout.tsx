import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PostHogProvider } from "@/lib/posthog";

export const metadata: Metadata = {
  title: "Sukhya — Healthcare, Redefined for Real Life",
  description:
    "India's AI-powered telehealth platform. Connect with licensed dermatologists, get personalized treatment plans, and have prescription medications delivered to your door.",
  keywords: [
    "telehealth",
    "online dermatologist",
    "hair loss treatment India",
    "online doctor consultation",
    "minoxidil",
    "finasteride",
    "acne treatment online",
    "skin care prescription",
  ],
  openGraph: {
    title: "Sukhya — Healthcare, Redefined for Real Life",
    description:
      "Connect with licensed doctors online. Personalized treatment plans delivered to your door.",
    type: "website",
    locale: "en_IN",
    siteName: "Sukhya",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body bg-brand-light text-brand-dark antialiased">
        <PostHogProvider>
          <Navbar />
          <main className="min-h-screen pt-16 md:pt-20">{children}</main>
          <Footer />
          <WhatsAppButton />
        </PostHogProvider>
      </body>
    </html>
  );
}
