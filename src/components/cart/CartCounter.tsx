"use client";

import { useCart } from "@/lib/store";
import { useEffect, useState } from "react";

export function CartCounter() {
    // Prevent hydration mismatch by only showing after mount
    const [mounted, setMounted] = useState(false);
    const items = useCart((state) => state.items);

    useEffect(() => {
        setMounted(true);
    }, []);

    const count = items.reduce((acc, item) => acc + item.quantity, 0);

    if (!mounted || count === 0) return null;

    return (
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white shadow-sm animate-in zoom-in duration-300">
            {count}
        </span>
    );
}
