import { OrchestratorResult } from "@/types/orchestrator";

interface Props {
    result: OrchestratorResult | null;
}

export default function ResultCard({ result }: Props) {

    if (!result) return null;

    return (

        <div className="mt-10 rounded-xl bg-white shadow-lg p-8 space-y-8">

            <div>

                <h2 className="text-2xl font-bold">
                    Vision
                </h2>

                <p>
                    {result.vision
                        ? result.vision.damage
                        : "No image submitted"}
                </p>

            </div>

            <div>

                <h2 className="text-2xl font-bold">
                    Classification
                </h2>

                <p>{result.classification.category}</p>

            </div>

            <div>

                <h2 className="text-2xl font-bold">
                    Priority
                </h2>

                <p>{result.priority.priority}</p>

            </div>

            <div>

                <h2 className="text-2xl font-bold">
                    Plan
                </h2>

                <p>{result.planner.summary}</p>

            </div>

            <div>

                <h2 className="text-2xl font-bold">
                    Tenant Reply
                </h2>

                <p>{result.communication.tenant_message}</p>

            </div>

        </div>

    );

}