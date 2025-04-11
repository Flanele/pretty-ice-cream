import React from "react";
import { Variant } from "../components/shared/group-variants";
import { CreamSize, CreamType } from "../constants/cream";
import { useSet } from "react-use";
import { getAvailableCreamSizes } from "../lib";
import { ProductItem } from "@prisma/client";
import { getAvailableCreamTypes } from "../lib/get-available-cream-types";

interface ReturnProps {
    size: CreamSize;
    type: CreamType;
    selectedIngredients: Set<number>;
    availableSizes: Variant[];
    availableTypes: Variant[];
    currentItemId?: number;
    setSize: (size: CreamSize) => void;
    setType: (type: CreamType) => void;
    addIngredient: (id: number) => void;
}

export const useProductOptions = (items: ProductItem[]): ReturnProps => {

        const [size, setSize] = React.useState<CreamSize>(20);
        const [type, setType] = React.useState<CreamType>(1);
        const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

        const availableSizes = getAvailableCreamSizes(type, items);
        const availableTypes = getAvailableCreamTypes(size, items);

        const currentItemId = items.find((item) => item.creamType === type && item.size === size)?.id;

        React.useEffect(() => {
            // Проверка доступности типа для текущего размера
            const isAvailableType = availableTypes?.find((item) => Number(item.value) === type && !item.disabled);
            const availableType = availableTypes?.find((item) => !item.disabled);
        
            if (!isAvailableType && availableType) {
                setType(Number(availableType.value) as CreamType);
            }
        
            // Проверка доступности размера для текущего типа
            const isAvailableSize = availableSizes?.find((item) => Number(item.value) === size && !item.disabled);
            const availableSize = availableSizes?.find((item) => !item.disabled);
        
            if (!isAvailableSize && availableSize) {
                setSize(Number(availableSize.value) as CreamSize);
            }
        
        }, [size, type]);

    return {
        size,
        type,
        selectedIngredients,
        availableSizes,
        availableTypes,
        currentItemId,
        setSize,
        setType,
        addIngredient
    }
}

