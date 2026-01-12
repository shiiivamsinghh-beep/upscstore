import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import {
    ArrowLeft, BookOpen, Files, Lightbulb, Target,
    BookMarked, Newspaper, PenTool, Map, GraduationCap
} from "lucide-react";

export const revalidate = 60;

const categoryConfig: Record<string, { name: string; description: string; icon: any; from: string; to: string; text: string }> = {
    gs: {
        name: "General Studies",
        description: "Comprehensive notes for GS 1, 2, 3 & 4 Mains & Prelims.",
        icon: BookOpen,
        from: "from-blue-600",
        to: "to-indigo-700",
        text: "text-blue-50"
    },
    optional: {
        name: "Optionals",
        description: "Subject-specific notes for Sociology, PSIR, Geography & more.",
        icon: Files,
        from: "from-amber-500",
        to: "to-orange-600",
        text: "text-amber-50"
    },
    csat: {
        name: "CSAT",
        description: "Maths, Reasoning & Comprehension mastery for Prelims.",
        icon: Lightbulb,
        from: "from-emerald-500",
        to: "to-teal-600",
        text: "text-emerald-50"
    },
    "test-series": {
        name: "Test Series",
        description: "Mock tests from top institutes like Vision, Forum & Vajiram.",
        icon: Target,
        from: "from-red-500",
        to: "to-rose-600",
        text: "text-red-50"
    },
    ncert: {
        name: "NCERT Books",
        description: "The foundational textbooks for every UPSC aspirant.",
        icon: BookMarked,
        from: "from-indigo-500",
        to: "to-violet-600",
        text: "text-indigo-50"
    },
    "current-affairs": {
        name: "Current Affairs",
        description: "Monthly magazines, yearly compilations & budget analysis.",
        icon: Newspaper,
        from: "from-cyan-500",
        to: "to-blue-600",
        text: "text-cyan-50"
    },
    essay: {
        name: "Essay & Ethics",
        description: "Model essays, quotes & strategy guides for high scores.",
        icon: PenTool,
        from: "from-pink-500",
        to: "to-rose-600",
        text: "text-pink-50"
    },
    maps: {
        name: "Maps & Atlas",
        description: "High-quality maps for Geography & International Relations.",
        icon: Map,
        from: "from-slate-700",
        to: "to-slate-900",
        text: "text-slate-50"
    },
    mentorship: {
        name: "Mentorship",
        description: "Personal guidance programs and interview preparation.",
        icon: GraduationCap,
        from: "from-violet-800",
        to: "to-slate-900",
        text: "text-violet-50"
    },
    // --- Optional Subjects ---
    psir: {
        name: "Political Science & IR",
        description: "Comprehensive notes for PSIR Optional.",
        icon: Files, // Fallback
        from: "from-blue-600",
        to: "to-blue-800",
        text: "text-blue-50"
    },
    sociology: {
        name: "Sociology",
        description: "Complete study material for Sociology Optional.",
        icon: Files,
        from: "from-rose-500",
        to: "to-rose-700",
        text: "text-rose-50"
    },
    geography: {
        name: "Geography",
        description: "Maps and notes for Geography Optional.",
        icon: Map,
        from: "from-emerald-600",
        to: "to-teal-700",
        text: "text-emerald-50"
    },
    "public-administration": {
        name: "Public Administration",
        description: "Governance notes for Pub Ad Optional.",
        icon: Files,
        from: "from-indigo-600",
        to: "to-violet-700",
        text: "text-indigo-50"
    },
    history: {
        name: "History",
        description: "Ancient to Modern History Optional notes.",
        icon: BookOpen,
        from: "from-orange-500",
        to: "to-amber-700",
        text: "text-orange-50"
    },
    anthropology: {
        name: "Anthropology",
        description: "Paper 1 & 2 notes for Anthropology.",
        icon: Files,
        from: "from-amber-500",
        to: "to-orange-600",
        text: "text-amber-50"
    },
    // --- State PCS ---
    "state-pcs": {
        name: "State PCS",
        description: "Specialized material for State Public Service Commissions.",
        icon: Map,
        from: "from-slate-700",
        to: "to-slate-900",
        text: "text-slate-50"
    },
    uppcs: {
        name: "UPPCS (Uttar Pradesh)",
        description: "UP Special GK, Hindi & Current Affairs for UPPCS.",
        icon: Map, // Fallback
        from: "from-red-600",
        to: "to-red-800",
        text: "text-red-50"
    },
    bpsc: {
        name: "BPSC (Bihar)",
        description: "Bihar Special, History & Current Affairs.",
        icon: Map,
        from: "from-blue-600",
        to: "to-blue-800",
        text: "text-blue-50"
    },
    ras: {
        name: "RPSC (Rajasthan)",
        description: "Rajasthan History, Culture & Geography.",
        icon: Map,
        from: "from-orange-500",
        to: "to-orange-700",
        text: "text-orange-50"
    },
    mppsc: {
        name: "MPPSC (Madhya Pradesh)",
        description: "MP GK, Tribal History & Geography.",
        icon: Map,
        from: "from-green-600",
        to: "to-green-800",
        text: "text-green-50"
    },
    hcs: {
        name: "HCS (Haryana)",
        description: "Haryana GK & Current Affairs.",
        icon: Map,
        from: "from-indigo-600",
        to: "to-indigo-800",
        text: "text-indigo-50"
    },
    ukpsc: {
        name: "UKPSC (Uttarakhand)",
        description: "Uttarakhand Special GK & Geography.",
        icon: Map,
        from: "from-teal-600",
        to: "to-teal-800",
        text: "text-teal-50"
    }
};

