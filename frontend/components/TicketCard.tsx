import Link from "next/link";
import { Ticket } from "@/types/ticket";

type Props = {
    ticket: Ticket;
};

function priorityColor(priority?: string) {

    switch (priority) {

        case "Emergency":
            return "bg-red-500/20 text-red-300";

        case "Critical":
            return "bg-red-500/20 text-red-300";

        case "High":
            return "bg-orange-500/20 text-orange-300";

        case "Medium":
            return "bg-yellow-500/20 text-yellow-300";

        default:
            return "bg-green-500/20 text-green-300";

    }

}

function statusColor(
    status: string,
) {

    switch (status) {

        case "Pending":

            return "bg-yellow-500/20 text-yellow-300";

        case "Awaiting Resident Clarification":

            return "bg-red-500/20 text-red-300";

        case "Contractor Assigned":

            return "bg-blue-500/20 text-blue-300";

        case "Closed":

            return "bg-green-500/20 text-green-300";

        default:

            return "bg-slate-700 text-slate-200";

    }

}

export default function TicketCard({
    ticket,
}: Props) {

    return (

        <Link href={`/manager/${ticket.id}`}>

            <div className="
                rounded-xl
                border
                border-slate-800
                bg-slate-900
                p-6
                hover:border-cyan-500
                hover:shadow-cyan-500/10
                transition
            ">

                <div className="flex justify-between">

                    <div>

                        <h2 className="font-bold text-white">

                            {ticket.tenant_name}

                        </h2>

                        <p className="text-slate-300">

                            Unit {ticket.unit_number}

                        </p>

                    </div>

                    <span className="text-slate-500">

                        #{ticket.id}

                    </span>

                </div>

                <div className="mt-5 flex flex-wrap gap-3">

                    <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300">

                        {ticket.analysis?.classification?.category}

                    </span>

                    <span
                        className={`rounded-full px-3 py-1 text-sm ${priorityColor(
                            ticket.analysis?.priority?.priority,
                        )}`}
                    >

                        {ticket.analysis?.priority?.priority}

                    </span>

                    <span
                        className={`rounded-full px-3 py-1 text-sm ${statusColor(
                            ticket.status,
                        )}`}
                    >

                        {ticket.status}

                    </span>

                </div>

                <p className="mt-5 text-sm text-slate-300">

                    {ticket.analysis?.vision?.description}

                </p>

                {ticket.analysis?.vision?.consistency === "MISMATCH" && (

                    <div className="mt-5 rounded-lg border border-red-700 bg-red-900/40 p-3">

                        <p className="font-semibold text-red-300">

                            ⚠️ Possible mismatch detected

                        </p>

                        <p className="mt-2 text-sm text-red-200">

                            Resident description may not match the uploaded image.

                        </p>

                    </div>

                )}

            </div>

        </Link>

    );

}