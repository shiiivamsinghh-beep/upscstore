import Link from 'next/link';
import { Package, PlusCircle, Settings, LogOut, LayoutDashboard } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-muted/40 flex">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/admin" className="flex items-center gap-2 font-bold text-lg">
                        <LayoutDashboard className="h-6 w-6" />
                        <span>Store Admin</span>
                    </Link>
                </div>
                <nav className="flex flex-col gap-4 px-4 py-8">
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                        <Package className="h-4 w-4" />
                        Products
                    </Link>
                    <Link
                        href="/admin/products/new"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                        <PlusCircle className="h-4 w-4" />
                        Add Product
                    </Link>
                    <Link
                        href="/seed"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                        <Settings className="h-4 w-4" />
                        Database Seed
                    </Link>
                </nav>
                <div className="mt-auto p-4 border-t">
                    <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-red-500 hover:bg-red-50">
                        <LogOut className="h-4 w-4" />
                        Exit to Store
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col sm:gap-4 sm:pl-64 w-full">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    {/* Mobile Entry would go here */}
                    <div className="flex-1"></div>
                    <div className="text-sm text-muted-foreground">Admin Mode</div>
                </header>
                <main className="p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
