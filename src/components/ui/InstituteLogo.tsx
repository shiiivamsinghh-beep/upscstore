"use client";

import Image from "next/image";
import { useState, ReactNode } from "react";

interface InstituteLogoProps {
    src: string;
    alt: string;
    fallback: ReactNode;
    className?: string;
}

export function InstituteLogo({ src, alt, fallback, className }: InstituteLogoProps) {
    const [error, setError] = useState(false);

    if (error) {
        return <>{fallback}</>;
    }

    return (
        <div className={`relative w-full h-full ${className}`}>
            <Image
                src={src}
                alt={alt}
                fill
                className="object-contain p-2"
                sizes="64px"
                onError={() => setError(true)}
            />
        </div>
    );
}
