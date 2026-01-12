import { Truck, ShieldCheck, CheckCircle2, BookOpen, Clock, Award } from 'lucide-react';

const features = [
    {
        icon: Truck,
        title: "Next-Day Dispatch",
        desc: "We process and ship your orders within 24 hours to ensure timely delivery."
    },
    {
        icon: ShieldCheck,
        title: "Verified Quality",
        desc: "Every page is checked for print clarity. No missing pages, guaranteed."
    },
    {
        icon: CheckCircle2,
        title: "Cash on Delivery",
        desc: "Shop with confidence. Pay only when you receive your study material."
    },
    {
        icon: BookOpen,
        title: "Latest Editions",
        desc: "We stock only the most recent printed notes from top institutes."
    }
];

export function FeaturesSection() {
    return (
        <section className="py-6 md:py-12 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-6 md:mb-10">
                    <h2 className="font-heading text-xl md:text-3xl font-bold mb-1">Why Toppers Choose Us</h2>
                    <p className="text-muted-foreground text-xs md:text-base">We don't just sell notes; we deliver peace of mind.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="group p-3 md:p-6 rounded-lg md:rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-orange-50 text-secondary flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                                <feature.icon className="h-4 w-4 md:h-6 md:w-6" />
                            </div>
                            <h3 className="font-heading font-semibold text-xs md:text-lg mb-0.5 leading-tight">{feature.title}</h3>
                            <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed hidden sm:block">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
