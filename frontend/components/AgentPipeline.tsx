interface Props {
    loading: boolean;
}

export default function AgentPipeline({ loading }: Props) {

    if (!loading) return null;

    const agents = [
        "Vision Agent",
        "Classification Agent",
        "Priority Agent",
        "Planner Agent",
        "Communication Agent",
    ];

    return (
        <div className="mt-8 rounded-xl border bg-slate-50 p-6">

            <h2 className="mb-4 text-xl font-bold">
                Multi-Agent Processing
            </h2>

            <div className="space-y-3">

                {agents.map((agent) => (

                    <div
                        key={agent}
                        className="flex justify-between rounded-lg border p-3"
                    >

                        <span>{agent}</span>

                        <span className="text-blue-600">
                            Running...
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}