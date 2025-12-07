// /app/api/stripe/create-subscription/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string, {
    apiVersion: "2025-11-17.clover",
});

export async function POST(request: Request) {
    try {
        const { customerId, paymentMethodId, priceId } = await request.json();

        if (!customerId || !paymentMethodId || !priceId) {
            return NextResponse.json(
                { error: "Missing customerId, paymentMethodId, or priceId" },
                { status: 400 }
            );
        }

        // Attach payment method
        await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

        // Set as default
        await stripe.customers.update(customerId, {
            invoice_settings: { default_payment_method: paymentMethodId },
        });

        // Create subscription
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            expand: ["latest_invoice.payment_intent"],
        });

        return NextResponse.json({ success: true, subscription });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
