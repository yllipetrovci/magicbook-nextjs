"use client";

import { useState } from "react";

export default function StripeTestPage() {
    const [priceId, setPriceId] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const handleCheckout = async () => {
        if (!priceId) {
            setResponseMessage("Please enter a Stripe Price ID.");
            return;
        }

        setLoading(true);
        setResponseMessage("");

        try {
            const res = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceId }),
            });

            const data = await res.json();

            if (!res.ok) {
                setResponseMessage(`Error: ${data.error || "Request failed"}`);
                setLoading(false);
                return;
            }

            if (data.url) {
                window.location.href = data.url; // Redirect to Stripe Checkout
            } else {
                setResponseMessage("Failed to get redirect URL.");
            }
        } catch (err: any) {
            console.error(err);
            setResponseMessage(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="p-10 max-w-xl mx-auto font-sans">
            <h1 className="text-3xl font-bold text-black mb-6">
                Stripe Checkout Test
            </h1>

            <div className="bg-gray-50 border rounded-lg p-6 space-y-4">
                {/* Price ID Input */}
                <div>
                    <label className="block text-sm font-medium text-black mb-1">
                        Stripe Price ID
                    </label>
                    <input
                        type="text"
                        placeholder="price_12345"
                        value={priceId}
                        onChange={(e) => setPriceId(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                        Use a Price ID from your Stripe dashboard.
                    </p>
                </div>

                {/* Checkout Button */}
                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className={`px-4 py-2 rounded text-white transition 
            ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
          `}
                >
                    {loading ? "Loading..." : "Start Checkout"}
                </button>

                {/* Response Output */}
                {responseMessage && (
                    <div className="mt-4 p-3 bg-gray-100 rounded border text-black text-sm">
                        {responseMessage}
                    </div>
                )}
            </div>

            <div className="mt-10 text-sm text-gray-600">
                <p>
                    After clicking checkout, you’ll be redirected to Stripe's payment
                    page. Use Stripe test cards such as:
                </p>
                <ul className="list-disc ml-6 mt-2">
                    <li>Card: 4242 4242 4242 4242</li>
                    <li>Date: Any future date</li>
                    <li>CVC: Any 3 digits</li>
                </ul>
            </div>
        </div>
    );
}
