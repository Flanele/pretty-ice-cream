'use client';

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";

import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals";

interface Props {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
    const [openAuthModal, setOpenAuthModal] = React.useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    React.useEffect(() => {
        let toastMessage = '';
    
        if (searchParams.has('paid')) {
          toastMessage = 'Order successfully paid!';
        }
    
        if (searchParams.has('verified')) {
          toastMessage = 'Registration successfully confirmed!';
        }
    
        if (toastMessage) {
          setTimeout(() => {
            router.replace('/');
            toast.success(toastMessage, {
              duration: 3000,
            });
          }, 1000);
        }
      }, []);


    return (
        <header className={cn('border-b', className)}>
            <Container className='flex items-center justify-between py-8'>
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" alt="logo" width={35} height={35}></Image>
                        <div>
                            <h1 className="text-2xl uppercase font-black">Ice Cream</h1>
                            <p className="text-sm text-gray-400 leading-3">for every taste</p>
                        </div>
                    </div>
                </Link>

                {hasSearch &&
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                }
                
                
                <div className="flex items-center gap-3">
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
                       
                    <div>
                        {hasCart &&
                            <CartButton />
                        }                      
                    </div>
                </div>
            </Container>
        </header>
    )
}