interface PageProps {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata(props: PageProps) {
    const params = await props.params;
    // Handle both /category/history and /category/optional/history
    // We always care about the LAST segment for the actual content
    const activeSlug = params.slug[params.slug.length - 1];

    const config = categoryConfig[activeSlug];
    if (!config) return { title: "Category Not Found" };
    return { title: `${config.name} | UPSC Store`, description: config.description };
}

export default async function CategoryPage(props: PageProps) {
    const params = await props.params;
    const activeSlug = params.slug[params.slug.length - 1];
    const config = categoryConfig[activeSlug];

    const { data: products } = await supabase
        .from('products')
        .select('*')
        .eq('category', activeSlug);

    const productList = (products as unknown as Product[]) || [];

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">

            {/* 1. Immersive Hero Header */}
            <div className={`relative overflow-hidden bg-gradient-to-br ${config ? `${config.from} ${config.to}` : "from-slate-800 to-black"} text-white`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
                <div className="absolute -right-10 -bottom-10 opacity-20">
                    {config && <config.icon className="h-48 w-48 md:h-64 md:w-64 rotate-12" />}
                </div>

                <div className="container mx-auto px-4 py-4 md:py-12 relative z-10">
                    <Link href="/categories" className="inline-flex items-center text-xs md:text-sm text-white/70 hover:text-white mb-2 md:mb-8 transition-colors group">
                        <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Back to Categories
                    </Link>

                    <div className="flex items-center gap-4 md:gap-6">
                        {config ? (
                            <>
                                <div className="h-10 w-10 md:h-20 md:w-20 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/10 shrink-0">
                                    <config.icon className="h-5 w-5 md:h-10 md:w-10 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl md:text-4xl font-bold font-heading mb-1 md:mb-2 tracking-tight">
                                        {config.name}
                                    </h1>
                                    <p className="text-xs md:text-lg text-white/80 max-w-xl leading-snug line-clamp-2 md:line-clamp-none">
                                        {config.description}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div>
                                <h1 className="text-3xl font-bold capitalize">{activeSlug}</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 2. Responsive Product Grid */}
            <div className="container mx-auto px-4 py-6 md:py-10 -mt-6 md:-mt-8 relative z-20">
                <div className="bg-white rounded-3xl p-4 md:p-8 shadow-xl border border-slate-100 min-h-[400px]">
                    {productList.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
                            {productList.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <BookOpen className="h-8 w-8 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">Coming Soon</h3>
                            <p className="text-slate-500 max-w-md mx-auto">
                                We are currently stocking up high-quality materials for {config?.name || activeSlug}. Check back in 24 hours.
                            </p>
                            <Link href="/" className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-slate-900 px-6 text-sm font-bold text-white transition-colors hover:bg-slate-800">
                                Browse All Materials
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
