import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { InstituteStrip } from '@/components/home/InstituteStrip';
import { ProductGrid } from '@/components/home/ProductGrid';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home(props: { searchParams: Promise<{ category?: string }> }) {
  const searchParams = await props.searchParams;
  const category = searchParams.category;

  // Handle legacy query params by redirecting to new routes
  if (category) {
    redirect(`/category/${category}`);
  }

  // Fetch trendings/all products from Supabase
  // Limiting to 12 for the homepage to keep it fast
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .limit(12);

  const productList = (products as unknown as Product[]) || [];

  return (
    <div className="flex flex-col min-h-screen bg-background animate-in fade-in duration-500">

      <HeroSection />

      <FeaturesSection />

      <CategoryGrid />

      <InstituteStrip />

      <ProductGrid
        title="Trending Materials"
        products={productList}
      />

    </div>
  );
}
