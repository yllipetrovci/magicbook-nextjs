import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string, {
    apiVersion: "2025-11-17.clover",
});

export async function POST(request: Request) {
    try {
        const { customerId, paymentMethodId, amount } = await request.json();

        if (!customerId || !paymentMethodId) {
            return NextResponse.json(
                { error: "Missing customerId or paymentMethodId" },
                { status: 400 }
            );
        }

        // Create the upsell payment
        const paymentIntent = await stripe.paymentIntents.create({
            amount,                           // e.g. 1000 = $10
            currency: "usd",
            customer: customerId,
            payment_method: paymentMethodId,
            off_session: true,                // ⭐ Charge automatically
            confirm: true,                    // ⭐ No user confirmation needed
        });

        return NextResponse.json({
            success: true,
            paymentIntent,
        });

    } catch (err: any) {
        // Handle card declines or authentication errors
        if (err.type === "StripeCardError") {
            return NextResponse.json({
                error: err.message,
            }, { status: 400 });
        }

        console.log("Upsell error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
