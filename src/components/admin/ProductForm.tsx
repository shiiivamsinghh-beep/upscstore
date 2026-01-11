"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductFormProps {
    initialData?: Product;
}

export default function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        price: initialData?.price || "",
        originalPrice: initialData?.originalPrice || "",
        category: initialData?.category || "gs",
        institute: initialData?.institute || "",
        image: initialData?.image || "",
        isBestSeller: initialData?.isBestSeller || false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, isBestSeller: e.target.checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                original_price: Number(formData.originalPrice),
                category: formData.category,
                institute: formData.institute,
                image: formData.image, // For now assuming URL
                is_best_seller: formData.isBestSeller,
            };

            if (initialData?.id) {
                // Update
                const { error } = await supabase
                    .from("products")
                    .update(payload)
                    .eq("id", initialData.id);
                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from("products")
                    .insert(payload);
                if (error) throw error;
            }

            router.refresh(); // Refresh server components
            router.push("/admin/products");
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to save product. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="p-2 hover:bg-muted rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold">{initialData ? "Edit Product" : "New Product"}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-xl border shadow-sm">

                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Product Title</label>
                    <input
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="e.g. Vision IAS GS Notes 2025"
                    />
                </div>

                {/* Institute & Category */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Institute/Publisher</label>
                        <input
                            name="institute"
                            required
                            value={formData.institute}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2"
                            placeholder="e.g. Vision IAS"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2"
                        >
                            <option value="gs">General Studies</option>
                            <option value="optional">Optional</option>
                            <option value="test-series">Test Series</option>
                            <option value="current-affairs">Current Affairs</option>
                            <option value="books">Books</option>
                        </select>
                    </div>
                </div>

                {/* Prices */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Sale Price (₹)</label>
                        <input
                            name="price"
                            type="number"
                            required
                            value={formData.price}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2"
                            placeholder="2999"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Original Price (₹)</label>
                        <input
                            name="originalPrice"
                            type="number"
                            value={formData.originalPrice}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2"
                            placeholder="5000"
                        />
                    </div>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Image URL</label>
                    <input
                        name="image"
                        required
                        value={formData.image}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2"
                        placeholder="https://images.unsplash.com/..."
                    />
                    <p className="text-xs text-muted-foreground">Paste a link from Unsplash for now.</p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2"
                        placeholder="Product details..."
                    />
                </div>

                {/* Best Seller Checkbox */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="isBestSeller"
                        name="isBestSeller"
                        checked={formData.isBestSeller}
                        onChange={handleToggle}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label
                        htmlFor="isBestSeller"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Mark as Best Seller
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-primary text-primary-foreground rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                    {initialData ? "Update Product" : "Create Product"}
                </button>
            </form>
        </div>
    );
}
