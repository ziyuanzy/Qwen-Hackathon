from agents.priority_agent import PriorityResult
from services.ai_agent import AIAgent

agent = AIAgent(
    prompt_file="priority.md",
    response_model=PriorityResult,
)


def determine_priority(
    tenant_message: str,
    vision_result,
    category,
):
    return agent.run(
        tenant_message=tenant_message,
        vision_result=vision_result,
        category=category.category,
    )