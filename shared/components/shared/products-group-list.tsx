'use client';

import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useIntersection } from 'react-use';
import React from "react";
import { useCategoryStore } from "@/shared/store/category";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
    title: string;
    items: ProductWithRelations[];
    className?: string;
    listClassName?: string;
    categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
    title,
    items,
    className,
    listClassName,
    categoryId
 }) => {

    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = React.useRef<HTMLDivElement>(null);
    const intersection = useIntersection(intersectionRef as React.RefObject<HTMLElement>, {
        threshold: 0.1,
    });


    React.useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [intersection, categoryId, title]);
    

    return (
        <div id={title} ref={intersectionRef}>
            <Title text={title} size='lg' className="font-extrabold mb-5" />

            <div className={cn('grid grid-cols-3 gap-[50px] ', listClassName)}>
                {items
                    .map((product, i) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            price={product.items[0].price}
                            ingredients={product.ingredients}
                         />
                    ))
                }
            </div>
        </div>
    );
};