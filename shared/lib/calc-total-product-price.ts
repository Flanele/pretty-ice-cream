import { Ingredient, ProductItem } from "@prisma/client";
import { CreamSize, CreamType } from "../constants/cream";

/**
 * Функция для подсчета общей стоимости мороженного
 * 
 * @param type - тип мороженного
 * @param size - размер
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @returns number общая стоимость
 */

export const calcTotalProductPrice = (
    type: CreamType, 
    size: CreamSize, 
    items: ProductItem[], 
    ingredients: Ingredient[],
    selectedIngredients: Set<number> 
) => {

    const creamPrice = items.find((item) => item.size === size && item.creamType === type)?.price || 0;
    const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

    return creamPrice + totalIngredientsPrice;
}