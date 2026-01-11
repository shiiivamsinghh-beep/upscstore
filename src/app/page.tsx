import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Truck, ShieldCheck } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home(props: { searchParams: Promise<{ category?: string }> }) {
  const searchParams = await props.searchParams;
  const category = searchParams.category;

  // Fetch real data from Supabase
  let query = supabase.from('products').select('*');

  if (category) {
    query = query.eq('category', category);
  } else {
    // If no category, maybe limit to featured or just all?
    // Let's show all for now or maybe limit to 10
    query = query.limit(20);
  }

  const { data: products } = await query;
  const productList = (products as unknown as Product[]) || [];

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Premium UPSC Material. <br className="hidden md:block" />
              <span className="text-secondary">Delivered at Light Speed.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-300 md:text-xl">
              Get the highest quality printed notes from Vision IAS, Vajiram, and more.
              Verified quality, spiral bound, and delivered to your doorstep.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-4">
              <Link
                href="/?category=gs"
                className="inline-flex h-12 items-center justify-center rounded-full bg-secondary px-8 text-sm font-bold text-white transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                Shop General Studies
              </Link>
              <Link
                href="/?category=optional"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-8 text-sm font-bold text-white transition-all hover:bg-white/20 hover:border-white/40"
              >
                Explore Optionals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: "Next-Day Dispatch", desc: "Orders shipped within 24 hours." },
            { icon: ShieldCheck, title: "Verified Quality", desc: "No missing pages. Crystal clear print." },
            { icon: CheckCircle2, title: "Cash on Delivery", desc: "Pay only when you receive your notes." }
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-4 p-6 rounded-xl border border-border bg-white shadow-sm transition-all hover:shadow-md">
              <div className="p-3 rounded-lg bg-orange-50 text-secondary">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4" id="shop">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-primary">
            {category ?
              (category === 'gs' ? 'General Studies' : category === 'test-series' ? 'Test Series' : category === 'optional' ? 'Optional Subjects' : 'Materials')
              : "Trending Materials"}
          </h2>
          {category ?
            <Link href="/" className="text-sm font-medium text-secondary hover:underline">View All Materials</Link>
            :
            <Link href="/?category=gs" className="text-sm font-medium text-secondary hover:underline">View All</Link>
          }
        </div>

        {productList.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-xl border border-dashed border-border bg-muted/30">
            <p className="text-muted-foreground">No products found in this category.</p>
            <Link href="/" className="mt-4 inline-block text-sm text-primary underline">Go back home</Link>
          </div>
        )}
      </section>
    </div>
  );
}
