import Link from "next/link";
import {
    BookOpen,
    Globe,
    Users,
    Scale,
    Landmark,
    Calculator,
    FlaskConical,
    Leaf,
    Gavel,
    MessageCircle,
    Building2,
    Crop,
    Activity,
    Brain,
    Microscope,
    ChevronRight,
    ArrowLeft,
    Map
} from "lucide-react";

export const metadata = {
    title: "Optional Subjects | UPSC Store",
    description: "Choose from our wide range of UPSC Mains Optional Subject materials.",
};

const optionalSubjects = [
    {
        id: "psir",
        name: "PSIR",
        fullName: "Political Science",
        description: "Democracy & IR",
        icon: Globe,
        color: "text-blue-600",
        bg: "bg-blue-50",
        href: "/category/optional/psir"
    },
    {
        id: "sociology",
        name: "Sociology",
        fullName: "Sociology",
        description: "Society & Caste",
        icon: Users,
        color: "text-rose-600",
        bg: "bg-rose-50",
        href: "/category/optional/sociology"
    },
    {
        id: "geography",
        name: "Geography",
        fullName: "Geography",
        description: "Physical & Indian",
        icon: Map,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        href: "/category/optional/geography"
    },
    {
        id: "history",
        name: "History",
        fullName: "History",
        description: "Ancient & Modern",
        icon: Landmark,
        color: "text-orange-600",
        bg: "bg-orange-50",
        href: "/category/optional/history"
    },
    {
        id: "pubad",
        name: "Pub Ad",
        fullName: "Public Admin",
        description: "Governance",
        icon: Building2,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        href: "/category/optional/public-administration"
    },
    {
        id: "anthropology",
        name: "Anthropology",
        fullName: "Anthropology",
        description: "Human Evolution",
        icon: Activity,
        color: "text-amber-600",
        bg: "bg-amber-50",
        href: "/category/optional/anthropology"
    },
    {
        id: "philosophy",
        name: "Philosophy",
        fullName: "Philosophy",
        description: "Ethics & Thinkers",
        icon: Brain,
        color: "text-violet-600",
        bg: "bg-violet-50",
        href: "/category/optional/philosophy"
    },
    {
        id: "economics",
        name: "Economics",
        fullName: "Economics",
        description: "Micro & Macro",
        icon: Scale,
        color: "text-teal-600",
        bg: "bg-teal-50",
        href: "/category/optional/economics"
    },
    {
        id: "maths",
        name: "Maths",
        fullName: "Mathematics",
        description: "Algebra & Calc",
        icon: Calculator,
        color: "text-slate-600",
        bg: "bg-slate-50",
        href: "/category/optional/mathematics"
    },
    {
        id: "hindi-lit",
        name: "Hindi Lit",
        fullName: "Hindi Lit",
        description: "Poetry & Prose",
        icon: BookOpen,
        color: "text-red-500",
        bg: "bg-red-50",
        href: "/category/optional/hindi-literature"
    },
    {
        id: "law",
        name: "Law",
        fullName: "Law",
        description: "Constitution",
        icon: Gavel,
        color: "text-zinc-700",
        bg: "bg-zinc-50",
        href: "/category/optional/law"
    },
    {
        id: "psychology",
        name: "Psychology",
        fullName: "Psychology",
        description: "Human Behavior",
        icon: MessageCircle,
        color: "text-pink-600",
        bg: "bg-pink-50",
        href: "/category/optional/psychology"
    },
    {
        id: "agriculture",
        name: "Agriculture",
        fullName: "Agriculture",
        description: "Soil & Crops",
        icon: Leaf,
        color: "text-green-600",
        bg: "bg-green-50",
        href: "/category/optional/agriculture"
    },
    {
        id: "chemistry",
        name: "Chemistry",
        fullName: "Chemistry",
        description: "Organic",
        icon: FlaskConical,
        color: "text-cyan-600",
        bg: "bg-cyan-50",
        href: "/category/optional/chemistry"
    },
    {
        id: "medical",
        name: "Medical",
        fullName: "Medical Sci",
        description: "Anatomy",
        icon: Microscope,
        color: "text-rose-500",
        bg: "bg-rose-50",
        href: "/category/optional/medical-science"
    }
];

export default function OptionalSubjectsPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 max-w-6xl py-6 md:py-12">

                {/* Header - Compact & Left Aligned */}
                <div className="mb-6 md:mb-10">
                    <Link
                        href="/categories"
                        className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 mb-3 transition-colors"
                    >
                        <ArrowLeft className="w-3 h-3 mr-1" />
                        Back to Categories
                    </Link>
                    <div className="flex items-end justify-between">
                        <div>
                            <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
                                Optional Subjects
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">
                                Select your subject for UPSC Mains.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Grid - Clean White Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                    {optionalSubjects.map((subject) => (
                        <Link
                            key={subject.id}
                            href={subject.href}
                            className="group bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col items-start active:scale-[0.98]"
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${subject.bg} ${subject.color} mb-3 group-hover:scale-105 transition-transform`}>
                                <subject.icon className="h-5 w-5" />
                            </div>

                            <h3 className="text-base font-bold text-slate-900 leading-tight mb-0.5">
                                {subject.fullName}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium">
                                {subject.description}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Footer Request */}
                <button className="w-full mt-8 py-3 bg-white border border-dashed border-slate-300 rounded-xl text-slate-500 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    + Request a missing subject
                </button>

            </div>
        </div>
    );
}
