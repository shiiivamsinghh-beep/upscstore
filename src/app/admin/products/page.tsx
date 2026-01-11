import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Pencil, Trash2, Search } from "lucide-react";
import { Product } from "@/types/product";

export const revalidate = 0; // Dynamic, always fresh

export default async function AdminProductsPage() {
    const { data } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    const products = (data as unknown as Product[]) || [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground">Manage your store inventory.</p>
                </div>
                <Link href="/admin/products/new" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    <PlusCircle className="h-4 w-4" />
                    Add Product
                </Link>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-muted/30">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-9 pr-4 py-2 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>

                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Image</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {products.map((product) => (
                                <tr key={product.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle">
                                        <div className="relative h-12 w-10 overflow-hidden rounded-md border bg-muted">
                                            <Image src={product.image} alt={product.title} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle font-medium">
                                        <div className="line-clamp-2 max-w-sm">{product.title}</div>
                                        <div className="text-xs text-muted-foreground mt-1">{product.institute}</div>
                                    </td>
                                    <td className="p-4 align-middle capitalize">
                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary/10 text-secondary hover:bg-secondary/20">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle font-bold">₹{product.price}</td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/products/${product.id}`} className="h-8 w-8 inline-flex items-center justify-center rounded-md border bg-background hover:bg-muted text-muted-foreground hover:text-foreground">
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <button className="h-8 w-8 inline-flex items-center justify-center rounded-md border bg-background hover:bg-red-50 text-muted-foreground hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                        No products found. Add one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
