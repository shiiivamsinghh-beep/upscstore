"use client";

import Link from 'next/link';
import { ShoppingCart, Search, Menu, BookOpen, X } from 'lucide-react';
import { CartCounter } from '@/components/cart/CartCounter';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

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
        { name: "General Studies", href: "/?category=gs" },
        { name: "Optionals", href: "/?category=optional" },
        { name: "Test Series", href: "/?category=test-series" },
        { name: "Current Affairs", href: "/?category=current-affairs" }
    ];

    return (
        <>
            {/* 
              Desktop: Solid White Background, High Utility
              Mobile: Glass/Solid Hybrid 
            */}
            <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
                <div className="container mx-auto flex h-16 items-center gap-4 px-4 justify-between md:justify-start">

                    {/* --- LEFT: Logo & Mobile Trigger --- */}
                    <div className="flex items-center gap-2 md:gap-4 shrink-0">
                        {/* Mobile Menu Trigger */}
                        <button
                            className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        <Link href="/" className="flex items-center gap-2">
                            <BookOpen className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold tracking-tight text-foreground font-heading hidden sm:inline-block">UPSC Store</span>
                            <span className="text-xl font-bold tracking-tight text-foreground font-heading sm:hidden">UPSC</span>
                        </Link>
                    </div>

                    {/* --- CENTER: Search Bar (Desktop Only) --- */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-auto px-6">
                        <form
                            onSubmit={handleSearch}
                            className="relative w-full flex items-center"
                        >
                            <input
                                type="text"
                                placeholder="Search for notes, books, test series..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 pl-4 pr-10 rounded-lg border border-input bg-muted/40 hover:bg-muted/60 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Search className="h-4 w-4" />
                            </button>
                        </form>
                    </div>

                    {/* --- RIGHT: Actions & Desktop Nav Links --- */}
                    <div className="flex items-center gap-4 shrink-0">

                        {/* Desktop Nav Links (Short) */}
                        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground mr-2">
                            {navLinks.slice(0, 3).map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Search Button */}
                        <button
                            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        {/* Cart */}
                        <Link href="/cart" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all hover:scale-105 group">
                            <div className="relative">
                                <ShoppingCart className="h-6 w-6 group-hover:text-primary transition-colors" />
                                <CartCounter />
                            </div>
                            <span className="hidden lg:block text-sm font-medium group-hover:text-primary">Cart</span>
                        </Link>
                    </div>
                </div>

                {/* Mobile Search Bar (Expandable) */}
                {isSearchOpen && (
                    <div className="md:hidden border-t px-4 py-3 bg-background/95 backdrop-blur animate-in slide-in-from-top-1">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-muted text-sm"
                            />
                        </form>
                    </div>
                )}
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute top-0 left-0 bottom-0 w-[280px] bg-background border-r border-border shadow-2xl p-6 animate-in slide-in-from-left duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-xl font-bold font-heading">Menu</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 -mr-2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-border" />
                            <Link
                                href="/cart"
                                className="text-lg font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                Cart
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
