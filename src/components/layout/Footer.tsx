export function Footer() {
    return (
        <footer className="border-t border-border bg-white">
            <div className="container mx-auto py-12 px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-lg font-bold text-primary mb-4 tracking-tight">UPSC Store</h3>
                        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                            The premium destination for serious civil services aspirants.
                            Top-quality printed notes, delivered with speed and care.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-primary mb-4">Collections</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Vision IAS Notes</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Vajiram & Ravi</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Current Affairs Magazines</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Topper's Copies</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-primary mb-4">Support</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Track Your Order</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">WhatsApp Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} UPSC Store. Built for functionality.
                </div>
            </div>
        </footer>
    );
}
