"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Check, Eye } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/lib/store';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const discount = product.originalPrice && product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;
    const addItem = useCart((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <Link href={`/product/${product.id}`} className="group relative block h-full">
            <div className="relative h-full rounded-2xl bg-white transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 flex flex-col overflow-hidden border border-gray-100">

                {/* --- Image Section with Overlay Actions --- */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Modern Glass Badge */}
                    {product.isBestSeller && (
                        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider bg-black/80 backdrop-blur-md rounded-full shadow-lg border border-white/10">
                            Best Seller
                        </div>
                    )}

                    {/* Discount Badge */}
                    {discount > 0 && (
                        <div className="absolute top-3 right-3 z-10 px-2 py-1 text-[10px] font-bold text-white bg-red-500 rounded-md shadow-sm">
                            -{discount}%
                        </div>
                    )}

                    {/* Hover Action Overlay (Slide Up) */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 bg-gradient-to-t from-black/60 to-transparent pt-12">
                        <button
                            onClick={handleAddToCart}
                            className={cn(
                                "w-full h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg backdrop-blur-md transition-all active:scale-95",
                                isAdded
                                    ? "bg-emerald-500 text-white border border-emerald-400"
                                    : "bg-white text-slate-900 hover:bg-amber-400 hover:text-black hover:border-amber-500 border border-white/20"
                            )}
                        >
                            {isAdded ? (
                                <>
                                    <Check className="h-4 w-4" /> Added
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="h-4 w-4" /> Add to Cart
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* --- Content Section --- */}
                <div className="p-5 flex flex-col flex-1">
                    {/* Institute Tag */}
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                            {product.institute || "Note"}
                        </span>

                        <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-slate-900 text-[15px] leading-snug line-clamp-2 mb-3 group-hover:text-amber-600 transition-colors min-h-[40px]">
                        {product.title}
                    </h3>

                    {/* Price Block */}
                    <div className="mt-auto pt-3 border-t border-slate-50 flex items-center gap-3">
                        <span className="text-xl font-bold text-slate-900">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-sm text-slate-400 line-through decoration-slate-300">₹{product.originalPrice}</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
