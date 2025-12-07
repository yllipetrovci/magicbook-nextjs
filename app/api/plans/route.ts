import { NextResponse } from "next/server";
import { PLANS } from "@/lib/constants/plans";

export async function GET() {
    return NextResponse.json(
        PLANS
    );
}
