import { ProductItem } from "@prisma/client";
import { creamSizes, CreamType } from "../constants/cream";
import { Variant } from "../components/shared/group-variants";

export const getAvailableCreamSizes = (
    type: CreamType,
    items: ProductItem[],
): Variant[] => {
    
        const filteredCreamsByType = items.filter((item) => item.creamType == type);
        return creamSizes.map((item) => ({
            name: item.name,
            value: item.value,
            disabled: !filteredCreamsByType.some((cream) => Number(cream.size) === Number(item.value))
        }));
};