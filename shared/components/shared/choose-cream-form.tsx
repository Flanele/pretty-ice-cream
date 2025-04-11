'use client';

import React from "react";
import { cn } from "@/shared/lib/utils";
import { IceCreamImage } from "./ice-cream-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { CreamSize, CreamType, creamTypes } from "@/shared/constants/cream";

import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { getCreamDetails } from "@/shared/lib";
import { useProductOptions } from "@/shared/hooks";


interface Props {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    loading?: boolean;
    onSubmit: (itemId: number, ingredients: number[]) => void;
    className?: string;
}

export const ChooseCreamForm: React.FC<Props> = ({ 
    className,
    name,
    items,
    imageUrl,
    loading,
    ingredients,
    onSubmit
}) => {

    const { size, type, selectedIngredients, availableSizes, availableTypes, currentItemId, setSize, setType, addIngredient } = useProductOptions(items);

    const { totalPrice, textDetails } = getCreamDetails(type, size, items, ingredients, selectedIngredients);

     const handleClickAdd = () => {
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedIngredients));
        }
        
    };

    return (
        <div className={cn(className, 'flex flex-1')}>
            <IceCreamImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#f5f5f7] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">{textDetails}</p>

                <div className="flex flex-col gap-4 mt-5">
                    <GroupVariants items={availableSizes} value={String(size)} onClick={value => setSize(Number(value) as CreamSize)} />
                    <GroupVariants items={availableTypes} value={String(type)} onClick={value => setType(Number(value) as CreamType)} />
                </div>

                <div className="bg-gray-5 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                     <div className="grid grid-cols-3 gap-3">
                        {
                            ingredients.map((ingredient) => (
                                <IngredientItem 
                                    key={ingredient.id}
                                    name={ingredient.name}
                                    price={ingredient.price}
                                    imageUrl={ingredient.imageUrl}
                                    onClick={() => addIngredient(ingredient.id)}
                                    active={selectedIngredients.has(ingredient.id)}
                                />
                            ))
                        }
                    </div>
                </div>
               
                
                <Button 
                    loading={loading}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                    onClick={handleClickAdd}
                >
                    Add to cart for {totalPrice} $
                </Button>
            </div>
        </div>
    )
}