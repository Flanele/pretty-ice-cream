'use server';

import { stripe } from "../constants/stripe";

interface Props {
    description: string;
    orderId: number;
    amount: number;
}

export async function createPayment(details: Props) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: details.description, 
            },
            unit_amount: Math.round(details.amount * 100), // Сумма в центах
          },
          quantity: 1, 
        },
      ],
      metadata: {
        order_id: details.orderId.toString(),
      },
      mode: 'payment', 
      success_url: 'http://localhost:3001/?paid'
    });

    return session;
  } catch (error) {
    console.error('Stripe Payment Error:', error);
    throw new Error('Payment session creation failed');
  }
}


