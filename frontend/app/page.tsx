"use client";

import { useRouter } from "next/navigation";

export default function Home() {

    const router = useRouter();

    return (

        <main className="min-h-screen bg-slate-950 text-white">

            <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-24">

                <div className="max-w-3xl text-center">

                    <h1 className="text-5xl font-bold tracking-tight md:text-6xl">

                        mAIntAIn
                    </h1>

                    <p className="mt-6 text-xl text-slate-400">

                        Automate maintenance request triaging with AI-powered
                        image analysis, issue classification, prioritisation,
                        contractor recommendations, and resident communication. Powered by Qwen AI.
                    </p>

                </div>

                <div className="mt-16 grid w-full max-w-5xl gap-8 md:grid-cols-2">

                    <button

                        onClick={() => router.push("/resident")}

                        className="group rounded-2xl border border-slate-800 bg-slate-900 p-8 text-left transition-all hover:border-cyan-500 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-cyan-500/10"

                    >

                        <div className="mb-4 text-5xl">

                            🏠

                        </div>

                        <h2 className="text-3xl font-bold text-white">

                            Resident Portal

                        </h2>

                        <p className="mt-4 text-slate-400">

                            Submit maintenance requests with descriptions and
                            photos. The AI automatically analyses the issue and
                            routes it for action. 

                        </p>

                        <div className="mt-6 text-cyan-400 font-medium">

                            Submit Request →

                        </div>

                    </button>

                    <button

                        onClick={() => router.push("/manager")}

                        className="group rounded-2xl border border-slate-800 bg-slate-900 p-8 text-left transition-all hover:border-cyan-500 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-cyan-500/10"

                    >

                        <div className="mb-4 text-5xl">

                            🛠️

                        </div>

                        <h2 className="text-3xl font-bold text-white">

                            Manager Portal

                        </h2>

                        <p className="mt-4 text-slate-400">

                            Review maintenance requests, AI-generated analyses, contractor
                            recommendations and priority assessments.

                        </p>

                        <div className="mt-6 text-cyan-400 font-medium">

                            Open Dashboard →

                        </div>

                    </button>

                </div>

                <div className="mt-16 grid w-full max-w-5xl gap-6 md:grid-cols-3">

                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                        <h3 className="font-semibold text-cyan-300">

                            Vision AI

                        </h3>

                        <p className="mt-2 text-sm text-slate-400">

                            Analyses maintenance images and validates resident
                            descriptions.

                        </p>

                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                        <h3 className="font-semibold text-cyan-300">

                            Multi-Agent Workflow

                        </h3>

                        <p className="mt-2 text-sm text-slate-400">

                            Classification, prioritisation, planning and
                            communication handled automatically.

                        </p>

                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                        <h3 className="font-semibold text-cyan-300">

                            Email Integration

                        </h3>

                        <p className="mt-2 text-sm text-slate-400">

                            Import maintenance requests directly from Outlook
                            and Gmail exported emails.

                        </p>

                    </div>

                </div>

            </div>

        </main>

    );

}