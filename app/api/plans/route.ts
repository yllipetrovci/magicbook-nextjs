import { NextResponse } from "next/server";
import { plans } from "@/lib/constants/plans";

export async function GET() {
    return NextResponse.json(
        plans
    );
}
