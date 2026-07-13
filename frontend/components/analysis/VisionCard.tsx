import { Vision } from "@/types/ticket";

type Props = {

    vision?: Vision | null;

};

function consistencyColour(status?: string) {

    switch (status) {

        case "MATCH":
            return "border-green-700 bg-green-900/40 text-green-200";

        case "PARTIAL_MATCH":
            return "border-yellow-700 bg-yellow-900/40 text-yellow-200";

        case "MISMATCH":
            return "border-red-700 bg-red-900/40 text-red-200";

        default:
            return "border-slate-700 bg-slate-800 text-slate-200";

    }

}

export default function VisionCard({
    vision,
}: Props) {

    if (!vision) {

        return (

            <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

                <h3 className="text-xl font-semibold text-white">
                    👁️ Vision Agent
                </h3>

                <div className="mt-4 rounded-lg bg-slate-800 p-4">

                    <p className="text-slate-300">
                        No photo was submitted for this request.
                    </p>

                    <p className="mt-2 text-slate-400">
                        Vision AI analysis was skipped and the issue was assessed based on the resident's description.
                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

            <h3 className="text-xl font-semibold text-white">
                👁️ Vision Agent
            </h3>

            <div className="mt-4 space-y-3">

                <p className="text-white">
                    Damage: {vision.damage}
                </p>
                <p className="text-white">
                    {vision.description}
                </p>

            </div>

        </div>

    );

}