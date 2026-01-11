import Link from 'next/link';
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
      <section className="relative bg-[#0f172a] py-16 md:py-24 text-white overflow-hidden">
        {/* Abstract Pattern Background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="container mx-auto px-4 relative z-10 text-center md:text-left md:flex md:items-center md:justify-between">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6 leading-tight">
              Premium UPSC Material.<br />
              <span className="text-secondary">Delivered at Light Speed.</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto md:mx-0">
              Get printed notes from Vision, Vajiram, and Forum IAS delivered to your doorstep. Verified quality, cash on delivery available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/?category=gs" className="inline-flex h-12 items-center justify-center rounded-lg bg-secondary px-8 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Shop General Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/?category=optional" className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/50 px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Explore Optionals
              </Link>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="hidden md:block w-1/3">
            <div className="relative aspect-square rounded-2xl bg-gradient-to-tr from-secondary/20 to-slate-800 p-8 border border-white/10 rotate-3 transform hover:rotate-6 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-4 bg-slate-950 rounded-xl border border-white/5 flex items-center justify-center shadow-2xl flex-col gap-2">
                <span className="text-6xl font-black text-slate-800 select-none">UPSC</span>
                <span className="text-sm text-slate-700 font-mono tracking-widest uppercase">Rank 1 Quality</span>
              </div>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
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
