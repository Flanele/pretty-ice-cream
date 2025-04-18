'use server';

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { createPayment, sendEmail } from '@/shared/lib';
import { PayOrderTemplate, VerificationUserTemplate } from '@/shared/components';
import React from 'react';
import { getUserSession } from "@/shared/lib/get-user-session";
import { hashSync } from "bcrypt";



export async function createOrder (data: CheckoutFormValues) {
 try {
    const cookieStore = cookies();
    const cartToken = (await cookieStore).get('cartToken')?.value;

    if (!cartToken) {
        throw new Error('Cart token not found');
    }

    const userCart = await prisma.cart.findFirst({
        include: {
            user: true,
            items: {
                include: {
                    ingredients: true,
                    productItem: {
                        include: {
                            product: true,
                        },
                    },
                },
            },
        },
        where: {
            token: cartToken,
        },
    });

    if (!userCart) {
        throw new Error('Cart not found');
    }

    if (userCart?.totalAmount === 0) {
        throw new Error('Cart is empty');
    }

    const order =  await prisma.order.create({
        data: {
            token: cartToken,
            fullName: data.firstName + ' ' + data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            comment: data.comment,
            totalAmount: userCart.totalAmount,
            status: OrderStatus.PENDING,
            items: JSON.stringify(userCart.items),
        }
    })

    await prisma.cart.update({
        where: {
            id: userCart.id,
        },
        data: {
            totalAmount: 0,
        },
    });

    
    await prisma.cartItem.deleteMany({
        where: {
          cartId: userCart.id,
        },
      });

      const paymentData = await createPayment({
        amount: order.totalAmount,
        orderId: order.id,
        description: 'Payment for order #' + order.id,
      });

      if (!paymentData || !paymentData.url) {
        throw new Error('Payment data not found');
      }

      await prisma.order.update({
        where: {
            id: order.id,
        }, 
        data: {
            paymentId: paymentData.id,
        },
      });

      const paymentUrl = paymentData.url;

      await sendEmail(
        data.email,
        'Pretty Ice CReam / Pay for the order #' + order.id,
        React.createElement(PayOrderTemplate, {
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl,
          })
      );

      return paymentUrl;

 } catch (error) {
    console.log('[Create order] Server error', error);
 }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {

        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error('Пользователь не найден');
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            },
        });

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },

            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
            }
        });

    } catch(error) {
        console.log('Error [UPDATE_USER]', error);
        throw error;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {

        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            if (!user.verified) {
                throw new Error('Почта не подтверждена');
            }

            throw new Error('Пользователь уже существует');
        }

        const createdUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
            }
        });

        await sendEmail(
            createdUser.email,
            "Pretty Ice Cream / Confirmation of registration",
            React.createElement(VerificationUserTemplate, {
                code,
            }),
        );

    } catch(error) {
        console.log('Error [CREATE_USER]', error);
        throw error;
    }
}