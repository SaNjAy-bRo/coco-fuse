"use client";

import { useEffect, useState } from "react";
import { Users, DollarSign, Package, TrendingUp } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    pendingOrders: number;
    flavors: { name: string; count: number }[];
    recentOrders: any[];
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/orders");
                const data = await res.json();
                
                if (data.orders) {
                    const orders = data.orders;
                    
                    const totalRevenue = orders.reduce((sum: number, o: any) => sum + o.total, 0);
                    const pendingOrders = orders.filter((o: any) => o.status === "pending").length;
                    
                    const flavorMap: Record<string, number> = {};
                    orders.forEach((o: any) => {
                        flavorMap[o.flavorName] = (flavorMap[o.flavorName] || 0) + o.quantity;
                    });
                    const flavors = Object.entries(flavorMap).map(([name, count]) => ({ name, count: count as number }));

                    setStats({
                        totalRevenue,
                        totalOrders: orders.length,
                        pendingOrders,
                        flavors,
                        recentOrders: orders.slice(0, 5) // top 5
                    });
                }
            } catch (err) {
                console.error("Dashboard error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-heading font-black uppercase tracking-widest text-[#39FF14]">Overview</h1>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-white/50">
                        <DollarSign className="w-5 h-5 text-[#39FF14]" />
                        <span className="font-heading font-bold uppercase tracking-widest text-xs">Total Revenue</span>
                    </div>
                    <div className="text-4xl font-heading font-black tracking-tighter">₹{stats?.totalRevenue.toFixed(2)}</div>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-white/50">
                        <Package className="w-5 h-5 text-[#39FF14]" />
                        <span className="font-heading font-bold uppercase tracking-widest text-xs">Total Orders</span>
                    </div>
                    <div className="text-4xl font-heading font-black tracking-tighter">{stats?.totalOrders}</div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-white/50">
                        <TrendingUp className="w-5 h-5 text-orange-400" />
                        <span className="font-heading font-bold uppercase tracking-widest text-xs">Pending Fulfillment</span>
                    </div>
                    <div className="text-4xl font-heading font-black tracking-tighter text-orange-400">{stats?.pendingOrders}</div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-white/50">
                        <Users className="w-5 h-5 text-blue-400" />
                        <span className="font-heading font-bold uppercase tracking-widest text-xs">Unique Customers</span>
                    </div>
                    <div className="text-4xl font-heading font-black tracking-tighter">{new Set(stats?.recentOrders.map(o => o.email)).size || 0}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-heading font-bold uppercase tracking-widest text-white/80">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-sm text-[#39FF14] hover:underline">View All</Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-body text-sm">
                            <thead className="text-white/40 border-b border-white/10 uppercase font-heading text-xs tracking-widest">
                                <tr>
                                    <th className="pb-3 px-2">Order</th>
                                    <th className="pb-3 px-2">Date</th>
                                    <th className="pb-3 px-2">Customer</th>
                                    <th className="pb-3 px-2">Status</th>
                                    <th className="pb-3 px-2 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats?.recentOrders.map(order => (
                                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-2 font-bold text-[#39FF14]">
                                            <Link href={`/admin/orders/${order.id}`}>{order.orderNumber}</Link>
                                        </td>
                                        <td className="py-4 px-2 text-white/60">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="py-4 px-2">{order.firstName} {order.lastName}</td>
                                        <td className="py-4 px-2">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                                order.status === "pending" ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : 
                                                order.status === "delivered" ? "bg-green-500/20 text-green-400 border border-green-500/30" : 
                                                "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 text-right font-bold">₹{order.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                                {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
                                    <tr><td colSpan={5} className="py-8 text-center text-white/50 font-body italic">No orders yet. Start promoting your brand!</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Flavor Sales breakdown */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col">
                    <h2 className="text-xl font-heading font-bold uppercase tracking-widest text-white/80 mb-6">Units Sold</h2>
                    <div className="flex flex-col gap-6 flex-1 justify-center">
                        {stats?.flavors.map(f => (
                            <div key={f.name} className="flex flex-col gap-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-bold">{f.name}</span>
                                    <span className="text-white/50">{f.count} packs</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-blue-500 to-[#39FF14]" 
                                        style={{ width: `${Math.max(5, (f.count / (stats.flavors.reduce((s, x) => s + x.count, 0) || 1)) * 100)}%` }} 
                                    />
                                </div>
                            </div>
                        ))}
                        {(!stats?.flavors || stats.flavors.length === 0) && (
                            <div className="py-8 text-center text-white/50 font-body italic">No unit data available.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
