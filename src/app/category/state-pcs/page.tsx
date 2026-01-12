import Link from "next/link";
import {
    Map,
    Landmark,
    ScrollText,
    ArrowLeft,
    Mountain,
    Building,
    BookOpen
} from "lucide-react";

export const metadata = {
    title: "State PCS Exams | UPSC Store",
    description: "Study material for State Public Service Commission exams (UPPCS, BPSC, RAS, MPPSC, HCS).",
};

const stateExams = [
    {
        id: "uppcs",
        name: "UPPCS",
        fullName: "Uttar Pradesh PCS",
        description: "UP Special & General Studies",
        icon: Landmark,
        color: "text-red-600",
        bg: "bg-red-50",
        href: "/category/state-pcs/uppcs"
    },
    {
        id: "bpsc",
        name: "BPSC",
        fullName: "Bihar PSC",
        description: "Bihar Special GK & History",
        icon: ScrollText,
        color: "text-blue-600",
        bg: "bg-blue-50",
        href: "/category/state-pcs/bpsc"
    },
    {
        id: "ras",
        name: "RAS",
        fullName: "Rajasthan RAS",
        description: "Rajasthan History & Culture",
        icon: Mountain,
        color: "text-orange-600",
        bg: "bg-orange-50",
        href: "/category/state-pcs/ras"
    },
    {
        id: "mppsc",
        name: "MPPSC",
        fullName: "Madhya Pradesh PSC",
        description: "MP Special GK",
        icon: Map,
        color: "text-green-600",
        bg: "bg-green-50",
        href: "/category/state-pcs/mppsc"
    },
    {
        id: "hcs",
        name: "HCS",
        fullName: "Haryana Civil Services",
        description: "Haryana Special",
        icon: Building,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        href: "/category/state-pcs/hcs"
    },
    {
        id: "ukpsc",
        name: "UKPSC",
        fullName: "Uttarakhand PSC",
        description: "Uttarakhand General Knowledge",
        icon: Mountain,
        color: "text-teal-600",
        bg: "bg-teal-50",
        href: "/category/state-pcs/ukpsc"
    }
];

export default function StatePCSPage() {
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
                                State PCS Exams
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">
                                Specialized study material for State Civil Services.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Grid - Clean White Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                    {stateExams.map((exam) => (
                        <Link
                            key={exam.id}
                            href={exam.href}
                            className="group bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col items-start active:scale-[0.98]"
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${exam.bg} ${exam.color} mb-3 group-hover:scale-105 transition-transform`}>
                                <exam.icon className="h-5 w-5" />
                            </div>

                            <h3 className="text-base font-bold text-slate-900 leading-tight mb-0.5">
                                {exam.fullName}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium">
                                {exam.description}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Footer Request */}
                <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Looking for another State?</h3>
                        <p className="text-sm text-slate-600">
                            We actullay have materials for all 28 states. Request specific notes here.
                        </p>
                    </div>
                    <button className="px-6 py-3 bg-white border border-blue-200 text-blue-700 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-colors shadow-sm text-sm">
                        Request State Material
                    </button>
                </div>

            </div>
        </div>
    );
}
