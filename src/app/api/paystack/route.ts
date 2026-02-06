// import { eq } from "drizzle-orm";
// import { db } from "@/src/db/drizzle";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Extract the client IP address
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || // From proxy/load balancer
      req.headers.get("x-real-ip")?.trim() || // Direct connection or proxy header
      "Unknown IP";

    const allowedIps = ["52.31.139.75", "52.49.173.169", "52.214.14.220"];

    // Parse the request body
    const body = await req.json();
    const event = body;

    if (allowedIps.includes(clientIp)) {
    } else {
      console.log("Unauthorized IP:", clientIp);
    }

    return NextResponse.json({ success: true, message: "Event Processed." });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
