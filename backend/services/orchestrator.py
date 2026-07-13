from schemas.orchestrator.result import OrchestratorResult

from services.vision_service import analyze_image
from services.classification_service import classify_issue
from services.priority_service import determine_priority
from services.planner_service import generate_plan
from services.communication_service import generate_messages


def process_ticket(
    tenant_message: str,
    image_path: str | None = None,
) -> OrchestratorResult:

    vision = None

    # Run Vision AI only if image exists
    if image_path:

        vision = analyze_image(
            image_path=image_path,
            tenant_message=tenant_message,
        )

        if not vision.is_valid_image:

            raise ValueError(
                vision.invalid_reason
                or "Uploaded image is not a valid maintenance photo."
            )

    # Classification
    classification = classify_issue(
        tenant_message=tenant_message,
        vision_result=vision,
    )

    # Priority
    priority = determine_priority(
        tenant_message=tenant_message,
        vision_result=vision,
        category=classification,
    )

    # Planner
    planner = generate_plan(
        tenant_message=tenant_message,
        vision_result=vision,
        category=classification,
        priority=priority,
    )

    # Communication
    communication = generate_messages(
        tenant_message=tenant_message,
        category=classification,
        priority=priority,
        planner=planner,
        vision=vision,
    )

    return OrchestratorResult(
        vision=vision,
        classification=classification,
        priority=priority,
        planner=planner,
        communication=communication,
    )