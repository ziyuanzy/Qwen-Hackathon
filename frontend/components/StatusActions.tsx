"use client";

import { updateTicketStatus } from "@/services/api";

type Props = {

    id: number;

    status: string;

};

const workflow: Record<string, string | null> = {

    "Pending": "Under Review",

    "Under Review": "Contractor Assigned",

    "Contractor Assigned": "In Progress",

    "In Progress": "Completed",

    "Completed": "Closed",

    "Closed": null,

};

export default function StatusActions({

    id,

    status,

}: Props) {

    async function nextStatus() {

        const next = workflow[status];

        if (!next) return;

        await updateTicketStatus(

            id,

            next,

        );

        window.location.reload();

    }

    const next = workflow[status];

    if (!next) {

        return (

            <div className="rounded-lg bg-green-50 p-4 text-green-700">

                ✅ Ticket lifecycle completed.

            </div>

        );

    }

    return (

        <button

            onClick={nextStatus}

            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"

        >

            Move to "{next}"

        </button>

    );

}