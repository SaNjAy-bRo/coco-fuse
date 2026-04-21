import { NextResponse } from "next/server";
import { createToken, setSessionCookie, validateAdminCredentials } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const isValid = await validateAdminCredentials(email, password);

        if (!isValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Create JWT and set cookie
        const token = await createToken({ email, role: "admin" });
        await setSessionCookie(token);

        return NextResponse.json({ success: true, message: "Logged in successfully" });
    } catch (error) {
        console.error("Login route error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
