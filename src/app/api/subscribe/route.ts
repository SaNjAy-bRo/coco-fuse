import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email } = body;

        if (!name || !email) {
            return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
        }

        // Use Prisma raw if types aren't generated yet, but let's assume they will be
        // We will just use the standard prisma call, and instruct the user to regenerate
        const subscriber = await prisma.subscriber.create({
            data: {
                name,
                email,
            },
        });

        return NextResponse.json({ success: true, subscriber }, { status: 201 });
    } catch (error: any) {
        console.error("Subscription Error:", error);
        
        // Handle unique constraint error if they already subscribed
        if (error.code === 'P2002') {
            return NextResponse.json({ success: true, message: "Already subscribed!" }, { status: 200 });
        }
        
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
