"use client";

import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";

const BLOG_POSTS = [
  {
    slug: "understanding-male-pattern-baldness",
    title: "Understanding Male Pattern Baldness: Causes, Stages & Treatment Options",
    excerpt: "Male pattern baldness affects over 50% of Indian men by age 50. Learn about the Norwood scale, genetics, and evidence-based treatments that actually work.",
    category: "Hair Health",
    author: "Dr. Meera Sharma",
    date: "2026-03-20",
    readTime: "8 min",
  },
  {
    slug: "minoxidil-vs-finasteride",
    title: "Minoxidil vs Finasteride: Which Hair Loss Treatment Is Right for You?",
    excerpt: "A comprehensive comparison of the two most prescribed hair loss medications, their mechanisms, side effects, and what the research says.",
    category: "Treatment Guide",
    author: "Dr. Arjun Patel",
    date: "2026-03-15",
    readTime: "10 min",
  },
  {
    slug: "tretinoin-beginners-guide",
    title: "The Complete Beginner's Guide to Tretinoin in India",
    excerpt: "Everything you need to know about starting tretinoin: how it works, what to expect, purging phases, and how to build a routine around it.",
    category: "Skin Care",
    author: "Dr. Priya Nair",
    date: "2026-03-10",
    readTime: "12 min",
  },
  {
    slug: "telehealth-india-guide",
    title: "Telehealth in India: Your Complete Guide to Online Doctor Consultations",
    excerpt: "How telemedicine works in India, the legal framework, what to expect from online consultations, and how to choose the right platform.",
    category: "Healthcare",
    author: "Sukhya Team",
    date: "2026-03-05",
    readTime: "7 min",
  },
  {
    slug: "hair-loss-diet-nutrition",
    title: "Diet & Nutrition for Hair Growth: What Science Actually Says",
    excerpt: "Separate fact from fiction. Which nutrients actually impact hair growth, deficiencies to watch for, and the Indian diet adjustments that help.",
    category: "Nutrition",
    author: "Dr. Meera Sharma",
    date: "2026-02-28",
    readTime: "9 min",
  },
  {
    slug: "acne-treatment-prescription",
    title: "Beyond Face Wash: Why Prescription Acne Treatment Works Better",
    excerpt: "OTC products have limits. Learn when it's time to see a dermatologist and what prescription options are available for persistent acne.",
    category: "Skin Care",
    author: "Dr. Priya Nair",
    date: "2026-02-20",
    readTime: "6 min",
  },
];

export default function BlogPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-brand-dark mb-4">
            The Sukhya Journal
          </h1>
          <p className="text-brand-muted max-w-xl mx-auto text-lg">
            Evidence-based health insights from our team of doctors and
            specialists.
          </p>
        </div>

        {/* Featured post */}
        <div className="bg-white rounded-3xl border border-brand-border/50 overflow-hidden mb-12 hover:shadow-lg transition-shadow">
          <div className="grid md:grid-cols-2">
            <div className="aspect-video md:aspect-auto bg-gradient-to-br from-brand-green/10 to-brand-glow/10 flex items-center justify-center">
              <span className="text-6xl">📝</span>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className="text-xs font-medium text-brand-green bg-brand-green/10 px-3 py-1 rounded-full w-fit mb-4">
                {BLOG_POSTS[0].category}
              </span>
              <h2 className="font-display text-xl md:text-2xl font-bold text-brand-dark mb-3">
                {BLOG_POSTS[0].title}
              </h2>
              <p className="text-sm text-brand-muted mb-6">{BLOG_POSTS[0].excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-brand-muted">
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {BLOG_POSTS[0].author}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {BLOG_POSTS[0].readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(1).map((post, i) => (
            <article key={i} className="bg-white rounded-2xl border border-brand-border/50 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group">
              <div className="aspect-video bg-gradient-to-br from-brand-warm/50 to-brand-light flex items-center justify-center">
                <span className="text-4xl">📄</span>
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
                <h3 className="font-display text-lg font-semibold text-brand-dark mt-3 mb-2 group-hover:text-brand-green transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-brand-muted line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-brand-muted">
                  <span>{post.author}</span>
                  <span>{post.readTime} read</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-brand-muted">
            More articles coming soon. Want to write for us?{" "}
            <a href="mailto:hello@sukhya.com" className="text-brand-green hover:underline">
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
