'use client';
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm, CheckoutSidebar, Container, Title } from "@/shared/components";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants";
import { useCart } from "@/shared/hooks";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";


export default function CheckoutPage() {
    const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
    const [submitting, setSubmitting] = React.useState(false);
    const { data: session } = useSession();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        }
    });

    React.useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe();
            const [firstName, lastName] = data.fullName.split(' ');

            form.setValue('firstName', firstName);
            form.setValue('lastName', lastName);
            form.setValue('email', data.email);
        }

        if (session) {
            fetchUserInfo();
        }

    }, [session]);

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);
            const url = await createOrder(data);

            toast.success('Your order successfully placed! 📝 Redirect for payment... ', {
                icon: '✅',
            });

            if (url) {
                location.href = url;
            }

        } catch (error) {
            console.log(error);
            setSubmitting(false);
            toast.error('Failed to create order', {
                icon: '❌'
            })
        } 
    };

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Container className="mt-10">
            <Title text='Placing an order' className="font-extrabold mb-8 text-[36px]" />
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-40">   
                        {/* Left side */}            
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart 
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                items={items}
                                loading={loading}
                            />

                        <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

                        <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
                        </div>


                        {/* Right side */} 
                        <div className="w-[450px]">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}