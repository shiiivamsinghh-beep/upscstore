"use client";

import { useCart } from "@/lib/store";
import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
    product: Product;
    className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
    const addItem = useCart((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addItem(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAddToCart}
            className={cn(
                "h-12 px-8 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all active:scale-95",
                isAdded
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-primary text-primary-foreground hover:bg-primary/90",
                className
            )}
        >
            {isAdded ? (
                <>
                    <Check className="h-5 w-5" />
                    Added to Cart
                </>
            ) : (
                <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                </>
            )}
        </button>
    );
}
