from pydantic import BaseModel

from agents.classification_agent import ClassificationResult
from agents.priority_agent import PriorityResult
from agents.vision_agent import VisionResult


class TicketAnalysisResponse(BaseModel):
    vision: VisionResult
    classification: ClassificationResult
    priority: PriorityResult