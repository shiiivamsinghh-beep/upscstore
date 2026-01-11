"use client";

import Link from 'next/link';
import { ShoppingCart, Search, Menu, BookOpen, X } from 'lucide-react';
import { CartCounter } from '@/components/cart/CartCounter';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full glass">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Mobile Menu & Logo */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <BookOpen className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                        <span className="text-xl font-bold tracking-tight text-foreground font-heading">UPSC Store</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    {[
                        { name: "General Studies", href: "/?category=gs" },
                        { name: "Optionals", href: "/?category=optional" },
                        { name: "Test Series", href: "/?category=test-series" }
                    ].map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative group py-1 transition-colors hover:text-primary"
                        >
                            {link.name}
                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Desktop Expandable Search */}
                    <div className="hidden md:flex items-center">
                        <form
                            onSubmit={handleSearch}
                            className={cn(
                                "flex items-center overflow-hidden transition-all duration-300 ease-in-out",
                                isSearchOpen ? "w-64" : "w-0"
                            )}
                        >
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search notes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-9 bg-muted/50 border-none rounded-l-full px-4 text-sm focus:outline-none focus:ring-0"
                            />
                        </form>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className={cn(
                                "h-9 w-9 flex items-center justify-center rounded-full transition-colors hover:bg-muted",
                                isSearchOpen && "bg-muted text-primary"
                            )}
                        >
                            {isSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-5 w-5 text-muted-foreground hover:text-foreground" />}
                        </button>
                    </div>

                    {/* Mobile Search Trigger (Simple for now) */}
                    <button className="md:hidden h-11 w-11 flex items-center justify-center rounded-full hover:bg-muted active:scale-95 text-muted-foreground hover:text-foreground">
                        <Search className="h-5 w-5" />
                    </button>

                    {/* Cart: Hidden on mobile, visible on desktop */}
                    <Link href="/cart" className="hidden md:flex relative text-muted-foreground hover:text-foreground transition-all hover:scale-105 hover:text-primary">
                        <ShoppingCart className="h-5 w-5" />
                        <CartCounter />
                    </Link>
                </div>
            </div>
        </header>
    );
}
