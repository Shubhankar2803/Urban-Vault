import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    minPrice: string | null;
    maxPrice: string | null;
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
}

export const formatAsCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");
    const parts = numericValue.split(".");
    const formattedValue = parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");
    if (!formattedValue) return "";
    const numberValue = parseFloat(formattedValue);
    if (isNaN(numberValue)) return "";

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(numberValue);
};

export const PriceFilter = ({ minPrice, maxPrice, onMaxPriceChange, onMinPriceChange }: Props) => {
    // Add error handling
    if (!onMinPriceChange || !onMaxPriceChange) {
        console.error('PriceFilter: onMinPriceChange and onMaxPriceChange props are required');
        return null;
    }

    const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9.]/g, "");
        onMinPriceChange(value);
    };

    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9.]/g, "");
        onMaxPriceChange(value);
    };

    return (
        <div className="flex flex-col gap-4 p-4 border-2 border-black bg-white">
            <h3 className="text-lg font-black uppercase tracking-tight">Price Range</h3>
            
            <div className="flex flex-col gap-2">
                <Label className="font-bold text-sm uppercase tracking-wide">
                    Minimum Price
                </Label>
                <Input 
                    type="text"
                    placeholder="$0"
                    value={minPrice ? formatAsCurrency(minPrice) : ""}
                    onChange={handleMinPriceChange}
                    className="border-2 border-black rounded-none focus:bg-black focus:text-white"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label className="font-bold text-sm uppercase tracking-wide">
                    Maximum Price
                </Label>
                <Input 
                    type="text"
                    placeholder="∞"
                    value={maxPrice ? formatAsCurrency(maxPrice) : ""}
                    onChange={handleMaxPriceChange}
                    className="border-2 border-black rounded-none focus:bg-black focus:text-white"
                />
            </div>
        </div>
    );
};