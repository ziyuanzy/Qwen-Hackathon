import { Priority } from "@/types/ticket";

type Props = {

    priority: Priority;

};

export default function PriorityCard({

    priority,

}: Props) {

    const colour = {

        Critical: "bg-red-500/20 text-red-300",

        High: "bg-orange-500/20 text-orange-300",

        Medium: "bg-yellow-500/20 text-yellow-300",

        Low: "bg-green-500/20 text-green-300",

    }[priority.priority] ?? "text-slate-400";

    return (

        <section className="rounded-xl border bg-slate-900 border-slate-800 shadow-lg p-6">

            <h2 className="text-2xl font-semibold text-white">

                🚨 Priority Agent

            </h2>

            <p className={`mt-5 text-3xl font-bold ${colour}`}>

                {priority.priority}

            </p>

            <p className="mt-4 text-white-400">

                {priority.reason}

            </p>

        </section>

    );

}