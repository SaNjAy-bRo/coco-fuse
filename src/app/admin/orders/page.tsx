"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch("/api/orders");
            const data = await res.json();
            if (data.orders) setOrders(data.orders);
            setLoading(false);
        };
        fetchOrders();
    }, []);

    if (loading) return <div>Loading orders...</div>;

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-heading font-black uppercase tracking-widest text-[#39FF14]">All Orders</h1>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-body text-sm">
                        <thead className="text-white/40 border-b border-white/10 uppercase font-heading text-xs tracking-widest bg-white/5">
                            <tr>
                                <th className="p-5">Order ID</th>
                                <th className="p-5">Date</th>
                                <th className="p-5">Customer</th>
                                <th className="p-5">Item</th>
                                <th className="p-5">Total</th>
                                <th className="p-5">Status</th>
                                <th className="p-5 text-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => window.location.href = `/admin/orders/${order.id}`}>
                                    <td className="p-5 font-bold font-mono text-white">{order.orderNumber}</td>
                                    <td className="p-5 text-white/60">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="p-5">
                                        <div className="font-bold">{order.firstName} {order.lastName}</div>
                                        <div className="text-xs text-white/50">{order.email}</div>
                                    </td>
                                    <td className="p-5">
                                        <div className="font-bold">{order.flavorName}</div>
                                        <div className="text-xs text-white/50">Qty: {order.quantity} x 6-Pack</div>
                                    </td>
                                    <td className="p-5 font-bold">₹{order.total.toFixed(2)}</td>
                                    <td className="p-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                            order.status === "pending" ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : 
                                            order.status === "delivered" ? "bg-green-500/20 text-green-400 border border-green-500/30" : 
                                            "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right">
                                        <Link href={`/admin/orders/${order.id}`} className="inline-flex items-center text-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity">
                                            Manage <ChevronRight className="w-4 h-4 ml-1" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr><td colSpan={7} className="p-10 text-center text-white/50 italic">No orders found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
