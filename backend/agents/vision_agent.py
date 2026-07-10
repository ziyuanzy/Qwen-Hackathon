from pydantic import BaseModel, Field


class VisionResult(BaseModel):

    is_valid_image: bool = Field(
        description="Whether the uploaded image is a valid maintenance-related image."
    )

    invalid_reason: str | None = Field(
        default=None,
        description="Reason why the uploaded image is invalid, if applicable."
    )

    description: str | None = Field(
        default=None,
        description="A concise description of what is visible in the image."
    )

    damage: str | None = Field(
        default=None,
        description="Primary damage detected."
    )

    confidence: float | None = Field(
        default=None,
        ge=0.0,
        le=1.0,
    )

    hazards: list[str] = Field(
        default_factory=list,
    )

    consistency: str | None = Field(
        default=None, description="MATCH, PARTIAL_MATCH or MISMATCH."
    )

    consistency_reason: str | None = Field(
        default=None, description="Explanation of whether the resident description matches the uploaded image."
    )