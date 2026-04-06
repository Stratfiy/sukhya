"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, CreditCard, Bell, Shield, LogOut, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: "Arjun Mehta",
    email: "arjun@email.com",
    phone: "9876543210",
    age: "28",
    gender: "male",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
  });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-dark mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-dark mb-8">Settings</h1>

        {/* Profile */}
        <div className="bg-white rounded-2xl border border-brand-border/50 p-6 mb-6">
          <h3 className="font-display text-lg font-semibold text-brand-dark mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-brand-green" /> Profile
          </h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">Full Name</label>
                <input type="text" value={form.full_name} onChange={(e) => update("full_name", e.target.value)} className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">Phone</label>
                <input type="tel" value={form.phone} disabled className="w-full px-4 py-3 border border-brand-border rounded-xl text-sm bg-brand-light text-brand-muted" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">Age</label>
                <input type="number" value={form.age} onChange={(e) => update("age", e.target.value)} className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">City</label>
                <input type="text" value={form.city} onChange={(e) => update("city", e.target.value)} className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">Pincode</label>
                <input type="text" value={form.pincode} onChange={(e) => update("pincode", e.target.value)} className="w-full px-4 py-3 border border-brand-border rounded-xl outline-none focus:border-brand-green text-sm transition-colors" />
              </div>
            </div>
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-brand-green text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-green-light transition-all">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-white rounded-2xl border border-brand-border/50 p-6 mb-6">
          <h3 className="font-display text-lg font-semibold text-brand-dark mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-brand-green" /> Subscription
          </h3>
          <div className="flex items-center justify-between p-4 bg-brand-green/5 rounded-xl border border-brand-green/10">
            <div>
              <p className="text-sm font-medium text-brand-dark">Complete Plan — Hair Regrowth</p>
              <p className="text-xs text-brand-muted">₹1,499/month • Next billing: May 15, 2026</p>
            </div>
            <span className="text-xs bg-brand-glow/10 text-brand-glow px-3 py-1 rounded-full font-medium">Active</span>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="text-sm text-brand-muted hover:text-brand-dark transition-colors">Pause subscription</button>
            <span className="text-brand-border">•</span>
            <button className="text-sm text-red-400 hover:text-red-500 transition-colors">Cancel subscription</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-brand-border/50 p-6 mb-6">
          <h3 className="font-display text-lg font-semibold text-brand-dark mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-green" /> Notifications
          </h3>
          <div className="space-y-4">
            {[
              { label: "WhatsApp treatment reminders", checked: true },
              { label: "Email updates & promotions", checked: false },
              { label: "Progress photo reminders", checked: true },
              { label: "Order & delivery updates", checked: true },
            ].map((item, i) => (
              <label key={i} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-brand-dark">{item.label}</span>
                <div className={`w-10 h-6 rounded-full relative transition-colors ${item.checked ? "bg-brand-green" : "bg-brand-border"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${item.checked ? "right-1" : "left-1"}`} />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-red-100 p-6">
          <h3 className="font-display text-lg font-semibold text-brand-dark mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" /> Account
          </h3>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand-dark border border-brand-border px-4 py-2 rounded-xl transition-colors">
              Download my data
            </button>
            <button className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 border border-red-100 px-4 py-2 rounded-xl transition-colors">
              <LogOut className="w-4 h-4" /> Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
