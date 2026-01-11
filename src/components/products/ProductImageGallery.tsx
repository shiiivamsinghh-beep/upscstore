'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Expand, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
    title: string;
    images: string[];
    isBestSeller?: boolean;
}

export function ProductImageGallery({ title, images, isBestSeller }: ProductImageGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    // If - for some reason - no images are passed, fallback to a placeholder
    // Ensure we have valid images to display
    const validImages = images.filter(img => img && typeof img === 'string' && img.length > 0);
    const safeImages = validImages.length > 0 ? validImages : ['https://placehold.co/600x600?text=No+Image'];
    const activeImage = safeImages[selectedImageIndex];

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="w-full space-y-3 md:space-y-4">
            {/* Main Image Viewer */}
            <div
                className={cn(
                    "relative aspect-square w-full overflow-hidden rounded-xl md:rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group select-none",
                    isZoomed ? "cursor-zoom-out z-50 fixed inset-0 h-screen w-screen rounded-none border-0 m-0 aspect-auto bg-white/95" : "cursor-zoom-in"
                )}
                onClick={() => setIsZoomed(!isZoomed)}
            >
                <Image
                    src={activeImage}
                    alt={`${title} - View ${selectedImageIndex + 1}`}
                    fill
                    className={cn(
                        "object-contain transition-transform duration-500 will-change-transform p-2",
                        isZoomed ? "scale-100 md:scale-110" : "scale-100"
                    )}
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Navigation Arrows */}
                {safeImages.length > 1 && !isZoomed && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md text-slate-700 hover:bg-white transition-opacity opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100"
                        >
                            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md text-slate-700 hover:bg-white transition-opacity opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100"
                        >
                            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                    </>
                )}

                {isBestSeller && !isZoomed && (
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
                        <span className="inline-flex items-center justify-center rounded-full bg-slate-900 px-2.5 py-1 text-[10px] md:text-xs font-bold text-white shadow-lg uppercase tracking-wider">
                            Best Seller
                        </span>
                    </div>
                )}

                {!isZoomed && (
                    <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm p-1.5 md:p-2 rounded-full shadow-lg text-slate-700">
                            <Expand className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                    </div>
                )}
            </div>

            {/* Thumbnails (Only show if multiple images) */}
            {safeImages.length > 1 && (
                <div className="flex gap-2 md:gap-3 overflow-x-auto pb-1 md:pb-2 scrollbar-none snap-x">
                    {safeImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImageIndex(idx)}
                            className={cn(
                                "relative h-14 w-14 md:h-20 md:w-20 shrink-0 overflow-hidden rounded-lg border bg-white snap-start transition-all",
                                selectedImageIndex === idx
                                    ? "border-blue-600 ring-2 ring-blue-100 shadow-md"
                                    : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`${title} thumbnail ${idx + 1}`}
                                fill
                                className="object-contain p-1"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
