import Link from 'next/link';
import { BookText, ScrollText, PenTool, GraduationCap, BookOpen, Globe, Scale, Newspaper } from 'lucide-react';

const categories = [
    {
        id: 'gs',
        name: 'General Studies',
        description: 'Foundation for Prelims & Mains',
        icon: BookText,
        href: '/category/gs',
        color: 'bg-blue-50 text-blue-600',
    },
    {
        id: 'optional',
        name: 'Optional Subjects',
        description: 'Comprehensive detailed notes',
        icon: ScrollText,
        href: '/category/optional',
        color: 'bg-amber-50 text-amber-600',
    },
    {
        id: 'test-series',
        name: 'Test Series',
        description: 'Evaluate your preparation',
        icon: PenTool,
        href: '/category/test-series',
        color: 'bg-emerald-50 text-emerald-600',
    },
    {
        id: 'csat',
        name: 'CSAT & Essays',
        description: 'Master the qualifying papers',
        icon: GraduationCap,
        href: '/category/csat',
        color: 'bg-purple-50 text-purple-600',
    },
    {
        id: 'ncert',
        name: 'NCERT Books',
        description: 'Basic foundation texts',
        icon: BookOpen,
        href: '/category/ncert',
        color: 'bg-rose-50 text-rose-600',
    },
    {
        id: 'current-affairs',
        name: 'Current Affairs',
        description: 'Monthly magazines & updates',
        icon: Globe,
        href: '/category/current-affairs',
        color: 'bg-cyan-50 text-cyan-600',
    },
    {
        id: 'state-pcs',
        name: 'State PCS',
        description: 'State specific exam material',
        icon: Scale,
        href: '/category/state-pcs',
        color: 'bg-indigo-50 text-indigo-600',
    },
    {
        id: 'magazines',
        name: 'Magazines',
        description: 'Yojana, Kurukshetra & more',
        icon: Newspaper,
        href: '/category/magazines',
        color: 'bg-slate-50 text-slate-600',
    },
];

export function CategoryGrid() {
    return (
        <section className="py-6 md:py-12 container mx-auto px-4">
            <div className="flex justify-between items-end mb-4 md:mb-8">
                <div>
                    <h2 className="font-heading text-xl md:text-3xl font-bold mb-1">Browse Categories</h2>
                    <p className="text-muted-foreground text-xs md:text-base">Everything you need, organized.</p>
                </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth -mx-4 px-4 md:mx-0 md:px-0">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={cat.href}
                        className="group relative min-w-[150px] md:min-w-[220px] bg-card p-4 md:p-6 rounded-xl border border-border hover:shadow-lg hover:border-secondary/50 transition-all duration-300 hover:-translate-y-1 block shrink-0"
                    >
                        <div className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl ${cat.color} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <cat.icon className="w-5 h-5 md:w-7 md:h-7" />
                        </div>

                        <h3 className="font-heading text-sm md:text-lg font-bold mb-1 group-hover:text-secondary transition-colors">
                            {cat.name}
                        </h3>
                        <p className="text-muted-foreground font-medium text-[10px] md:text-sm line-clamp-2">
                            {cat.description}
                        </p>

                        <div className="absolute right-3 top-3 md:right-4 md:top-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
