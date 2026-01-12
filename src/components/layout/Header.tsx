"use client";

import Link from 'next/link';
import { ShoppingCart, Search, Menu, BookOpen, X, Phone, Truck, ShieldCheck, User, ChevronDown } from 'lucide-react';
import { CartCounter } from '@/components/cart/CartCounter';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';
import { CategoryStrip } from '@/components/home/CategoryStrip';
import { useScrollDirection } from '@/hooks/use-scroll-direction';

export function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchFocus, setIsSearchFocus] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const scrollDirection = useScrollDirection();

    // Focus mobile search when toggled
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Lock body scroll for mobile menu
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false); // Close mobile search if open
        }
    };

    const navLinks = [
        { name: "General Studies", href: "/category/gs" },
        { name: "Institutes", href: "/institutes" },
        { name: "Optionals", href: "/category/optional" },
        { name: "State PCS", href: "/category/state-pcs" },
        { name: "CSAT", href: "/category/csat" },
        { name: "Test Series", href: "/category/test-series" },
        { name: "NCERT Books", href: "/category/ncert" },
        { name: "Current Affairs", href: "/category/current-affairs" }
    ];

    return (
        <>
            <div
                className={cn(
                    "flex flex-col w-full font-sans bg-white sticky top-0 z-50 transition-transform duration-300 ease-in-out",
                    scrollDirection === 'down' && !isMobileMenuOpen ? "-translate-y-[56px]" : "translate-y-0"
                )}
            >

                {/* --- LAYER 1: TRUST STRIP (Desktop Only) --- */}
                <div className="hidden md:flex bg-[#0f172a] text-white/80 text-[11px] font-medium py-1.5 px-4 justify-between items-center tracking-wide border-b border-white/5">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="flex gap-6">
                            <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                                India's Most Trusted UPSC Store
                            </span>
                            <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                                <Truck className="h-3 w-3 text-amber-400" />
                                Fast Delivery across India
                            </span>
                        </div>
                        <div className="flex gap-6">
                            <Link href="/track-order" className="hover:text-white transition-colors">Track Your Order</Link>
                            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white hover:text-emerald-400 transition-colors font-bold">
                                <Phone className="h-3 w-3" />
                                Support: +91-98765-43210
                            </a>
                        </div>
                    </div>
                </div>

                {/* --- LAYER 2: DESKTOP HEADER (Clean, Static) --- */}
                <header className="hidden md:block bg-white border-b border-gray-100 z-40 relative">
                    <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-8">
                        {/* Left: Logo */}
                        <div className="flex items-center gap-3 shrink-0">
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="bg-[#0f172a] p-1.5 rounded-lg group-hover:bg-slate-800 transition-colors">
                                    <BookOpen className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex flex-col -space-y-1">
                                    <span className="text-2xl font-bold tracking-tight text-[#0f172a] font-heading">UPSC Store</span>
                                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest block">Aspirant's Ecosystem</span>
                                </div>
                            </Link>
                        </div>

                        {/* Center: Search */}
                        <div className="flex-1 max-w-2xl">
                            <form onSubmit={handleSearch} className="relative w-full group">
                                <input
                                    type="text"
                                    placeholder="Search 'Polity Notes' or 'Vision IAS'..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-11 pl-11 pr-4 rounded-full bg-slate-50 border-2 border-slate-100 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-400/10 transition-all shadow-sm group-hover:border-slate-200"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                            </form>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-6 shrink-0">
                            <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 -mr-2 rounded-lg transition-colors group">
                                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:border-amber-400 group-hover:text-amber-600 transition-colors text-slate-600">
                                    <User className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col text-sm leading-none">
                                    <span className="text-slate-500 text-[11px]">Welcome</span>
                                    <span className="font-bold text-slate-900 group-hover:text-amber-600">Login / Sign Up</span>
                                </div>
                            </div>

                            <Link href="/cart" className="relative group p-2 rounded-lg transition-colors">
                                <ShoppingCart className="h-6 w-6 text-slate-700 group-hover:text-amber-600 transition-colors" />
                                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                                    <CartCounter />
                                </span>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* --- LAYER 2: MOBILE HEADER SYSTEM (md:hidden) --- */}
                {/* We use a fixed height container to prevent layout jumps, but the actual bars are fixed/sticky */}
                <div className="md:hidden h-[104px]"> {/* Height of Brand Row (56px) + CategoryStrip (48px) approx */}

                    {/* VIEW A: DEFAULT (Brand + Categories) - Visible on UP */}
                    <div
                        className={cn(
                            "fixed top-0 left-0 right-0 z-40 bg-white transition-all duration-300 ease-in-out shadow-sm",
                            scrollDirection === 'down' ? "-translate-y-full opacity-0 invisible" : "translate-y-0 opacity-100 visible"
                        )}
                    >
                        {/* Brand Row */}
                        <div className="h-14 px-4 flex items-center justify-between border-b border-gray-50">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-700">
                                    <Menu className="h-6 w-6" />
                                </button>
                                <Link href="/" className="flex items-center gap-2">
                                    <div className="bg-[#0f172a] p-1.5 rounded-lg">
                                        <BookOpen className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-lg font-bold text-[#0f172a] font-heading">UPSC Store</span>
                                </Link>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="text-slate-700" onClick={() => window.alert("Search Click (Logic Pending)")}>
                                    <Search className="h-5 w-5" />
                                </button>
                                <Link href="/cart" className="relative">
                                    <ShoppingCart className="h-5 w-5 text-slate-700" />
                                    <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white ring-1 ring-white">
                                        <CartCounter />
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Category Strip */}
                        {pathname === '/' && <CategoryStrip />}
                    </div>

                    {/* VIEW B: COMPACT SEARCH (Search + Cart) - Visible on DOWN */}
                    <div
                        className={cn(
                            "fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-md h-14 px-4 flex items-center gap-3 transition-transform duration-300 ease-in-out",
                            scrollDirection === 'down' ? "translate-y-0" : "-translate-y-full"
                        )}
                    >
                        <form onSubmit={handleSearch} className="relative flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search for Products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-10 pl-10 pr-4 rounded-lg bg-slate-100 border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all shadow-sm text-slate-900 placeholder:text-slate-500"
                                />
                            </div>
                        </form>
                        <Link href="/cart" className="relative p-2">
                            <ShoppingCart className="h-6 w-6 text-slate-700" />
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                                <CartCounter />
                            </span>
                        </Link>
                    </div>
                </div>

                {/* --- LAYER 3: DESKTOP NAV (Keep as is) --- */}
                <div className="hidden md:block bg-white border-b border-gray-200 z-40 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
                    <div className="container mx-auto px-4">
                        <nav className="flex items-center gap-8 h-12 text-[13px] font-semibold text-slate-600 overflow-x-auto no-scrollbar">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="flex items-center gap-2 pr-4 border-r border-gray-200 hover:text-[#0f172a] transition-colors h-full"
                            >
                                <Menu className="h-4 w-4" />
                                <span>All Categories</span>
                            </button>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="hover:text-amber-600 hover:bg-amber-50 px-3 py-1.5 rounded-md transition-all whitespace-nowrap"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="ml-auto flex items-center gap-4 pl-4 border-l border-gray-200 h-full">
                                <Link href="/?category=best-sellers" className="flex items-center gap-1 text-amber-600 hover:text-amber-700">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span>Best Sellers</span>
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            {/* --- MOBILE DRAWER (Branded) --- */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white text-slate-900 shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
                        {/* Drawer Header */}
                        <div className="bg-[#0f172a] text-white p-6 relative overflow-hidden">
                            <div className="relative z-10 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="bg-white/10 p-2 rounded-full backdrop-blur-md">
                                        <User className="h-6 w-6 text-amber-400" />
                                    </div>
                                    <button onClick={() => setIsMobileMenuOpen(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-heading">Welcome, Aspirant</h3>
                                    <p className="text-sm text-slate-400">Login to track your progress</p>
                                </div>
                                <button className="w-full bg-amber-500 hover:bg-amber-600 text-[#0f172a] font-bold py-2.5 rounded-lg text-sm transition-colors shadow-lg shadow-amber-500/20">
                                    Login / Sign Up
                                </button>
                            </div>
                            {/* Decorative Circle */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                        </div>

                        {/* Drawer Content */}
                        <nav className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Browse Syllabus</div>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center justify-between py-3.5 border-b border-slate-50 text-slate-700 font-medium hover:text-amber-600 hover:pl-2 transition-all group"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                    <ChevronDown className="h-4 w-4 text-slate-300 -rotate-90 group-hover:text-amber-500 transition-colors" />
                                </Link>
                            ))}
                        </nav>

                        {/* Drawer Footer */}
                        <div className="p-4 bg-slate-50 border-t border-slate-100">
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    href="/track"
                                    className="flex flex-col items-center justify-center gap-2 bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:border-amber-200 transition-colors"
                                >
                                    <Truck className="h-5 w-5 text-slate-500" />
                                    <span className="text-xs font-bold text-slate-600">Track Order</span>
                                </Link>
                                <a
                                    href="https://wa.me/919876543210"
                                    className="flex flex-col items-center justify-center gap-2 bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors"
                                >
                                    <Phone className="h-5 w-5 text-emerald-500" />
                                    <span className="text-xs font-bold text-slate-600">Support</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
