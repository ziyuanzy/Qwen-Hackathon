from agents.communication_agent import CommunicationResult
from services.ai_agent import AIAgent

agent = AIAgent(
    prompt_file="communication.md",
    response_model=CommunicationResult,
)


def generate_messages(
    tenant_message: str,
    vision,
    category,
    priority,
    planner,
):

    return agent.run(

        tenant_message=tenant_message,

        vision_description=vision.description,

        consistency=vision.consistency,

        consistency_reason=vision.consistency_reason,

        category=category.category,

        priority=priority.priority,

        contractor=planner.recommended_contractor,

        estimated_duration=planner.estimated_duration,

        estimated_cost=planner.estimated_cost,

        immediate_actions="\n".join(
            planner.immediate_actions,
        ),

    )