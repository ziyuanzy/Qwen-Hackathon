from datetime import datetime

from pydantic import BaseModel

from agents.vision_agent import VisionResult
from agents.classification_agent import ClassificationResult
from agents.priority_agent import PriorityResult
from agents.planner_agent import PlannerResult
from agents.communication_agent import CommunicationResult


class AnalysisResponse(BaseModel):

    vision: VisionResult

    classification: ClassificationResult

    priority: PriorityResult

    planner: PlannerResult

    communication: CommunicationResult

    model_config = {
        "from_attributes": True,
    }


class TicketResponse(BaseModel):

    id: int

    tenant_name: str

    unit_number: str

    tenant_message: str

    image_path: str

    status: str

    created_at: datetime

    analysis: AnalysisResponse | None = None

    model_config = {
        "from_attributes": True,
    }