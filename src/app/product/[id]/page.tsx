import { notFound } from 'next/navigation';
import { Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AddToCartButton } from '@/components/products/AddToCartButton';
import { BuyNowButton } from '@/components/products/BuyNowButton';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';
import { ProductInfo } from '@/components/products/ProductInfo';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';
import { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const { data: product } = await supabase
        .from('products')
        .select('title, description, image')
        .eq('id', params.id)
        .single();

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: `${product.title} | UPSC Store`,
        description: product.description.substring(0, 160),
        openGraph: {
            images: [product.image],
        },
    };
}

export default async function ProductPage(props: PageProps) {
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

    return (
        <div className="bg-white min-h-screen pb-24 md:pb-12">
            {/* Mobile Header Overlap / Breadcrumb */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 md:hidden">
                <div className="px-4 h-14 flex items-center justify-between">
                    <Link href="/" className="p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div className="font-semibold text-sm truncate max-w-[200px] text-slate-900">
                        {product.title}
                    </div>
                    <button className="p-2 -mr-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
                        <Share2 className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <main className="container mx-auto px-4 md:px-6 py-4 md:py-12">
                {/* Desktop Breadcrumb */}
                <div className="hidden md:flex items-center text-sm text-slate-500 mb-8 space-x-2">
                    <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href={`/category/${product.category}`} className="hover:text-slate-900 transition-colors capitalize">
                        {product.category.replace('-', ' ')}
                    </Link>
                    <span>/</span>
                    <span className="text-slate-900 truncate max-w-[300px]">{product.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16">
                    {/* Left Column: Image Gallery */}
                    <div className="lg:col-span-7 space-y-6">
                        <ProductImageGallery
                            title={product.title}
                            images={[product.image]}
                            isBestSeller={product.isBestSeller}
                        />

                        {/* Additional info or reviews could go here in desktop view */}
                    </div>

                    {/* Right Column: Product Info & Actions */}
                    <div className="lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-24">
                            <ProductInfo
                                title={product.title}
                                institute={product.institute}
                                price={product.price}
                                originalPrice={product.originalPrice}
                                rating={product.rating}
                                reviews={product.reviews}
                                description={product.description}
                                className="mb-8"
                            />

                            {/* Desktop Actions */}
                            <div className="hidden md:grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                                <AddToCartButton product={product} className="w-full h-12 text-base shadow-sm border-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-50 hover:border-slate-300" />
                                <BuyNowButton product={product} className="w-full h-12 text-base shadow-lg shadow-orange-500/20" />
                            </div>

                            <div className="hidden md:flex justify-center mt-4">
                                <button className="text-sm font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors">
                                    <Share2 className="h-4 w-4" /> Share this Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-3 pb-[calc(12px+env(safe-area-inset-bottom))] bg-white border-t border-slate-100 md:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="grid grid-cols-2 gap-3">
                    <AddToCartButton product={product} className="w-full h-12 text-sm font-bold border-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-50 shadow-none px-2" />
                    {/* Inline style wrapper to force color */}
                    <div className="w-full h-12 rounded-lg overflow-hidden shadow-md">
                        <BuyNowButton product={product} className="w-full h-full text-sm font-bold text-white !bg-[#f59e0b]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
