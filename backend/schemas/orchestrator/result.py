from pydantic import BaseModel

from agents.vision_agent import VisionResult
from agents.classification_agent import ClassificationResult
from agents.priority_agent import PriorityResult
from agents.planner_agent import PlannerResult
from agents.communication_agent import CommunicationResult


class OrchestratorResult(BaseModel):

    vision: VisionResult | None = None

    classification: ClassificationResult

    priority: PriorityResult

    planner: PlannerResult

    communication: CommunicationResult

