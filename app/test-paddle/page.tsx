"use client";

import { useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

export default function PaddleTestPage() {
    const [paddle, setPaddle] = useState<Paddle | null>(null);

    useEffect(() => {
        initializePaddle({
            environment: "sandbox",
            seller: 43714,
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!, // ✅ CORRECT
        }).then((p) => {
            if (p) setPaddle(p);
        });
    }, []);

    const openCheckout = () => {
        if (!paddle) return;

        paddle.Checkout.open({
            items: [
                {
                    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_UNLIMITED!,
                    quantity: 1,
                },
            ],
        });
    };

    return <button onClick={openCheckout}>Subscribe</button>;
}
