import Link from "next/link";
import {
    Library,
    Shapes,
    BrainCircuit,
    GraduationCap,
    Newspaper,
    Feather,
    School,
    Globe2,
    Target,
    ArrowRight
} from "lucide-react";

export const metadata = {
    title: "Browse Categories | UPSC Store",
    description: "Explore our comprehensive collection of UPSC study materials.",
};

export default function CategoriesPage() {
    const categories = [
        {
            id: "gs",
            name: "General Studies",
            description: "Complete GS 1-4 Material & Notes",
            icon: Library,
            gradient: "from-blue-500 to-indigo-600",
            bg: "bg-blue-50",
            span: "md:col-span-2",
            href: "/category/gs"
        },
        {
            id: "optional",
            name: "Optional Subjects",
            description: "Sociology, PSIR, Geography & more",
            icon: Shapes,
            gradient: "from-amber-400 to-orange-500",
            bg: "bg-amber-50",
            span: "md:col-span-1",
            href: "/category/optional"
        },
        {
            id: "state-pcs",
            name: "State PCS",
            description: "UPPCS, BPSC, RAS, MPPSC & more",
            icon: Globe2,
            gradient: "from-red-500 to-rose-600",
            bg: "bg-red-50",
            span: "md:col-span-1",
            href: "/category/state-pcs"
        },
        {
            id: "test-series",
            name: "Test Series",
            description: "Prelims & Mains Mock Tests",
            icon: Target,
            gradient: "from-red-500 to-pink-600",
            bg: "bg-red-50",
            span: "md:col-span-1",
            href: "/category/test-series"
        },
        {
            id: "ncert",
            name: "NCERT Books",
            description: "Class 6-12 Foundation Books",
            icon: School,
            gradient: "from-emerald-400 to-teal-500",
            bg: "bg-emerald-50",
            span: "md:col-span-2",
            href: "/category/ncert"
        },
        {
            id: "csat",
            name: "CSAT",
            description: "Maths & Reasoning Logic",
            icon: BrainCircuit,
            gradient: "from-violet-500 to-purple-600",
            bg: "bg-violet-50",
            span: "md:col-span-1",
            href: "/category/csat"
        },
        {
            id: "current-affairs",
            name: "Current Affairs",
            description: "Magazines & Yearbooks",
            icon: Newspaper,
            gradient: "from-cyan-500 to-blue-500",
            bg: "bg-cyan-50",
            span: "md:col-span-1",
            href: "/category/current-affairs"
        },
        {
            id: "essay",
            name: "Essay & Ethics",
            description: "Strategy & Model Papers",
            icon: Feather,
            gradient: "from-rose-400 to-red-500",
            bg: "bg-rose-50",
            span: "md:col-span-1",
            href: "/category/essay"
        },
        {
            id: "maps",
            name: "Maps & Atlas",
            description: "Geography Essentials",
            icon: Globe2,
            gradient: "from-slate-600 to-slate-800",
            bg: "bg-slate-50",
            span: "md:col-span-1",
            href: "/category/maps"
        },
        {
            id: "mentorship",
            name: "Mentorship",
            description: "Personal Guidance",
            icon: GraduationCap,
            gradient: "from-indigo-900 to-slate-900",
            bg: "bg-indigo-50",
            span: "md:col-span-1",
            href: "/category/mentorship"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 py-6 md:py-10">
            <div className="container mx-auto px-4 max-w-6xl">

                <div className="max-w-2xl mb-4 md:mb-8">
                    <h1 className="text-2xl md:text-5xl font-bold text-slate-900 font-heading tracking-tight mb-1 md:mb-4">
                        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Syllabus</span>
                    </h1>
                    <p className="hidden md:block text-lg text-slate-600">
                        Navigate through our curated collection of active study materials, designed to cover every aspect of the UPSC examination.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 auto-rows-[110px] md:auto-rows-[190px]">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={cat.href}
                            className={`group relative overflow-hidden rounded-xl md:rounded-3xl p-2 md:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${cat.span} bg-white border border-gray-100 flex flex-col items-center md:items-start justify-center md:justify-between text-center md:text-left`}
                        >
                            {/* Background Decor (Desktop Only) */}
                            <div className={`hidden md:block absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 scale-150 origin-top-right transform group-hover:scale-125`}>
                                <cat.icon className="h-64 w-64 text-slate-900" />
                            </div>

                            {/* Icon Blob */}
                            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center bg-gradient-to-br ${cat.gradient} text-white shadow-sm mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <cat.icon className="h-6 w-6 md:h-7 md:w-7" />
                            </div>

                            <div className="relative z-10 w-full px-1 md:px-0">
                                <h3 className="text-sm md:text-2xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 transition-all font-heading leading-tight md:leading-normal line-clamp-2 md:line-clamp-none">
                                    {cat.name}
                                </h3>

                                <p className="hidden md:block text-sm font-medium text-slate-500 mt-1 max-w-[90%]">
                                    {cat.description}
                                </p>
                            </div>

                            {/* Arrow (Desktop Only) */}
                            <div className="hidden md:flex absolute bottom-6 right-6 w-8 h-8 rounded-full bg-slate-100 items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                <ArrowRight className="h-4 w-4 text-slate-900" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
