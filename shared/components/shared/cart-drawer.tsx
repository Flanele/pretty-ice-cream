'use client';

import React from 'react';
import Image from 'next/image';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store';
import { CreamSize, CreamType } from '@/shared/constants/cream';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { useCart } from '@/shared/hooks';


export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();
    const [redirecting, setRedirecting] = React.useState(false);

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className='flex flex-col justify-between pb-0 bg-[#fcf7fa]'> 
                <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>              
                    {totalAmount > 0 && (
                        <SheetHeader>
                            <SheetTitle>
                                You have <span className='font-bold'>{items.length} products </span>in the cart
                            </SheetTitle>
                        </SheetHeader>
                    )}


                {!totalAmount && (
                        <div className='flex flex-col items-center justify-center w-72 mx-auto'>
                            <Image src="/assets/images/empty-box.png" alt="empty cart" width={120} height={120} />
                            <Title size='sm' text='Cart is empty' className='text-center font-bold my-2' />
                            <p className='text-center text-neutral-500 mb-5'>
                                Add at lest one product to place an order
                            </p>

                            <SheetClose>
                                <Button className='w-56 h-12 text-base' size="lg">
                                    <ArrowLeft className='w-5 mr-2' />
                                    Return back
                                </Button>
                            </SheetClose>
                        </div>
                )}

                    { totalAmount > 0 && <>
                        <div className='-mx-6 mt-5 overflow-auto flex-1'>
                            
                            {
                                
                                items.map((item) => (
                                    <div className='mb-2' key={item.id}>
                                        <CartDrawerItem                                       
                                            id={item.id}
                                            imageUrl={item.imageUrl}
                                            details={getCartItemDetails(
                                                item.ingredients,
                                                item.creamType as CreamType,
                                                item.creamSize as CreamSize,                                                
                                            )}
                                            disabled={item.disabled}
                                            name={item.name}
                                            price={item.price}
                                            quantity={item.quantity}
                                            onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                            onClickRemove={() => removeCartItem(item.id)}
                                        />
                                    </div>
                                ))
                            }
                        
                        </div>
                
                        <SheetFooter className='-mx-6 bg-white p-8'>
                            <div className='w-full'>
                                <div className='flex mb-4'>
                                    <span className='flex flex-1 text-lg text-neutral-500'>
                                        Total
                                        <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
                                    </span>

                                    <span className='font-bold text-lg'>{totalAmount} $</span>
                                </div>

                                <Link href="/checkout">
                                    <Button 
                                        loading={redirecting}
                                        onClick={() => setRedirecting(true)}
                                        type="submit"
                                        className='w-full h-12 text-base'
                                    >
                                        Place an order
                                        <ArrowRight className='w-5 ml-2' />
                                    </Button>
                                </Link>
                            </div>
                        </SheetFooter>
                    </>}
                </div>
            </SheetContent>
        </Sheet>
    )
}