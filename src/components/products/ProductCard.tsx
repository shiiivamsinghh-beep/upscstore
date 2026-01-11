"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/lib/store';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const addItem = useCart((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if clicking the button
        addItem(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <Link href={`/product/${product.id}`} className="group relative rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md overflow-hidden flex flex-col h-full hover:border-primary/50">
            {/* Badge */}
            {product.isBestSeller && (
                <div className="absolute top-2 left-2 z-10 rounded bg-secondary px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                    Best Seller
                </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <div className="text-xs text-muted-foreground mb-1 font-medium tracking-wide uppercase">{product.institute}</div>
                <h3 className="font-semibold text-foreground line-clamp-2 min-h-[2.5rem] mb-2 leading-tight text-sm md:text-base group-hover:text-primary transition-colors">
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                    <span className="text-xs font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-foreground">₹{product.price}</span>
                            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
                        </div>
                        <div className="text-[10px] text-green-600 font-bold">{discount}% OFF</div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className={cn(
                            "h-9 w-9 rounded-full flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 z-20",
                            isAdded ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                    >
                        {isAdded ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                    </button>
                </div>
            </div>
        </Link>
    );
}
