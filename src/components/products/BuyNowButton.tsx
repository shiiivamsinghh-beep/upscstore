"use client";

import { useCart } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface BuyNowButtonProps {
    product: Product;
    className?: string;
}

export function BuyNowButton({ product, className }: BuyNowButtonProps) {
    const addItem = useCart((state) => state.addItem);
    const router = useRouter();

    const handleBuyNow = () => {
        addItem(product);
        router.push("/cart");
    };

    return (
        <button
            onClick={handleBuyNow}
            className={cn(
                "h-12 px-8 rounded-lg font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-white shadow-md",
                className
            )}
            style={{ backgroundColor: '#f59e0b', color: 'white' }}
        >
            <Zap className="h-5 w-5 fill-white" />
            Buy Now
        </button>
    );
}
