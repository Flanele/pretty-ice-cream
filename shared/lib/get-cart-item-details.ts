import { Ingredient } from "@prisma/client";
import { mapCreamType, CreamSize, CreamType } from "../constants/cream";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
    ingredients: CartStateItem['ingredients'],
    creamType?: CreamType,
    creamSize?: CreamSize,
    
) => {

        const details = [];
        
          if (creamSize && creamType) {
            const typeName = mapCreamType[creamType];
            details.push(`${typeName} ${creamSize}0 g`);
          }
        
          if (ingredients) {
            details.push(...ingredients.map((ingredient) => ingredient.name));
          }
    
    return details.join(', ');
}