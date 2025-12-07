import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
    api: {
        bodyParser: false,
    },
};

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string, {
    apiVersion: "2025-11-17.clover",
});

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature") as string;
    console.log("TRIGGERED WEB HOOK")
    try {
        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );

        // 🔥 When subscription payment succeeds
        if (event.type === "invoice.payment_succeeded") {
            const invoice: any = event.data.object as Stripe.Invoice;

            const customerId = invoice.customer as string;
            const subscriptionId = invoice?.subscription as string;
            const amountPaid = invoice.amount_paid; // in cents

            console.log("🔥 Subscription Renewal Paid!");
            console.log({ customerId, subscriptionId, amountPaid });

            // TODO:
            // 1. Look up your user in your DB by Stripe customerId
            // 2. Increase their coins
            // Example:
            // await db.user.update({
            //   where: { stripeCustomerId: customerId },
            //   data: { coins: { increment: 100 } },
            // });

            console.log("🟢 Coins added to user!");
        }

        return NextResponse.json({ received: true });
    } catch (err: any) {
        console.error("Webhook Error:", err.message);
        return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
    }
}
