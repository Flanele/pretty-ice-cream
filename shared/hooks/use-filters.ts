import { useRouter, useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    creamTypes: string;
    sizes: string;
    ingredients: string
}

export interface Filters {
    sizes: Set<string>;
    creamTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setCreamTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
  
    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
      new Set<string>(searchParams.get('ingredients')?.split(',')),
    );
  
    const [sizes, { toggle: toggleSizes }] = useSet(
      new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []),
    );
  
    const [creamTypes, { toggle: toggleCreamTypes }] = useSet(
      new Set<string>(
        searchParams.has('creamTypes') ? searchParams.get('creamTypes')?.split(',') : [],
      ),
    );
  
    const [prices, setPrices] = React.useState<PriceProps>({
      priceFrom: Number(searchParams.get('priceFrom')) || undefined,
      priceTo: Number(searchParams.get('priceTo')) || undefined,
    });
  
    const updatePrice = (name: keyof PriceProps, value: number) => {
      setPrices((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    return React.useMemo(
      () => ({
        sizes,
        creamTypes,
        selectedIngredients,
        prices,
        setPrices: updatePrice,
        setCreamTypes: toggleCreamTypes,
        setSizes: toggleSizes,
        setSelectedIngredients: toggleIngredients,
      }),
      [sizes, creamTypes, selectedIngredients, prices],
    );
  };
  