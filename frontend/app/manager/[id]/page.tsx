"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import Navbar from "@/components/Navbar";

import VisionCard from "@/components/analysis/VisionCard";
import PriorityCard from "@/components/analysis/PriorityCard";
import PlannerCard from "@/components/analysis/PlannerCard";
import CommunicationCard from "@/components/analysis/CommunicationCard";
import RecommendationCard from "@/components/RecommendationCard";

import { getTicket } from "@/services/api";

import { Ticket } from "@/types/ticket";

import { closeTicket } from "@/services/api";

export default function TicketDetailPage() {

    const { id } = useParams();

const [ticket, setTicket] = useState<Ticket>();

const [loading, setLoading] = useState(true);

const [closing, setClosing] = useState(false);

async function handleClose() {

    if (!ticket) {

        return;

    }

    const confirmed = window.confirm(

        `Are you sure you want to close Ticket #${ticket.id}?\n\n` +

        `This action marks the maintenance request as completed and cannot be undone.`

    );

    if (!confirmed) {

        return;

    }

    setClosing(true);

    try {

        const updated = await closeTicket(
            ticket.id,
        );

        setTicket(updated);

    }

    catch {

        alert(
            "Unable to close this case.",
        );

    }

    finally {

        setClosing(false);

    }

}

useEffect(() => {

    async function loadTicket() {

        try {

            const data = await getTicket(
                Number(id),
            );

            setTicket(data);

        }

        finally {

            setLoading(false);

        }

    }

    loadTicket();

}, [id]);

    if (loading) {

        return (

            <>
                <Navbar />

                <main className="max-w-6xl mx-auto py-12">

                    Loading ticket...

                </main>

            </>

        );

    }

    if (!ticket) {

        return (

            <>
                <Navbar />

                <main className="max-w-6xl mx-auto py-12">

                    Ticket not found.

                </main>

            </>

        );

    }

    return (

        <>

            <Navbar />

            <main className="max-w-7xl mx-auto py-10 space-y-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        Ticket #{ticket.id}

                    </h1>

                    <p className="text-slate-400 mt-2">

                        AI-generated maintenance report

                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-8">

                    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

                        <h2 className="text-2xl font-semibold text-white">

                            Resident Information

                        </h2>

                        <div className="space-y-4 mt-5">

                            <div>

                                <p className="text-sm text-slate-400">

                                    Resident

                                </p>

                                <p className="text-white">

                                    {ticket.tenant_name}

                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-slate-400">

                                    Unit

                                </p>

                                <p className="text-white">

                                    {ticket.unit_number}

                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-slate-400">

                                    Status

                                </p>

                                <p className="text-white">

                                    {ticket.status}

                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-slate-400">

                                    Submitted

                                </p>

                                <p className="text-white">

                                    {new Date(ticket.created_at).toLocaleString(
                                        undefined,
                                        {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        },
                                        )}

                                </p>

                            </div>

                        </div>

                    </section>

                    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

                        <h2 className="text-2xl font-semibold text-white">

                            Resident Description

                        </h2>

                        <p className="mt-5 text-slate-200 leading-relaxed">

                            {ticket.tenant_message}

                        </p>

                    </section>

                </div>

                <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

    <h2 className="text-2xl font-semibold text-white">
        Uploaded Image
    </h2>

    {
        ticket.image_path ? (

            <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/${ticket.image_path}`}
                alt="Maintenance"
                className="mt-6 rounded-lg max-h-[500px]"
            />

        ) : (

            <div className="mt-6 rounded-lg bg-slate-800 p-6">

                <p className="text-slate-300">

                    No image was submitted.

                </p>

            </div>

        )
    }

</section>

                <VisionCard

                    vision={ticket.analysis.vision}

                />

                <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

                    <h2 className="text-2xl font-semibold text-white">

                        🏷 Classification Agent

                    </h2>

                    <div className="mt-5">

                        <span className="rounded-full bg-cyan-500/20 text-cyan-300 px-4 py-2 font-medium">

                            {ticket.analysis.classification.category}

                        </span>

                    </div>

                </section>

                <PriorityCard

                    priority={ticket.analysis.priority}

                />

                <PlannerCard
                    planner={ticket.analysis.planner}
                />
                
                <RecommendationCard
                    ticket={ticket}
                    setTicket={setTicket}
                />
                
                <CommunicationCard
    communication={ticket.analysis.communication}
    planner={ticket.analysis.planner}
    vision={ticket.analysis.vision}
    ticketId={ticket.id}
/>

<section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

    <h2 className="text-2xl font-semibold text-white">

        ✅ Case Management

    </h2>

    <p className="mt-3 text-slate-300">

        Once the maintenance issue has been resolved or the resident no longer requires assistance, the manager may close this case.

    </p>

    <div className="mt-6">

        <span
            className={`rounded-full px-4 py-2 font-medium ${
                ticket.status === "Closed"

                    ? "bg-green-900/40 text-green-300"

                    : "bg-yellow-900/40 text-yellow-300"

            }`}
        >

            Current Status: {ticket.status}

        </span>

    </div>

    {

        ticket.status === "Closed"

        ? (

            <div className="mt-6 rounded-lg border border-green-800 bg-green-900/30 p-5">

                <h3 className="text-lg font-semibold text-green-300">

                    ✔ Case Closed

                </h3>

                <p className="mt-2 text-green-200">

                    This maintenance request has been successfully completed and archived.

                </p>

            </div>

        )

        : (

            <button

                onClick={handleClose}

                disabled={closing}

                className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-slate-700"

            >

                {

                    closing

                        ? "Closing..."

                        : "Close Case"

                }

            </button>

        )

    }

</section>

</main>

        </>

    );

}