"use client";

import { products } from "@/data/products";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function SeedPage() {
    const [status, setStatus] = useState<string>("Ready to seed");
    const [isLoading, setIsLoading] = useState(false);

    const handleSeed = async () => {
        setIsLoading(true);
        setStatus("Starting migration...");

        try {
            let successCount = 0;
            let errorCount = 0;

            for (const product of products) {
                // Prepare the payload matching the database schema
                const payload = {
                    title: product.title,
                    description: product.description,
                    institute: product.institute,
                    price: product.price,
                    original_price: product.originalPrice,
                    category: product.category,
                    image: product.image,
                    rating: product.rating,
                    reviews: product.reviews,
                    is_best_seller: product.isBestSeller || false,
                    is_new: product.isNew || false,
                };

                const { error } = await supabase.from("products").insert(payload);

                if (error) {
                    console.error("Error inserting:", product.title, error);
                    errorCount++;
                } else {
                    successCount++;
                }
            }

            setStatus(`Migration Complete. Success: ${successCount}, Failed: ${errorCount}`);
        } catch (e) {
            console.error(e);
            setStatus("Critical Error: Check console.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-12 flex flex-col items-center justify-center min-h-[50vh]">
            <div className="bg-card border border-border p-8 rounded-xl shadow-sm text-center max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4">Database Seeder</h1>
                <p className="text-muted-foreground mb-6">
                    This will upload {products.length} products to your Supabase database.
                </p>

                <div className="mb-6 p-4 bg-muted rounded-md font-mono text-sm">
                    Status: {status}
                </div>

                <button
                    onClick={handleSeed}
                    disabled={isLoading}
                    className="w-full h-10 bg-primary text-primary-foreground rounded-md font-medium disabled:opacity-50"
                >
                    {isLoading ? "Seeding..." : "Start Migration"}
                </button>
            </div>
        </div>
    );
}
