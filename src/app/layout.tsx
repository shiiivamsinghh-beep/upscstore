import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "UPSC Store | Premium Study Material",
  description: "Best quality printed notes for UPSC/IAS preparation. Delivered to your doorstep.",
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { BottomNav } from "@/components/layout/BottomNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen bg-muted/30 font-sans antialiased text-foreground ambient-glow",
          inter.variable,
          outfit.variable
        )}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
