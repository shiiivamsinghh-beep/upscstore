import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, ShieldCheck, Truck, BookOpen, Share2 } from 'lucide-react';
import { AddToCartButton } from '@/components/products/AddToCartButton';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

    const { data: productData, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();

    if (error || !productData) {
        notFound();
    }

    const product = productData as unknown as Product;

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return (
        <div className="bg-muted/30 min-h-screen pb-20">
            {/* Breadcrumb would go here */}

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery Section */}
                    <div className="space-y-4">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {product.isBestSeller && (
                                <div className="absolute top-4 left-4 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-white shadow-lg uppercase tracking-wider">
                                    Best Seller
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="flex flex-col">
                        <div className="mb-2 text-sm font-semibold text-secondary uppercase tracking-wider">
                            {product.institute}
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                            {product.title}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                                <span className="font-bold text-green-700">{product.rating}</span>
                                <Star className="h-4 w-4 fill-green-700 text-green-700" />
                            </div>
                            <span className="text-sm text-muted-foreground underline decoration-dotted underline-offset-4">
                                {product.reviews} Verified Reviews
                            </span>
                        </div>

                        <div className="flex items-end gap-3 mb-6">
                            <span className="text-4xl font-bold text-foreground">₹{product.price}</span>
                            <span className="text-lg text-muted-foreground line-through mb-1.5">₹{product.originalPrice}</span>
                            <span className="text-sm font-bold text-green-600 mb-2">({discount}% OFF)</span>
                        </div>

                        {/* Trust Signals */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border">
                                <ShieldCheck className="h-5 w-5 text-blue-600" />
                                <span className="text-xs font-medium">100% Original Print</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border">
                                <Truck className="h-5 w-5 text-orange-600" />
                                <span className="text-xs font-medium">Fast Dispatch</span>
                            </div>
                        </div>

                        <div className="prose prose-sm text-muted-foreground mb-8">
                            <h3 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                About this Material
                            </h3>
                            <p>{product.description}</p>
                            <ul className="mt-4 space-y-2 list-disc pl-4">
                                <li>Complete syllabus coverage.</li>
                                <li>Latest updated edition (2025-26).</li>
                                <li>Clear, legible font size.</li>
                                <li>Spiral binding for easy reading.</li>
                            </ul>
                        </div>

                        {/* Desktop Add to Cart */}
                        <div className="hidden md:flex gap-4 mt-auto">
                            <AddToCartButton product={product} />
                            <button className="h-12 w-12 flex items-center justify-center rounded-lg border border-border bg-white text-muted-foreground hover:bg-muted hover:text-foreground">
                                <Share2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Add to Cart */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border md:hidden z-50">
                <AddToCartButton product={product} className="w-full shadow-lg" />
            </div>
        </div>
    );
}
