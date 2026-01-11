"use client";

import { useCart } from "@/lib/store";
import { Trash2, Plus, Minus, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CartPage() {
    const { items, removeItem, updateQuantity, total } = useCart();
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        pincode: ""
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const cartTotal = total();
    const shipping = cartTotal > 999 ? 0 : 99; // Free shipping over 999
    const finalTotal = cartTotal + shipping;

    const handleWhatsAppOrder = () => {
        const itemList = items.map(i => `- ${i.title} (x${i.quantity})`).join('\n');
        const message = `*New Order Request*\n\n*Items:*\n${itemList}\n\n*Total:* ₹${finalTotal}\n\n*Shipping Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}\n\nPlease confirm my order.`;

        // Replace with your actual WhatsApp number
        const phoneNumber = "919876543210";
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    if (!mounted) return null;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-muted-foreground mb-8">Looks like you haven't added any study materials yet.</p>
                <Link href="/" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                            </div>

                            <div className="flex flex-1 flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold line-clamp-2 text-sm md:text-base">{item.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-1">{item.institute}</p>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground">
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground">
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold">₹{item.price * item.quantity}</span>
                                        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-full">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Checkout Form */}
                <div className="lg:col-span-1">
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm sticky top-24">
                        <h2 className="text-lg font-semibold mb-6">Delivery Details</h2>

                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="text-xs font-medium mb-1.5 block">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium mb-1.5 block">Phone Number</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    placeholder="10-digit mobile number"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium mb-1.5 block">Address</label>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                                    placeholder="Full street address with pincode"
                                />
                            </div>
                        </div>

                        <div className="border-t border-border pt-4 space-y-2 mb-6 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : `₹${shipping}`}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t border-border mt-2">
                                <span>Total</span>
                                <span>₹{finalTotal}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleWhatsAppOrder}
                            disabled={!formData.name || !formData.phone || !formData.address}
                            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <MessageCircle className="h-5 w-5" />
                            Order via WhatsApp
                        </button>
                        <p className="text-xs text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
                            No payment needed now. Pay on delivery.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
