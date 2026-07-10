"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import TicketCard from "@/components/TicketCard";

import { getTickets } from "@/services/api";
import { Ticket } from "@/types/ticket";

export default function ManagerPage() {

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);

    const [statusFilter, setStatusFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("Newest");

    useEffect(() => {

        async function loadTickets() {

            try {

                const data = await getTickets();

                setTickets(data);

            }

            finally {

                setLoading(false);

            }

        }

        loadTickets();

    }, []);

    const pending = tickets.filter(
        (ticket) => ticket.status === "Pending",
    ).length;

    const critical = tickets.filter(
        (ticket) =>
            ticket.analysis?.priority?.priority === "Critical",
    ).length;

    const filteredTickets = useMemo(() => {

        let result = [...tickets];

        if (statusFilter !== "All") {

            result = result.filter(
                (ticket) =>
                    ticket.status === statusFilter,
            );

        }

        result.sort((a, b) => {

            const timeA = new Date(a.created_at).getTime();
            const timeB = new Date(b.created_at).getTime();

            return sortOrder === "Newest"

                ? timeB - timeA

                : timeA - timeB;

        });

        return result;

    }, [
        tickets,
        statusFilter,
        sortOrder,
    ]);

    return (

        <>

            <Navbar />

            <main className="max-w-7xl mx-auto p-8">

                <h1 className="text-4xl font-bold text-white">

                    Manager Dashboard

                </h1>

                {/* Statistics */}

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">

                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                        <h2 className="text-4xl font-bold text-white">

                            {tickets.length}

                        </h2>

                        <p className="mt-2 text-slate-400">

                            Total Tickets

                        </p>

                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                        <h2 className="text-4xl font-bold text-yellow-300">

                            {pending}

                        </h2>

                        <p className="mt-2 text-slate-400">

                            Pending

                        </p>

                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

                        <h2 className="text-4xl font-bold text-red-400">

                            {critical}

                        </h2>

                        <p className="mt-2 text-slate-400">

                            Critical

                        </p>

                    </div>

                </div>

                {/* Import Email Card */}

                <section className="mt-8 rounded-xl border border-cyan-800 bg-slate-900 p-6">

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        <div>

                            <h2 className="text-2xl font-semibold text-white">

                                📧 Import Maintenance Email

                            </h2>

                            <p className="mt-2 max-w-2xl text-slate-400">

                                Residents may submit maintenance requests through Outlook or Gmail instead of the Resident Portal.

                                Import an email (.eml) and let mAIntAIn automatically extract the details, attached images and run the complete AI workflow.

                            </p>

                        </div>

                        <Link

                            href="/manager/import-email"

                            className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"

                        >

                            Open Import Centre →

                        </Link>

                    </div>

                </section>

                {/* Filters */}

                <div className="mt-10 flex flex-wrap items-end gap-6">

                    <div>

                        <label className="mb-2 block text-sm text-slate-400">

                            Filter by Status

                        </label>

                        <select

                            value={statusFilter}

                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value,
                                )
                            }

                            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white"

                        >

                            <option>All</option>

                            <option>Pending</option>

                            <option>Awaiting Resident Clarification</option>

                            <option>Contractor Assigned</option>

                            <option>Closed</option>

                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-slate-400">

                            Sort Tickets

                        </label>

                        <select

                            value={sortOrder}

                            onChange={(e) =>
                                setSortOrder(
                                    e.target.value,
                                )
                            }

                            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white"

                        >

                            <option>Newest</option>

                            <option>Oldest</option>

                        </select>

                    </div>

                </div>

                {/* Ticket List */}

                <div className="mt-12">

                    <h2 className="text-2xl font-semibold text-white">

                        Maintenance Requests

                    </h2>

                    <p className="mt-2 text-slate-400">

                        Review AI-generated analyses, approve recommendations, communicate with residents and contractors, or close completed cases.

                    </p>

                </div>

                {

                    loading ? (

                        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-10 text-center text-white">

                            Loading maintenance requests...

                        </div>

                    ) : filteredTickets.length === 0 ? (

                        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-300">

                            No maintenance requests found.

                        </div>

                    ) : (

                        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {

                                filteredTickets.map((ticket) => (

                                    <TicketCard

                                        key={ticket.id}

                                        ticket={ticket}

                                    />

                                ))

                            }

                        </div>

                    )

                }

            </main>

        </>

    );

}