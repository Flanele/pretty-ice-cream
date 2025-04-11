import { Ingredient, ProductItem } from "@prisma/client";
import { calcTotalProductPrice } from "./calc-total-product-price";
import { mapCreamType, CreamSize, CreamType } from "../constants/cream";

export const getCreamDetails = (
    type: CreamType,
    size: CreamSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
        const totalPrice = calcTotalProductPrice(
            type,
            size,
            items,
            ingredients,
            selectedIngredients
        );
        const textDetails = `${size}0 g, ${mapCreamType[type]} cream`;

    return { totalPrice, textDetails }
}