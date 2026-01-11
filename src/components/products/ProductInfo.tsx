'use client';

import { Star, ShieldCheck, Truck, BookOpen, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ProductInfoProps {
    title: string;
    institute: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    description: string;
    className?: string;
}

export function ProductInfo({
    title,
    institute,
    price,
    originalPrice,
    rating,
    reviews,
    description,
    className,
}: ProductInfoProps) {
    const hasDiscount = originalPrice > price && originalPrice > 0;
    const discount = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const [isDescExpanded, setIsDescExpanded] = useState(false);

    return (
        <div className={cn("flex flex-col", className)}>
            <div className="mb-1 text-sm font-semibold text-blue-600 uppercase tracking-wider">
                {institute}
            </div>

            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 leading-tight tracking-tight text-balance">
                {title}
            </h1>

            <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                    <span className="font-bold text-green-700 text-sm">{rating}</span>
                    <Star className="h-3.5 w-3.5 fill-green-700 text-green-700" />
                </div>
                <span className="text-sm text-slate-500 font-medium">
                    {reviews} Verified Reviews
                </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-slate-900">₹{price}</span>
                {hasDiscount && (
                    <>
                        <span className="text-lg text-slate-400 line-through">₹{originalPrice}</span>
                        <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                            {discount}% OFF
                        </span>
                    </>
                )}
            </div>

            {/* Trust Signals */}
            {/* Trust Signals */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:border-slate-200">
                    <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">100% Original Print</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:border-slate-200">
                    <Truck className="h-4 w-4 text-orange-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">Fast Dispatch</span>
                </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
                <h3 className="text-slate-900 font-bold mb-3 flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-slate-500" />
                    About this Material
                </h3>

                <div className={cn("relative overflow-hidden transition-all duration-300",
                    isDescExpanded ? "max-h-full" : "max-h-[120px]"
                )}>
                    <div className="prose prose-sm text-slate-600 leading-relaxed max-w-none">
                        <p>{description}</p>
                        <ul className="mt-4 space-y-2 list-none pl-0">
                            <li className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                                Complete syllabus coverage.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                                Latest updated edition (2025-26).
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                                Clear, legible font size.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                                Spiral binding for easy reading.
                            </li>
                        </ul>
                    </div>

                    {!isDescExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
                    )}
                </div>

                <button
                    onClick={() => setIsDescExpanded(!isDescExpanded)}
                    className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                    {isDescExpanded ? "Read Less" : "Read More"}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isDescExpanded ? "rotate-180" : "")} />
                </button>
            </div>
        </div>
    );
}
