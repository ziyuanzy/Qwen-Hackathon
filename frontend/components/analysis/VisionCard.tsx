import { Vision } from "@/types/ticket";

type Props = {

    vision: Vision;

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

    return (

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

            <h2 className="text-2xl font-semibold text-white">

                👁 Vision Agent

            </h2>

            <div className="mt-6 space-y-6">

                <div>

                    <p className="text-sm text-slate-400">

                        Damage Detected

                    </p>

                    <p className="mt-1 text-lg text-white">

                        {vision.damage}

                    </p>

                </div>

                <div>

                    <p className="text-sm text-slate-400">

                        Confidence

                    </p>

                    <p className="mt-1 text-white">

                        {vision.confidence
                            ? `${(vision.confidence * 100).toFixed(1)}%`
                            : "N/A"}

                    </p>

                </div>

                <div>

                    <h3 className="font-semibold text-white">

                        AI Consistency Check

                    </h3>

                    <div
                        className={`mt-3 rounded-lg border p-4 ${consistencyColour(
                            vision.consistency,
                        )}`}
                    >

                        {vision.consistency ? (

    <>
        <p className="font-semibold">

            {vision.consistency.replaceAll("_", " ")}

        </p>

        <p className="mt-2">

            {vision.consistency_reason}

        </p>

    </>

) : (

    <>

        <p className="font-semibold">

            NOT AVAILABLE

        </p>

        <p className="mt-2">

            This ticket was analysed before consistency checking was introduced.

        </p>

    </>

)}

                    </div>

                </div>

                <div>

                    <p className="text-sm text-slate-400">

                        Hazards Identified

                    </p>

                    {

                        vision.hazards.length === 0 ? (

                            <p className="mt-2 text-slate-300">

                                No significant hazards detected.

                            </p>

                        ) : (

                            <ul className="mt-2 ml-5 list-disc text-slate-200">

                                {

                                    vision.hazards.map(

                                        (hazard) => (

                                            <li key={hazard}>

                                                {hazard}

                                            </li>

                                        ),

                                    )

                                }

                            </ul>

                        )

                    }

                </div>

            </div>

        </section>

    );

}