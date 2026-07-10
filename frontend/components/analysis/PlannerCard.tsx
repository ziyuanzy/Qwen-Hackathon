type Props = {

    planner: Planner;

};

import { Planner } from "@/types/ticket";

export default function PlannerCard({

    planner,

}: Props) {

    return (

        <section className="rounded-xl border bg-slate-900 border-slate-800 shadow-lg p-6">

            <h2 className="text-2xl font-semibold">

                📋 Planner Agent

            </h2>

            <div className="mt-6 space-y-6">

                <div>

                    <p className="text-sm text-slate-400">

                        Recommended Contractor Type

                    </p>

                    <p className="text-xl font-semibold text-blue-600">

                        ⭐ {planner.recommended_contractor}

                    </p>

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <p className="text-sm text-slate-400">

                            Estimated Duration

                        </p>

                        <p>

                            {planner.estimated_duration}

                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-slate-400">

                            Estimated Cost

                        </p>

                        <p>

                            {planner.estimated_cost}

                        </p>

                    </div>

                </div>

                <div>

                    <p className="text-sm text-slate-400">

                        Immediate Actions

                    </p>

                    <ul className="list-disc ml-6 mt-2">

                        {

                            planner.immediate_actions.map(

                                (action) => (

                                    <li key={action}>

                                        {action}

                                    </li>

                                ),

                            )

                        }

                    </ul>

                </div>

                <div>

                    <p className="text-sm text-slate-400">

                        Why this recommendation?

                    </p>

                    <p>

                        {planner.explanation}

                    </p>

                </div>

            </div>

        </section>

    );

}