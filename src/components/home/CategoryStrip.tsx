"use client";

import Link from 'next/link';
import { BookText, ScrollText, PenTool, GraduationCap, Scale, Newspaper, BookOpen, Globe } from 'lucide-react';

const categories = [
    {
        id: 'gs',
        name: 'General Studies',
        icon: BookText,
        href: '/category/gs',
        color: 'bg-blue-50 text-blue-600',
    },
    {
        id: 'optional',
        name: 'Optional',
        icon: ScrollText,
        href: '/category/optional',
        color: 'bg-amber-50 text-amber-600',
    },
    {
        id: 'test-series',
        name: 'Test Series',
        icon: PenTool,
        href: '/category/test-series',
        color: 'bg-emerald-50 text-emerald-600',
    },
    {
        id: 'csat',
        name: 'CSAT',
        icon: GraduationCap,
        href: '/category/csat',
        color: 'bg-purple-50 text-purple-600',
    },
    {
        id: 'ncert',
        name: 'NCERT',
        icon: BookOpen,
        href: '/category/ncert',
        color: 'bg-rose-50 text-rose-600',
    },
    {
        id: 'current-affairs',
        name: 'Current Affairs',
        icon: Globe,
        href: '/category/current-affairs',
        color: 'bg-cyan-50 text-cyan-600',
    },
    {
        id: 'state-pcs',
        name: 'State PCS',
        icon: Scale,
        href: '/category/state-pcs',
        color: 'bg-indigo-50 text-indigo-600',
    },
    {
        id: 'magazines',
        name: 'Magazines',
        icon: Newspaper,
        href: '/category/magazines',
        color: 'bg-slate-50 text-slate-600',
    },
];

export function CategoryStrip() {
    return (
        <div className="bg-white border-b border-gray-100 md:hidden shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto no-scrollbar scroll-smooth">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={cat.href}
                        className="flex flex-col items-center gap-1.5 min-w-[64px] shrink-0 group"
                    >
                        <div className={`w-10 h-10 rounded-full ${cat.color} flex items-center justify-center transition-transform group-active:scale-95 shadow-sm`}>
                            <cat.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 text-center leading-tight line-clamp-2 tracking-wide">
                            {cat.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
