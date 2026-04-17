"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, MapPin, Package, CreditCard, Clock } from "lucide-react";

export default function OrderDetailPage() {
    const pathname = usePathname();
    const router = useRouter();
    const orderId = pathname.split('/').pop();
    
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (!orderId) return;
        const fetchOrder = async () => {
            const res = await fetch(`/api/orders/${orderId}`);
            const data = await res.json();
            if (data.order) setOrder(data.order);
            setLoading(false);
        };
        fetchOrder();
    }, [orderId]);

    const handleStatusUpdate = async (newStatus: string) => {
        setUpdating(true);
        try {
            const res = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await res.json();
            if (data.success) {
                setOrder(data.order);
            }
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div>Loading order...</div>;
    if (!order) return <div>Order not found.</div>;

    const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

    return (
        <div className="flex flex-col gap-8 pb-10">
            <Link href="/admin/orders" className="inline-flex items-center text-white/50 hover:text-white transition-colors w-max uppercase text-xs font-bold tracking-widest font-heading mb-[-10px]">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
            </Link>

            <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-heading font-black uppercase tracking-widest text-[#39FF14] mb-2">{order.orderNumber}</h1>
                    <p className="text-white/50 font-body text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Placed on {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>
                
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-heading font-bold uppercase tracking-wider text-white/50">Update Status</label>
                    <select 
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(e.target.value)}
                        disabled={updating}
                        className={`px-4 py-3 rounded-xl font-heading font-bold uppercase tracking-widest text-sm focus:outline-none transition-colors border ${
                            order.status === "pending" ? "bg-orange-500/20 text-orange-400 border-orange-500/30" : 
                            order.status === "delivered" ? "bg-green-500/20 text-green-400 border-green-500/30" : 
                            order.status === "cancelled" ? "bg-red-500/20 text-red-400 border-red-500/30" : 
                            "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        }`}
                    >
                        {STATUSES.map(s => <option key={s} value={s} className="bg-black text-white">{s}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                
                {/* 1. Customer Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4 text-white/80">
                        <User className="w-5 h-5" />
                        <h3 className="font-heading font-bold uppercase tracking-widest">Customer</h3>
                    </div>
                    <div>
                        <div className="font-bold text-lg">{order.firstName} {order.lastName}</div>
                        <a href={`mailto:${order.email}`} className="text-[#39FF14] text-sm mt-1 block hover:underline">{order.email}</a>
                        <a href={`tel:${order.phone}`} className="text-white/60 text-sm mt-1 block hover:text-white">{order.phone}</a>
                    </div>
                </div>

                {/* 2. Shipping Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4 text-white/80">
                        <MapPin className="w-5 h-5" />
                        <h3 className="font-heading font-bold uppercase tracking-widest">Shipping Address</h3>
                    </div>
                    <div className="text-sm text-white/70 leading-relaxed">
                        {order.address}<br />
                        {order.city}, {order.state} {order.zip}<br />
                        India
                    </div>
                </div>

                {/* 3. Payment Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4 text-white/80">
                        <CreditCard className="w-5 h-5" />
                        <h3 className="font-heading font-bold uppercase tracking-widest">Payment Info</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/50 font-bold uppercase tracking-widest">Method</span>
                            <span className="uppercase">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Razorpay'}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/50 font-bold uppercase tracking-widest">Status</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-bold ${order.paymentStatus === 'pending' ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'}`}>
                                {order.paymentStatus}
                            </span>
                        </div>
                        {order.paymentId && (
                            <div className="flex justify-between flex-col gap-1 text-sm mt-2 pt-2 border-t border-white/5">
                                <span className="text-white/50 font-bold uppercase tracking-widest text-[10px]">Razorpay ID</span>
                                <span className="font-mono text-xs">{order.paymentId}</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Order Items */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-4">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4 text-white/80 mb-4">
                    <Package className="w-5 h-5" />
                    <h3 className="font-heading font-bold uppercase tracking-widest">Order Details</h3>
                </div>

                <div className="overflow-x-auto mb-6">
                    <table className="w-full text-left font-body text-sm">
                        <thead className="text-white/40 border-b border-white/10 uppercase font-heading text-xs tracking-widest">
                            <tr>
                                <th className="pb-3 px-2">Item</th>
                                <th className="pb-3 px-2 text-center">Pack Size</th>
                                <th className="pb-3 px-2 text-center">Quantity</th>
                                <th className="pb-3 px-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-white/5">
                                <td className="py-5 px-2 font-bold flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center font-heading font-black">{order.flavor.substring(0,2).toUpperCase()}</div>
                                    <div>
                                        <div className="text-base">{order.flavorName}</div>
                                        <div className="text-xs text-white/50">{order.flavor}</div>
                                    </div>
                                </td>
                                <td className="py-5 px-2 text-center">6-Pack</td>
                                <td className="py-5 px-2 text-center font-bold">{order.quantity}</td>
                                <td className="py-5 px-2 text-right font-bold">₹{order.subtotal.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end pr-2">
                    <div className="w-full max-w-xs flex flex-col gap-3 font-body text-sm">
                        <div className="flex justify-between items-center text-white/70">
                            <span>Subtotal</span>
                            <span>₹{order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-white/70">
                            <span>Shipping</span>
                            <span>₹{order.shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-heading font-black pt-3 border-t border-white/10">
                            <span>Total</span>
                            <span className="text-[#39FF14]">₹{order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
