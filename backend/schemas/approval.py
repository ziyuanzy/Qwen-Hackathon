from pydantic import BaseModel

class ApproveRecommendationRequest(BaseModel):
    contractor_type: str