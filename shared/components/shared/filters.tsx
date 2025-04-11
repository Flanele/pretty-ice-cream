'use client';

import { Input } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { RangeSlider } from "./range-slider";
import { Title } from "./title";
import React from "react";
import { useQueryFilters, useFilters, useIngredients  } from "@/shared/hooks";

interface Props {
    className?: string;
}


export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading } = useIngredients();
    const filters = useFilters();

    useQueryFilters(filters);

    const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

    const updatePrices = (prices: number[]) => {
        filters.setPrices('priceFrom', prices[0]);
        filters.setPrices('priceTo', prices[1]);
    }

    return (
        <div className={className}>
            <Title text="Filters" size="sm" className="mb-5 font-bold" />

            <CheckboxFiltersGroup
                title="Cream type"
                name="creamTypes"
                className="mb-5"
                onClickCheckbox={filters.setCreamTypes}
                selected={filters.creamTypes}
                items={[
                { text: 'Classic', value: '1' },
                { text: 'Vegan', value: '2' },
                ]}
            />


            <CheckboxFiltersGroup
                name="sizes"
                className="mb-5"
                title='Sizes'
                onClickCheckbox={filters.setSizes}
                selected={filters.sizes}
                items={[
                    { text: '200 g', value: '20' },
                    { text: '300 g', value: '30' },
                    { text: '400 g', value: '40' }
                ]}
             />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Price from and to:</p>
                <div className="flex gap-3 mb-5">
                    <Input 
                        type="number" 
                        placeholder="0" 
                        min={0} max={100} 
                        value={String(filters.prices.priceFrom)} 
                        onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
                    />
                    <Input 
                        type="number" 
                        min={100} max={100} 
                        placeholder="100" 
                        value={String(filters.prices.priceTo)} 
                        onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
                    />
                </div>  
                
                <RangeSlider
                    min={0}
                    max={100}
                    step={1}
                    value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 100]}
                    onValueChange={updatePrices}
                />            
            </div>

            <CheckboxFiltersGroup
                title='Ingredients'
                name='ingredients'
                className='mt-5'
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={filters.setSelectedIngredients}
                selected={filters.selectedIngredients}
             />
        </div>
    );
};