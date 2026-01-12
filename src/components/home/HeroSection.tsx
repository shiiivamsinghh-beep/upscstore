import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden flex items-center justify-center min-h-[350px] md:h-[600px] py-8 md:py-0">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000"
                    alt="UPSC Preparation Background"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 text-center">
                <div className="mx-auto max-w-4xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="space-y-2">
                        <h1 className="font-heading text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-lg">
                            Master Your <span className="text-secondary">UPSC Journey</span>
                            <br className="hidden sm:block" />
                            {" "}With Premium Material
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm sm:text-lg text-slate-200 leading-relaxed font-light">
                            Access the highest quality printed notes from India's top institutes.
                            <br className="hidden sm:block" />
                            Verified, organized, and delivered to your doorstep.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 justify-center items-center pt-2">
                        <Link href="/category/gs" className="w-full sm:w-auto">
                            <Button size="default" className="rounded-full px-6 text-sm font-bold shadow-lg shadow-secondary/20 w-full sm:w-auto min-w-[180px] h-10">
                                Shop General Studies
                            </Button>
                        </Link>
                        <Link href="/category/optional" className="w-full sm:w-auto">
                            <Button variant="outline" size="default" className="rounded-full px-6 text-sm font-bold bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm w-full sm:w-auto min-w-[180px] h-10">
                                Explore Optionals
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
