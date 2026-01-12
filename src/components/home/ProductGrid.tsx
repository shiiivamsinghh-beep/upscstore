import Link from 'next/link';
import { ProductCard } from '@/components/products/ProductCard';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/Button';

interface ProductGridProps {
    title: string;
    category?: string;
    products: Product[];
}

export function ProductGrid({ title, category, products }: ProductGridProps) {
    return (
        <section className="py-6 md:py-12 container mx-auto px-4" id="shop">
            <div className="flex flex-row items-center justify-between mb-4 md:mb-8 gap-4">
                <div>
                    <h2 className="font-heading text-xl md:text-3xl font-bold">{title}</h2>
                    <div className="h-1 w-12 md:w-20 bg-secondary mt-1 md:mt-2 rounded-full" />
                </div>

                {category ? (
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-secondary h-8 text-xs">
                            View All
                        </Button>
                    </Link>
                ) : (
                    <Link href="/?category=gs">
                        <Button variant="outline" size="sm" className="rounded-full h-8 px-3 text-xs md:text-sm">
                            View All
                        </Button>
                    </Link>
                )}
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center rounded-xl border border-dashed border-border bg-muted/20">
                    <p className="text-muted-foreground text-xs md:text-lg mb-2">No products found.</p>
                    <Link href="/">
                        <Button size="sm" className="h-8 text-xs">Home</Button>
                    </Link>
                </div>
            )}
        </section>
    );
}
