import Link from "next/link";
import {
    ArrowLeft,
    Building2,
    Library,
    BookOpen,
    GraduationCap,
    School
} from "lucide-react";
import { InstituteLogo } from "@/components/ui/InstituteLogo";

export const metadata = {
    title: "Shop by Institute | UPSC Store",
    description: "Browse study materials from India's top coaching institutes like Vision IAS, Vajiram & Ravi, and more.",
};

const institutes = [
    {
        id: "vision-ias",
        name: "Vision IAS",
        description: "Known for GS & Test Series",
        logoUrl: "https://unavatar.io/visionias.in",
        icon: Building2,
        color: "text-blue-600",
        bg: "bg-blue-50",
        borderColor: "border-blue-200",
        href: "/institutes/vision-ias"
    },
    {
        id: "vajiram-and-ravi",
        name: "Vajiram & Ravi",
        description: "The Hub of UPSC Prep",
        logoUrl: "https://unavatar.io/vajiramandravi.com",
        icon: Library,
        color: "text-amber-600",
        bg: "bg-amber-50",
        borderColor: "border-amber-200",
        href: "/institutes/vajiram-and-ravi"
    },
    {
        id: "drishti-ias",
        name: "Drishti IAS",
        description: "Best for Hindi Medium & GS",
        logoUrl: "https://unavatar.io/drishtiias.com",
        icon: BookOpen,
        color: "text-red-600",
        bg: "bg-red-50",
        borderColor: "border-red-200",
        href: "/institutes/drishti-ias"
    },
    {
        id: "forum-ias",
        name: "Forum IAS",
        description: "Famous for Mains Guidance",
        logoUrl: "https://unavatar.io/forumias.com",
        icon: GraduationCap,
        color: "text-teal-600",
        bg: "bg-teal-50",
        borderColor: "border-teal-200",
        href: "/institutes/forum-ias"
    },
    {
        id: "insight-ias",
        name: "Insights IAS",
        description: "Daily Current Affairs Leader",
        logoUrl: "https://unavatar.io/insightsonindia.com",
        icon: School,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        borderColor: "border-indigo-200",
        href: "/institutes/insights-ias"
    },
    {
        id: "shankar-ias",
        name: "Shankar IAS",
        description: "Environment & South India Top",
        logoUrl: "https://unavatar.io/shankariasacademy.com",
        icon: Building2,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        borderColor: "border-emerald-200",
        href: "/institutes/shankar-ias"
    }
];

export default function InstitutesPage() {
    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-100 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <Link
                        href="/"
                        className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-slate-900 mb-6 transition-colors uppercase tracking-wider"
                    >
                        <ArrowLeft className="w-3 h-3 mr-1" />
                        Back to Home
                    </Link>
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 font-heading tracking-tight mb-4">
                            Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Institute</span>
                        </h1>
                        <p className="text-lg text-slate-600">
                            Don't know what category you need? Use materials directly from the coaching centers you admire.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl py-6 md:py-12">
                <div className="grid grid-cols-3 gap-2 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
                    {institutes.map((inst) => (
                        <Link
                            key={inst.id}
                            href={inst.href}
                            className={`group relative overflow-hidden bg-white p-2 md:p-6 rounded-xl md:rounded-2xl border ${inst.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block`}
                        >
                            <div className="flex items-start justify-between mb-2 md:mb-6">
                                <div className={`w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center bg-white border border-slate-100 p-1 md:p-2 transition-transform group-hover:scale-105 overflow-hidden relative`}>
                                    <InstituteLogo
                                        src={inst.logoUrl}
                                        alt={`${inst.name} Logo`}
                                        fallback={<inst.icon className={`h-5 w-5 md:h-7 md:w-7 ${inst.color}`} />}
                                    />
                                </div>
                                <div className="hidden md:flex h-8 w-8 rounded-full bg-slate-50 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -mr-2">
                                    <ArrowLeft className="h-4 w-4 text-slate-400 rotate-180" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] md:text-xl font-bold text-slate-900 mb-0.5 md:mb-2 group-hover:text-blue-700 transition-colors leading-tight">
                                    {inst.name}
                                </h3>
                                <p className="text-slate-500 text-[9px] md:text-sm font-medium leading-tight opacity-80 line-clamp-2">
                                    {inst.description}
                                </p>
                            </div>

                            {/* Decorative Blob */}
                            <div className={`absolute -right-3 -bottom-3 md:-right-6 md:-bottom-6 w-12 h-12 md:w-24 md:h-24 rounded-full ${inst.bg} opacity-50 group-hover:scale-150 transition-transform duration-500`} />
                        </Link>
                    ))}
                </div>

                {/* Coming Soon Section */}
                <div className="mt-8 md:mt-16 text-center">
                    <p className="text-xs md:text-sm text-slate-400 font-medium uppercase tracking-wider mb-4">More Institutes Joining Soon</p>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="px-3 py-1.5 md:px-4 md:py-2 bg-white rounded-full border border-slate-200 text-[10px] md:text-xs font-bold text-slate-500">Next IAS</div>
                        <div className="px-3 py-1.5 md:px-4 md:py-2 bg-white rounded-full border border-slate-200 text-[10px] md:text-xs font-bold text-slate-500">KSG</div>
                        <div className="px-3 py-1.5 md:px-4 md:py-2 bg-white rounded-full border border-slate-200 text-[10px] md:text-xs font-bold text-slate-500">ALS IAS</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
