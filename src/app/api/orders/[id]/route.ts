import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;
        const order = await prisma.order.findUnique({
            where: { id }
        });
        
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }
        
        return NextResponse.json({ order });
    } catch (error) {
        console.error("Failed to fetch order:", error);
        return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session || session.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const id = (await params).id;
        const body = await request.json();
        
        const updateData: any = {};
        if (body.status) updateData.status = body.status;
        if (body.paymentStatus) updateData.paymentStatus = body.paymentStatus;
        
        const order = await prisma.order.update({
            where: { id },
            data: updateData
        });
        
        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error("Failed to update order:", error);
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}
