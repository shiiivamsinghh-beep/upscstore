"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/store";

export function BottomNav() {
    const pathname = usePathname();
    const cartItemCount = useCart((state) => state.items.length);

    const isActive = (path: string) => pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background/80 backdrop-blur-lg px-4 pb-safe md:hidden">
            <Link
                href="/"
                className={cn(
                    "flex flex-col items-center justify-center gap-1",
                    isActive("/") ? "text-primary" : "text-muted-foreground"
                )}
            >
                <Home className="h-6 w-6" />
                <span className="text-[10px] font-medium">Home</span>
            </Link>

            <Link
                href="/#categories"
                className={cn(
                    "flex flex-col items-center justify-center gap-1",
                    isActive("/#categories") ? "text-primary" : "text-muted-foreground"
                )}
            >
                <LayoutGrid className="h-6 w-6" />
                <span className="text-[10px] font-medium">Browse</span>
            </Link>

            <Link
                href="/cart"
                className={cn(
                    "relative flex flex-col items-center justify-center gap-1",
                    isActive("/cart") ? "text-primary" : "text-muted-foreground"
                )}
            >
                <div className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    {cartItemCount > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                            {cartItemCount}
                        </span>
                    )}
                </div>
                <span className="text-[10px] font-medium">Cart</span>
            </Link>

            <Link
                href="/admin/products"
                className={cn(
                    "flex flex-col items-center justify-center gap-1",
                    pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground"
                )}
            >
                <User className="h-6 w-6" />
                <span className="text-[10px] font-medium">Profile</span>
            </Link>
        </div>
    );
}
