"use client";

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

export function InstituteStrip() {
    return (
        <section className="py-8 md:py-12 bg-slate-50/50 border-y border-slate-100 relative z-0">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="font-heading text-xl md:text-3xl font-bold mb-1 text-slate-900">Browse by Coaching</h2>
                        <p className="text-slate-500 text-xs md:text-sm font-medium">Study Materials from Top Institutes</p>
                    </div>
                    <Link href="/institutes" className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors">
                        View All <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth -mx-4 px-4 md:mx-0 md:px-0">
                    {institutes.map((inst) => (
                        <Link
                            key={inst.id}
                            href={inst.href}
                            className={`group relative min-w-[140px] md:min-w-[180px] bg-white p-4 rounded-xl border ${inst.borderColor} shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block shrink-0`}
                        >
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center bg-white border border-slate-100 p-2 transition-transform group-hover:scale-105 overflow-hidden relative shadow-sm`}>
                                    <InstituteLogo
                                        src={inst.logoUrl}
                                        alt={`${inst.name} Logo`}
                                        fallback={<inst.icon className={`h-6 w-6 ${inst.color}`} />}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-xs md:text-sm font-bold text-slate-900 leading-tight mb-1.5 group-hover:text-amber-600 transition-colors">
                                        {inst.name}
                                    </h3>
                                    <p className="text-[10px] text-slate-400 font-medium line-clamp-1">
                                        {inst.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
