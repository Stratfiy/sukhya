"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Pill,
  Package,
  Camera,
  Settings,
  LogOut,
  TrendingUp,
  Calendar,
  MessageCircle,
  ArrowRight,
  Bell,
  ChevronRight,
  User,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: FileText, label: "Consultations", href: "/dashboard/consultations" },
  { icon: Pill, label: "Prescriptions", href: "/dashboard/prescriptions" },
  { icon: Package, label: "Orders", href: "/dashboard/orders" },
  { icon: Camera, label: "Progress", href: "/dashboard/progress" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data
  const patient = {
    full_name: "Arjun Mehta",
    age: 28,
    city: "Mumbai",
    plan: "Complete",
    vertical: "Hair Regrowth",
    months_active: 3,
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-brand-border/50 min-h-screen fixed left-0 top-16 pt-8">
          <div className="px-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center">
                <User className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <p className="text-sm font-medium text-brand-dark">{patient.full_name}</p>
                <p className="text-xs text-brand-muted">{patient.plan} Plan</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 px-3">
            {SIDEBAR_ITEMS.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body mb-1 transition-colors ${
                  i === 0
                    ? "bg-brand-green/10 text-brand-green font-medium"
                    : "text-brand-muted hover:bg-brand-warm/50 hover:text-brand-dark"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="px-3 pb-6">
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-brand-muted hover:bg-red-50 hover:text-red-500 w-full transition-colors">
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-64 p-4 md:p-8">
          {/* Mobile nav */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4 scrollbar-hide">
            {SIDEBAR_ITEMS.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  i === 0 ? "bg-brand-green text-white" : "bg-white text-brand-muted border border-brand-border"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Welcome header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-dark">
                Welcome back, {patient.full_name.split(" ")[0]}
              </h1>
              <p className="text-brand-muted mt-1">
                Month {patient.months_active} of your {patient.vertical} journey
              </p>
            </div>
            <button className="relative p-2 bg-white rounded-xl border border-brand-border/50 hover:border-brand-green/30 transition-colors">
              <Bell className="w-5 h-5 text-brand-muted" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">2</span>
            </button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Treatment Month", value: `Month ${patient.months_active}`, icon: Calendar, color: "text-brand-green" },
              { label: "Progress Score", value: "7.2/10", icon: TrendingUp, color: "text-brand-glow" },
              { label: "Next Delivery", value: "Apr 12", icon: Package, color: "text-brand-gold" },
              { label: "Next Check-in", value: "Apr 15", icon: MessageCircle, color: "text-blue-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-brand-border/50">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="font-display text-xl font-bold text-brand-dark">{stat.value}</p>
                <p className="text-xs text-brand-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Two columns */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Current treatment */}
            <div className="bg-white rounded-2xl p-6 border border-brand-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold text-brand-dark">Your Treatment</h3>
                <Link href="/dashboard/prescriptions" className="text-sm text-brand-green hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Minoxidil 5% Solution", dosage: "1ml twice daily", status: "Active" },
                  { name: "Finasteride 1mg", dosage: "Once daily", status: "Active" },
                  { name: "Biotin 10000mcg", dosage: "Once daily with food", status: "Active" },
                ].map((med, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-brand-light rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center">
                        <Pill className="w-4 h-4 text-brand-green" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-brand-dark">{med.name}</p>
                        <p className="text-xs text-brand-muted">{med.dosage}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-brand-glow/10 text-brand-glow px-2 py-1 rounded-full">{med.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming */}
            <div className="bg-white rounded-2xl p-6 border border-brand-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold text-brand-dark">Upcoming</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 bg-brand-green/5 rounded-xl border border-brand-green/10">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                    <Camera className="w-5 h-5 text-brand-green" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-brand-dark">Upload Progress Photo</p>
                    <p className="text-xs text-brand-muted mt-0.5">Due in 3 days — Month 3 check-in</p>
                    <Link href="/dashboard/progress" className="inline-flex items-center gap-1 text-xs text-brand-green mt-2 font-medium hover:underline">
                      Upload now <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 bg-brand-warm/30 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-brand-dark">Next Medication Delivery</p>
                    <p className="text-xs text-brand-muted mt-0.5">Arriving by April 12, 2026</p>
                    <Link href="/dashboard/orders" className="inline-flex items-center gap-1 text-xs text-brand-gold mt-2 font-medium hover:underline">
                      Track order <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 bg-blue-50/50 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-brand-dark">Doctor Follow-up Call</p>
                    <p className="text-xs text-brand-muted mt-0.5">Scheduled for April 15, 2026 at 11:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buy medicines CTA */}
          <div className="bg-gradient-to-r from-brand-green to-brand-green-light rounded-2xl p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold mb-1">Buy Your Prescribed Medications</h3>
                <p className="text-sm text-brand-glow/80">Compare prices across 5 pharmacies and get the best deal.</p>
              </div>
              <Link
                href="/dashboard/prescriptions"
                className="inline-flex items-center gap-2 bg-white text-brand-green px-6 py-3 rounded-full font-medium text-sm hover:bg-brand-gold hover:text-brand-dark transition-all flex-shrink-0"
              >
                Buy Medicines <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
