"use client";

import Link from "next/link";
import { ArrowLeft, Package, Truck, CheckCircle2, Clock, MapPin } from "lucide-react";

const MOCK_ORDERS = [
  {
    id: "ORD-2026-0003",
    date: "2026-03-15",
    status: "in_transit",
    tracking: "SR123456789",
    partner: "Shiprocket",
    items: ["Minoxidil 5%", "Finasteride 1mg", "Biotin 10000mcg"],
    amount: 1499,
    estimated: "2026-04-12",
  },
  {
    id: "ORD-2026-0002",
    date: "2026-02-15",
    status: "delivered",
    tracking: "SR987654321",
    partner: "Delhivery",
    items: ["Minoxidil 5%", "Finasteride 1mg", "Biotin 10000mcg"],
    amount: 1499,
    delivered: "2026-02-20",
  },
  {
    id: "ORD-2026-0001",
    date: "2026-01-15",
    status: "delivered",
    tracking: "SR456789123",
    partner: "Shiprocket",
    items: ["Minoxidil 5%", "Finasteride 1mg"],
    amount: 999,
    delivered: "2026-01-21",
  },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
  processing: { label: "Processing", color: "text-brand-gold", bgColor: "bg-brand-gold/10", icon: Clock },
  shipped: { label: "Shipped", color: "text-blue-500", bgColor: "bg-blue-50", icon: Package },
  in_transit: { label: "In Transit", color: "text-brand-green", bgColor: "bg-brand-green/10", icon: Truck },
  delivered: { label: "Delivered", color: "text-brand-glow", bgColor: "bg-brand-glow/10", icon: CheckCircle2 },
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-dark mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-dark mb-2">
          Your Orders
        </h1>
        <p className="text-brand-muted mb-8">Track your medication deliveries</p>

        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => {
            const statusConfig = STATUS_CONFIG[order.status];
            const StatusIcon = statusConfig.icon;
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-brand-border/50 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-brand-dark">{order.id}</p>
                    <p className="text-xs text-brand-muted">
                      Ordered on {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${statusConfig.color} ${statusConfig.bgColor}`}>
                    <StatusIcon className="w-3 h-3" /> {statusConfig.label}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {order.items.map((item, i) => (
                    <span key={i} className="text-xs bg-brand-light px-3 py-1 rounded-full text-brand-dark">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-brand-muted">Amount</p>
                      <p className="font-medium text-brand-dark">₹{order.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-brand-muted">Shipping</p>
                      <p className="font-medium text-brand-dark">{order.partner}</p>
                    </div>
                    {order.status === "in_transit" && (
                      <div>
                        <p className="text-xs text-brand-muted">Expected By</p>
                        <p className="font-medium text-brand-green">
                          {new Date(order.estimated!).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </p>
                      </div>
                    )}
                    {order.status === "delivered" && (
                      <div>
                        <p className="text-xs text-brand-muted">Delivered On</p>
                        <p className="font-medium text-brand-glow">
                          {new Date(order.delivered!).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </p>
                      </div>
                    )}
                  </div>
                  {order.tracking && (
                    <a
                      href={`https://www.shiprocket.in/tracking/${order.tracking}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-green font-medium hover:underline flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3" /> Track Package
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
