"use client";

import { useState } from "react";
import { submitTicket } from "@/services/api";

export default function TicketForm() {

    const [tenantName, setTenantName] = useState("");

    const [unitNumber, setUnitNumber] = useState("");

    const [message, setMessage] = useState("");

    const [image, setImage] = useState<File>();

    const [loading, setLoading] = useState(false);

    const [submitted, setSubmitted] = useState(false);

    const [ticketId, setTicketId] = useState<number>();

    const [errorMessage, setErrorMessage] = useState("");

    const [progress, setProgress] = useState(0);

    const [currentAgent, setCurrentAgent] = useState(0);

    const agents = [

        "Vision Agent",

        "Classification Agent",

        "Priority Agent",

        "Planner Agent",

        "Communication Agent",

    ];

    if (submitted) {

        return (

            <div className="rounded-xl border border-green-700 bg-green-950 p-8 text-center">

    <h2 className="text-3xl font-bold text-green-300">

        ✅ Maintenance Request Submitted

    </h2>

    <p className="mt-5 text-slate-200">

        Your maintenance request has been received successfully.

    </p>

    <p className="mt-3 text-white">

        Reference Number

    </p>

    <p className="text-3xl font-bold text-blue-300">

        #{ticketId}

    </p>

    <p className="mt-6 text-slate-300">

        Our AI system has completed its assessment and forwarded your request to your property manager.

    </p>

    <button

        className="mt-8 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"

        onClick={() => window.location.reload()}

    >

        Submit Another Request

    </button>

</div>

        );

    }

    async function handleSubmit(
    e: React.FormEvent,
) {

    e.preventDefault();

    if (!image) {
        setErrorMessage("Please upload a maintenance photo.");
        return;
    }

    setErrorMessage("");
    setLoading(true);

    setProgress(0);
    setCurrentAgent(0);

    const form = new FormData();

    form.append("tenant_name", tenantName);
    form.append("unit_number", unitNumber);
    form.append("tenant_message", message);
    form.append("image", image);

    let value = 0;

    const interval = setInterval(() => {

        value += 2;

        if (value > 92) {

            value = 92;

        }

        setProgress(value);

        setCurrentAgent(

            Math.min(

                Math.floor(value / 20),

                agents.length - 1,

            ),

        );

    }, 1000);

    try {

        const response = await submitTicket(form);

        clearInterval(interval);

        if (!response.success) {

            setLoading(false);

            setProgress(0);

            setErrorMessage(response.message);

            return;

        }

        setProgress(100);

        setCurrentAgent(agents.length);

        setTicketId(response.request_id);

        setSubmitted(true);

    }

    catch {

        clearInterval(interval);

        setLoading(false);

        setProgress(0);

        setErrorMessage(

            "Unable to submit your maintenance request. Please try again."

        );

        return;

    }

    finally {

        clearInterval(interval);

        setLoading(false);

    }

}

    return (

        <form

            onSubmit={handleSubmit}

            className="space-y-6"

        >

            <input

                required

                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white placeholder:text-slate-400"

                placeholder="Resident Name"

                value={tenantName}

                onChange={(e) =>

                    setTenantName(e.target.value)

                }

            />

            <input

                required

                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white placeholder:text-slate-400"

                placeholder="Unit Number (e.g. 12-34)"

                value={unitNumber}

                onChange={(e) =>

                    setUnitNumber(e.target.value)

                }

            />

            <textarea

                required

                rows={5}

                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white placeholder:text-slate-400"

                placeholder="Describe the maintenance issue..."

                value={message}

                onChange={(e) =>

                    setMessage(e.target.value)

                }

            />

            <input

                required

                type="file"

                accept="image/*"

                onChange={(e) =>

                    setImage(

                        e.target.files?.[0],

                    )

                }

                className="text-slate-300"

            />

            {

                errorMessage && (

                    <div className="rounded-lg border border-red-600 bg-red-950 p-4 text-red-300">

                        ❌ {errorMessage}

                    </div>

                )

            }

            {

                loading && (

                    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">

                        <h3 className="text-xl font-semibold text-white">

                            🤖 Multi-Agent AI Processing

                        </h3>

                        <p className="mt-3 text-slate-300">

                            Your maintenance request is being analysed.

                        </p>

                        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700">

                            <div

                                className="h-full rounded-full bg-blue-500 transition-all duration-500"

                                style={{

                                    width: `${progress}%`,

                                }}

                            />

                        </div>

                        <p className="mt-3 text-blue-300">

                            {progress}% Complete

                        </p>

                        <div className="mt-6 space-y-3">

                            {

                                agents.map((agent, index) => (

                                    <div

                                        key={agent}

                                        className="flex items-center gap-3"

                                    >

                                        <span>

                                            {

                                                index < currentAgent

                                                    ? "✅"

                                                    : index === currentAgent

                                                    ? "🔄"

                                                    : "⏳"

                                            }

                                        </span>

                                        <span

                                            className={

                                                index <= currentAgent

                                                    ? "text-white"

                                                    : "text-slate-500"

                                            }

                                        >

                                            {agent}

                                        </span>

                                    </div>

                                ))

                            }

                        </div>

                        <div className="mt-6 rounded-lg bg-slate-800 p-4">

                            <p className="text-sm text-slate-300">

                                ⏱ Typical processing time: <strong>60–90 seconds</strong>

                            </p>

                            <p className="mt-2 text-sm text-slate-400">

                                Do not close this page while the request is being processed.

                            </p>

                            <p className="mt-2 text-sm text-slate-400">

                                Thank you for your patience.

                            </p>

                        </div>

                    </div>

                )

            }

            <button

                disabled={loading}

                className="rounded-lg bg-cyan-600 px-8 py-3 font-semibold text-white hover:bg-cyan-700 disabled:bg-slate-700"

            >

                {

                    loading

                        ? "Analysing..."

                        : "Analyse & Submit Request"

                }

            </button>

        </form>

    );

}