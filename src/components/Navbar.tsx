"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-light/80 backdrop-blur-xl border-b border-brand-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight">
              Sukhya
            </span>
            <span className="text-brand-gold text-3xl leading-none">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 font-body text-sm text-brand-muted hover:text-brand-dark transition-colors">
                Services <ChevronDown className="w-3 h-3" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-brand-border/50 p-2 animate-fade-in">
                  <Link
                    href="/assessment/hair"
                    className="block px-4 py-3 rounded-lg hover:bg-brand-warm/50 transition-colors"
                  >
                    <span className="block text-sm font-medium text-brand-dark">
                      Hair Regrowth
                    </span>
                    <span className="block text-xs text-brand-muted mt-0.5">
                      Clinically-proven treatments
                    </span>
                  </Link>
                  <Link
                    href="/assessment/skin"
                    className="block px-4 py-3 rounded-lg hover:bg-brand-warm/50 transition-colors"
                  >
                    <span className="block text-sm font-medium text-brand-dark">
                      Skin & Dermatology
                    </span>
                    <span className="block text-xs text-brand-muted mt-0.5">
                      Acne, pigmentation & more
                    </span>
                  </Link>
                  <div className="block px-4 py-3 rounded-lg opacity-50">
                    <span className="block text-sm font-medium text-brand-dark">
                      Weight Management
                    </span>
                    <span className="block text-xs text-brand-muted mt-0.5">
                      Coming Q3 2026
                    </span>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/pricing"
              className="font-body text-sm text-brand-muted hover:text-brand-dark transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/doctors"
              className="font-body text-sm text-brand-muted hover:text-brand-dark transition-colors"
            >
              Our Doctors
            </Link>
            <Link
              href="/blog"
              className="font-body text-sm text-brand-muted hover:text-brand-dark transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="font-body text-sm text-brand-dark hover:text-brand-green transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/assessment"
              className="font-body text-sm bg-brand-green text-white px-6 py-2.5 rounded-full hover:bg-brand-green-light transition-all hover:shadow-lg hover:shadow-brand-green/20"
            >
              Start Free Assessment
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-brand-dark" />
            ) : (
              <Menu className="w-6 h-6 text-brand-dark" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-brand-border/50 animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            <Link
              href="/assessment/hair"
              className="block py-2 font-body text-brand-dark"
              onClick={() => setMobileOpen(false)}
            >
              Hair Regrowth
            </Link>
            <Link
              href="/assessment/skin"
              className="block py-2 font-body text-brand-dark"
              onClick={() => setMobileOpen(false)}
            >
              Skin & Dermatology
            </Link>
            <Link
              href="/pricing"
              className="block py-2 font-body text-brand-dark"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/doctors"
              className="block py-2 font-body text-brand-dark"
              onClick={() => setMobileOpen(false)}
            >
              Our Doctors
            </Link>
            <hr className="border-brand-border" />
            <Link
              href="/auth/login"
              className="block py-2 font-body text-brand-muted"
              onClick={() => setMobileOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/assessment"
              className="block text-center bg-brand-green text-white py-3 rounded-full font-body font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Start Free Assessment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
