"use client"
import { cn } from "@/lib/utils";
import { HydrationBoundary } from "@tanstack/react-query";
import { ChevronDownIcon, ChevronRightIcon, Tag } from "lucide-react";
import { useState } from "react";
import { PriceFilter } from "./PriceFilter";
import { useProductFilters } from "../../hooks/ProductFilters";
import { set } from "date-fns";
import { TagsFilter } from "./TagsFilter";

interface Props {
    title: string;
    className?: string;
    children: React.ReactNode;
}

const ProductFilter = ({ title, className, children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

    return (
        <div className={cn("border-b border-gray-300 p-4 flex flex-col gap-2", className)}>
            <div onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-200 p-2 -m-2 rounded">
                <p className="font-semibold uppercase tracking-wide text-gray-800">{title}</p>
                <Icon className="h-4 w-4 text-gray-600" />
            </div>
            {isOpen && (
                <div className="flex flex-col gap-2 mt-2">
                    {children}
                </div>
            )}
        </div>
    )
}

export const ProductFilters = () => {
    const [filters, setFilters] = useProductFilters();
    

const hasAnyFilters = Object.entries(filters).some(([key, value]) => {
    if (key === "sort") return false;
    if (Array.isArray(value)) {
        return value.length > 0;
    }
    if (typeof value === "string") {
        return value !== "";
    }
    return value !== null;
});
   
    
    const onChange = (key: keyof typeof filters, value: unknown) => {
        setFilters({ ...filters, [key]: value });
    }

    const handleMinPriceChange = (value: string) => {
        onChange('minPrice', value);
    };

    const handleMaxPriceChange = (value: string) => {
        onChange('maxPrice', value);
    };

    const handleClearFilters = () => {
        setFilters({
            minPrice: null,
            maxPrice: null,
            tags:[],
        });
    };

    
    return (
        <HydrationBoundary>
            <div className="border border-gray-200 bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                    <p className="font-semibold uppercase tracking-wide text-gray-800">Filters</p>
                   
                   { hasAnyFilters && (  <button 
                        className="border cursor-pointer border-gray-300 px-4 py-2 font-medium uppercase tracking-wide text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 rounded" 
                        onClick={handleClearFilters} 
                        type="button"
                    >
                        Clear
                    </button>)}
                  
                </div>
                
                <ProductFilter title="Price Range">
                    <PriceFilter 
                        minPrice={filters.minPrice} 
                        maxPrice={filters.maxPrice}
                        onMinPriceChange={handleMinPriceChange}
                        onMaxPriceChange={handleMaxPriceChange}
                    />
                </ProductFilter>
                 <ProductFilter title="Tags">
                    <TagsFilter
                    value={filters.tags}
                    onChange={(value) => onChange('tags', value)}
                    />
                </ProductFilter>
            </div>
        </HydrationBoundary>
    )
}