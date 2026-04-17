import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// Create a new order
export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Generate a random order number
        const orderNumber = `CF-${Math.floor(Math.random() * 900000) + 100000}`;
        
        // Ensure total is calculated correctly
        const subtotal = body.subtotal;
        const shipping = body.shipping || 0;
        const total = subtotal + shipping;
        
        const order = await prisma.order.create({
            data: {
                orderNumber,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phone: body.phone,
                address: body.address,
                city: body.city,
                state: body.state,
                zip: body.zip,
                flavor: body.flavor,
                flavorName: body.flavorName,
                quantity: body.quantity,
                subtotal,
                shipping,
                total,
                paymentMethod: body.paymentMethod || "cod",
                status: "pending",
                paymentStatus: "pending"
            }
        });
        
        return NextResponse.json({ success: true, orderId: order.id, orderNumber: order.orderNumber });
    } catch (error) {
        console.error("Failed to create order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}

// Get all orders (Admin only)
export async function GET() {
    try {
        const session = await getSession();
        if (!session || session.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: "desc" }
        });
        
        return NextResponse.json({ orders });
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
