"use client";

import { useEffect, useState } from "react";
import { initializePaddle, Paddle } from '@paddle/paddle-js';
// import { getPaddle } from "@/lib/paddle";

export default function PaddleTestPage() {


    const [paddle, setPaddle] = useState<Paddle>();

    useEffect(() => {
        initializePaddle({
            environment: 'sandbox', // or 'production'
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!
        }).then(
            (paddleInstance: Paddle | undefined) => {
                if (paddleInstance) {
                    setPaddle(paddleInstance);
                }
            },
        );
    }, []);

    console.log(process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!);

    const openCheckout = () => {
        paddle?.Checkout.open({
            items: [{ priceId: 'pri_01gsz8x8sawmvhz1pv30nge1ke', quantity: 1 }]
        });
    };

    return <button onClick={openCheckout}>Subscribe</button>;
}