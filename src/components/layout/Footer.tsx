import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-border bg-white text-muted-foreground">
            <div className="container mx-auto py-12 px-4 md:py-16">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
                    {/* Column 1: Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-lg font-bold text-foreground mb-4">UPSC Store</h3>
                        <p className="text-sm leading-relaxed mb-6">
                            India's most trusted platform for premium quality printed study material. We deliver success to your doorstep.
                        </p>
                    </div>

                    {/* Column 2: Shop */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Shop</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/?category=gs" className="hover:text-primary transition-colors">General Studies</Link></li>
                            <li><Link href="/?category=optional" className="hover:text-primary transition-colors">Optionals</Link></li>
                            <li><Link href="/?category=test-series" className="hover:text-primary transition-colors">Test Series</Link></li>
                            <li><Link href="/?category=current-affairs" className="hover:text-primary transition-colors">Current Affairs</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-primary transition-colors">Track Order</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li>WhatsApp: +91 98765 43210</li>
                            <li>Email: support@upscstore.com</li>
                            <li>New Delhi, India</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-border pt-8 text-center text-xs">
                    <p>© {new Date().getFullYear()} UPSC Store. All rights reserved. Built for aspirants.</p>
                </div>
            </div>
        </footer>
    );
}
