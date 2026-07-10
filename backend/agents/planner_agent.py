from pydantic import BaseModel, Field


class PlannerResult(BaseModel):

    recommended_contractor: str = Field(
        description="Recommended contractor type"
    )

    estimated_duration: str = Field(
        description="Estimated repair duration"
    )

    estimated_cost: str = Field(
        description="Estimated repair cost"
    )

    immediate_actions: list[str] = Field(
        default_factory=list,
    )