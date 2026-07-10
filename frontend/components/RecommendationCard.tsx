"use client";

import { useState } from "react";

import { Ticket } from "@/types/ticket";

import { approveRecommendation } from "@/services/api";

type Props = {

    ticket: Ticket;

    setTicket: React.Dispatch<React.SetStateAction<Ticket | undefined>>;

};

export default function RecommendationCard({

    ticket,

    setTicket,

}: Props) {

    const [loading, setLoading] = useState(false);

    const mismatch =
        ticket.analysis.vision.consistency === "MISMATCH";

    async function handleApprove() {

        setLoading(true);

        try {

            const updated = await approveRecommendation(

                ticket.id,

                ticket.analysis.planner.recommended_contractor,

            );

            setTicket(updated);

        }

        finally {

            setLoading(false);

        }

    }

    const approved =

        ticket.status !== "Pending";

    return (

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

            <h2 className="text-2xl font-semibold text-white">

                🤖 AI Recommendation

            </h2>

            {

                mismatch ? (

                    <div className="mt-6 rounded-xl border border-yellow-700 bg-yellow-900/30 p-6">

                        <h3 className="text-xl font-semibold text-yellow-300">

                            Resident clarification recommended

                        </h3>

                        <p className="mt-4 text-slate-200 leading-relaxed">

                            The uploaded image does not match the resident's description.

                            Before dispatching a contractor, the resident should

                            be contacted for clarification or asked to upload

                            another photograph.

                        </p>

                    </div>

                ) : (

                    <div className="mt-6 rounded-xl border border-cyan-700 bg-cyan-900/20 p-6">

                        <h3 className="text-xl font-semibold text-cyan-300">

                            Recommended Contractor

                        </h3>

                        <p className="mt-4 text-3xl font-bold text-white">

                            {ticket.analysis.planner.recommended_contractor}

                        </p>

                        <div className="mt-6 grid md:grid-cols-2 gap-6">

                            <div>

                                <p className="text-sm text-slate-400">

                                    Estimated Duration

                                </p>

                                <p className="text-white">

                                    {ticket.analysis.planner.estimated_duration}

                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-slate-400">

                                    Estimated Cost

                                </p>

                                <p className="text-white">

                                    {ticket.analysis.planner.estimated_cost}

                                </p>

                            </div>

                        </div>

                    </div>

                )

            }

            {

                approved ? (

                    <div className="mt-8 rounded-lg border border-green-700 bg-green-900/30 p-5">

                        <h3 className="font-semibold text-green-300">

                            ✅ Recommendation Approved

                        </h3>

                        <p className="mt-2 text-green-200">

                            {

                                mismatch

                                    ? "Ticket status has been updated to 'Awaiting Resident Clarification'."

                                    : "Contractor has been assigned successfully."

                            }

                        </p>

                    </div>

                ) : (

                    <button

                        onClick={handleApprove}

                        disabled={loading}

                        className="mt-8 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700 disabled:bg-slate-700"

                    >

                        {

                            loading

                                ? "Processing..."

                                : mismatch

                                    ? "Approve & Request Resident Clarification"

                                    : "Approve AI Recommendation"

                        }

                    </button>

                )

            }

        </section>

    );

}