from crud.reference import get_reference
from database.db import SessionLocal
from agents.planner_agent import PlannerResult
from services.ai_agent import AIAgent

agent = AIAgent(
    prompt_file="planner.md",
    response_model=PlannerResult,
)


def generate_plan(
    tenant_message: str,
    vision_result: dict,
    category: str,
    priority: str,
):

    db = SessionLocal()

    try:

        reference = get_reference(
            db,
            category.category,
        )

        return agent.run(
            tenant_message=tenant_message,
            vision_damage=(
                vision_result.damage
                if vision_result
                else "No image provided"
                ),
            category=category.category,
            priority=priority.priority,
            contractor_type=reference.contractor_type,
            duration=reference.typical_duration,
            estimated_cost=f"SGD {reference.min_cost:.0f}-{reference.max_cost:.0f}",
            description=reference.description,
        )

    finally:
        db.close()