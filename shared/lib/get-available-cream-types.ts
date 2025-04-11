import { ProductItem } from "@prisma/client";
import { CreamSize, creamTypes } from "../constants/cream";
import { Variant } from "../components/shared/group-variants";

export const getAvailableCreamTypes = (
    _size: CreamSize, 
    items: ProductItem[],
): Variant[] => {
    const allAvailableTypes = new Set(items.map((item) => item.creamType));

    return creamTypes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !allAvailableTypes.has(Number(item.value)), 
    }));
};