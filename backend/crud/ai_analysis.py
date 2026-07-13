from sqlalchemy.orm import Session

from models.ai_analysis import AIAnalysis


def create_analysis(
    db: Session,
    request_id: int,
    result,
):

    analysis = AIAnalysis(
        request_id=request_id,

        vision=(
            result.vision.model_dump()
            if result.vision
            else None
        ),

        classification=result.classification.model_dump(),

        priority=result.priority.model_dump(),

        planner=(
            result.planner.model_dump()
            if result.planner
            else None
        ),

        communication=(
            result.communication.model_dump()
            if result.communication
            else None
        ),
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return analysis