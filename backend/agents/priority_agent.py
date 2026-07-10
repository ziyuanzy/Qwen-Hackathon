from pydantic import BaseModel


class PriorityResult(BaseModel):
    priority: str

    reason: str