import Link from 'next/link';
import { ShoppingCart, Search, Menu, BookOpen } from 'lucide-react';
import { CartCounter } from '@/components/cart/CartCounter';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full glass">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Mobile Menu & Logo */}
                <div className="flex items-center gap-4">
                    {/* Hamburger removed as we have bottom nav */}
                    <Link href="/" className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold tracking-tight text-foreground font-heading">UPSC Store</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="/?category=gs" className="transition-colors hover:text-primary">General Studies</Link>
                    <Link href="/?category=optional" className="transition-colors hover:text-primary">Optionals</Link>
                    <Link href="/?category=test-series" className="transition-colors hover:text-primary">Test Series</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="text-muted-foreground hover:text-foreground">
                        <Search className="h-5 w-5" />
                    </button>
                    {/* Cart: Hidden on mobile, visible on desktop */}
                    <Link href="/cart" className="hidden md:flex relative text-muted-foreground hover:text-foreground transition-colors hover:text-primary">
                        <ShoppingCart className="h-5 w-5" />
                        <CartCounter />
                    </Link>
                </div>
            </div>
        </header>
    );
}
