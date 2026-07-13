"use client";

import {
    Communication,
    Planner,
    Vision,
} from "@/types/ticket";

import {
    openGmail,
    openOutlook,
    copyEmail,
} from "@/utils/email";

type Props = {

    communication: Communication;

    planner: Planner;

    vision: Vision | null;

    ticketId: number;

};

function EmailBlock({

    title,

    subject,

    body,

    disabled = false,

}: {

    title: string;

    subject: string;

    body: string;

    disabled?: boolean;

}) {

    return (

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">

            <h3 className="text-xl font-semibold text-white">

                {title}

            </h3>

            <div className="mt-5">

                <p className="text-sm text-slate-400">

                    Subject

                </p>

                <p className="mt-1 font-medium text-white">

                    {subject}

                </p>

            </div>

            <div className="mt-5 whitespace-pre-wrap rounded-lg bg-slate-900 p-4 text-slate-200">

                {body}

            </div>

            {

                disabled ? (

                    <div className="mt-6 rounded-lg border border-yellow-700 bg-yellow-900/30 p-4 text-yellow-200">

                        Contractor communication is disabled until the resident clarifies the reported issue.

                    </div>

                ) : (

                    <div className="mt-6 flex flex-wrap gap-3">

                        <button

                            onClick={() =>

                                openGmail(

                                    subject,

                                    body,

                                )

                            }

                            className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"

                        >

                            📧 Open in Gmail

                        </button>

                        <button

                            onClick={() =>

                                openOutlook(

                                    subject,

                                    body,

                                )

                            }

                            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"

                        >

                            📧 Open in Outlook

                        </button>

                        <button

                            onClick={() =>

                                copyEmail(

                                    `Subject: ${subject}\n\n${body}`,

                                )

                            }

                            className="rounded-lg bg-slate-700 px-4 py-2 font-medium text-white hover:bg-slate-600"

                        >

                            📋 Copy Email

                        </button>

                    </div>

                )

            }

        </div>

    );

}

export default function CommunicationCard({

    communication,

    planner,

    vision,

    ticketId,

}: Props) {

    const mismatch =

        vision?.consistency === "MISMATCH";

    const residentSubject = mismatch

        ? `Maintenance Request #${ticketId} - Clarification Required`

        : `Maintenance Request #${ticketId} Update`;

    const managerSubject = mismatch

        ? `AI Alert - Ticket #${ticketId} Requires Clarification`

        : `AI Summary for Ticket #${ticketId}`;

    const contractorSubject =
        
    `Work Order - Repair ${vision?.damage ?? planner.recommended_contractor}`;

    return (

        <section

            id="communication"

            className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg"

        >

            <h2 className="text-2xl font-semibold text-white">

                ✉️ Communication Agent

            </h2>

            <p className="mt-2 text-slate-400">

                AI-generated communications ready for review before sending.

            </p>

            {

                mismatch && (

                    <div className="mt-6 rounded-xl border border-yellow-700 bg-yellow-900/30 p-5">

                        <h3 className="font-semibold text-yellow-200">

                            ⚠ Clarification Required

                        </h3>

                        <p className="mt-2 text-yellow-100">

                            The uploaded image appears inconsistent with the resident's written description.

                            Contractor assignment has been temporarily paused until the resident confirms the correct issue.

                        </p>

                    </div>

                )

            }

            <div className="mt-8 space-y-8">

                <EmailBlock

                    title="🏠 Resident Update"

                    subject={residentSubject}

                    body={communication.tenant_message}

                />

                <EmailBlock

                    title="🧑‍💼 Property Manager Summary"

                    subject={managerSubject}

                    body={communication.internal_summary}

                />

                <EmailBlock

                    title="🛠 Contractor Work Order"

                    subject={contractorSubject}

                    body={communication.contractor_message}

                    disabled={mismatch}

                />

            </div>

        </section>

    );

}