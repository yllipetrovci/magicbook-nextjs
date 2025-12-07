// /app/api/stripe/payment-intent/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string, {
    apiVersion: "2025-11-17.clover",
});

export async function POST() {
    try {
        const customer = await stripe.customers.create();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 20000,               // $20
            currency: "usd",
            customer: customer.id,      // ⭐ IMPORTANT
            setup_future_usage: "off_session",  // ⭐ Save card for upsells
        });

        console.log({ paymentIntent });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            customerId: customer.id,   // ⭐ Return the customer for front-end if needed
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
