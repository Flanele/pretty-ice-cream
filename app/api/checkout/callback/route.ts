import { stripe } from "@/shared/constants/stripe";
import { prisma } from "@/prisma/prisma-client";
import { OrderSucsessTemplate } from "@/shared/components";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    try {

        const rawBody = await req.arrayBuffer();
        const bodyBuffer = Buffer.from(rawBody);
        const signature = req.headers.get("stripe-signature") as string;

        const event = stripe.webhooks.constructEvent(bodyBuffer, signature, endpointSecret);

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const metadata = session.metadata;
            const orderId = Number(metadata?.order_id);
      
            const order = await prisma.order.findFirst({ where: { id: orderId } });
      
            if (!order) {
              return NextResponse.json({ error: "Order not found" }, { status: 404 });
            }
      
            await prisma.order.update({
              where: { id: order.id },
              data: { status: OrderStatus.SUCCEEDED },
            });
      
            const items = JSON.parse(order.items as unknown as string) as CartItemDTO[];
      
            await sendEmail(
              order.email,
              `Pretty Ice Cream / Your order #${order.id} is confirmed 🎉`,
              React.createElement(OrderSucsessTemplate, { orderId: order.id, items })
            );
      
            return NextResponse.json({ success: true });
          }
      
          return NextResponse.json({ message: "Unhandled event type" }, { status: 200 });

    } catch (error) {
        console.log('[Checkout Callback] Error:', error);

        return NextResponse.json({ error: 'Server error' });
    }
}