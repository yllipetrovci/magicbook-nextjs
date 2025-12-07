"use client";
const STRIPE_PUBLIC_KEY = 'pk_test_51SXhjf2L0sfkSiGowv3ltcJAqVMpyEHXWbgGaG14g5jVTHhyV4CubGlz9uofyV7pISDeZ8CiT2AiXX2HSWLGvIze00Gz04zf2S'

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [status, setStatus] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [paymentMethodId, setPaymentMethodId] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setStatus("Processing...");

        const res = await fetch("/api/stripe/payment-intent", {
            method: "POST",
        });

        const { clientSecret, customerId } = await res.json();

        const result: any = await stripe!.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements!.getElement(CardElement)!,
            },
        });

        if (result.error) {
            setStatus("Error: " + result.error.message);
        } else {
            setStatus("Payment successful!");
            setCustomerId(customerId as string);
            setPaymentMethodId(result?.paymentIntent?.payment_method as string);
        }
    };

    const handleUpsell = async () => {
        setStatus("Processing upsell...");

        const res = await fetch("/api/stripe/upsell", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customerId,
                paymentMethodId,
                amount: 1000,
            }),
        });

        const data = await res.json();

        if (data.error) {
            setStatus("Upsell failed: " + data.error);
        } else {
            setStatus("Upsell successful! 🎉");
        }
    };

    const handleTestUpsell = async () => {
        setStatus("Testing upsell...");

        const res = await fetch("/api/stripe/upsell", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customerId,
                paymentMethodId,
                amount: 1000,
            }),
        });

        const data = await res.json();

        if (data.error) {
            setStatus("Test Upsell failed: " + data.error);
        } else {
            setStatus("Test Upsell successful 🎉");
        }
    };

    // ⭐ NEW — Start Subscription (Recurring payment)
    const handleStartSubscription = async () => {
        setStatus("Starting subscription...");
        const priceId = "price_1SXjW52L0sfkSiGof3uoKvID";
        const res = await fetch("/api/stripe/create-subscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customerId,
                paymentMethodId,
                priceId
            }),
        });

        const data = await res.json();

        if (data.error) {
            setStatus("Subscription failed: " + data.error);
        } else {
            setStatus("Subscription started! 🎉");
        }
    };

    return (
        <div>

            <h1>{paymentMethodId}</h1>
            <h1>{customerId}</h1>

            <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
                <CardElement className="p-2 border rounded" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded" disabled={!stripe}>
                    Pay $20
                </button>
                <p>{status}</p>
            </form>

            {/* ⭐ Always visible test upsell */}
            <div className="mt-4">
                <button
                    onClick={handleTestUpsell}
                    className="px-4 py-2 bg-orange-500 text-white rounded"
                >
                    Test Upsell (no purchase)
                </button>
            </div>

            {/* ⭐ Normal upsell */}
            {customerId && paymentMethodId && (
                <div className="mt-6 p-4 border rounded">
                    <h3 className="font-bold mb-2">Special Offer</h3>
                    <p className="mb-2">Add extra package for <strong>$10</strong></p>
                    <button
                        onClick={handleUpsell}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Yes, add it!
                    </button>
                </div>
            )}

            {/* ⭐ NEW — Subscription Button */}
            {customerId && paymentMethodId && (
                <div className="mt-6 p-4 border rounded bg-gray-100">
                    <h3 className="font-bold mb-2">Subscribe Monthly</h3>
                    <p className="mb-2">Get unlimited access for $20/month</p>
                    <button
                        onClick={handleStartSubscription}
                        className="px-4 py-2 bg-purple-600 text-white rounded"
                    >
                        Start Subscription
                    </button>
                </div>
            )}
        </div>
    );
}

export default function StripeTestPage() {
    return (
        <Elements stripe={stripePromise}>
            <div className="max-w-md mx-auto mt-10">
                <h1 className="text-xl font-bold mb-4">Custom Stripe Checkout</h1>
                <CheckoutForm />
            </div>
        </Elements>
    );
}
