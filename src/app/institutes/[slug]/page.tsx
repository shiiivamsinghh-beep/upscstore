import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import { ArrowLeft, School } from "lucide-react";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

function formatInstituteName(slug: string): string {
    // Basic normalization: "vision-ias" -> "Vision IAS"
    return slug
        .split('-')
        .map(word => {
            if (word.toLowerCase() === 'ias') return 'IAS';
            if (word.toLowerCase() === 'pcs') return 'PCS';
            if (word.toLowerCase() === 'and') return '&';
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

export async function generateMetadata(props: PageProps) {
    const params = await props.params;
    const name = formatInstituteName(params.slug);
    return {
        title: `${name} Notes & Material | UPSC Store`,
        description: `Buy ${name} printed notes, test series, and optional material. Best quality spiral binding.`,
    };
}

export default async function InstituteProductPage(props: PageProps) {
    const params = await props.params;
    const instituteSlug = params.slug;
    const instituteName = formatInstituteName(instituteSlug);

    // Fetch products that match the institute name
    // Using simple ILIKE search. In production, an 'institute_id' or distinct table would be better.
    const { data: products } = await supabase
        .from('products')
        .select('*')
        .ilike('institute', `%${instituteName.replace('&', '')}%`); // Handle "Vajiram & Ravi" vs "Vajiram Ravi" database variance

    // Fallback: Try fetching just by the first word if empty (e.g. "Vajiram")
    let finalProducts = products;
    if (!products || products.length === 0) {
        const firstWord = instituteName.split(' ')[0];
        const { data: retryProducts } = await supabase
            .from('products')
            .select('*')
            .ilike('institute', `%${firstWord}%`);
        finalProducts = retryProducts;
    }

    const productList = (finalProducts as unknown as Product[]) || [];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <Link
                        href="/institutes"
                        className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-slate-900 mb-6 transition-colors uppercase tracking-wider"
                    >
                        <ArrowLeft className="w-3 h-3 mr-1" />
                        Back to Institutes
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 shadow-inner">
                            <School className="h-8 w-8 md:h-10 md:w-10 text-slate-700" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
                                {instituteName}
                            </h1>
                            <p className="text-slate-500 mt-1">
                                {productList.length} materials available
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 py-8 md:py-12">
                {productList.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
                        {productList.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-400 mb-2">No materials found for {instituteName}.</p>
                        <p className="text-sm text-slate-400">Try searching for specific notes in the top bar.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
