from pydantic import BaseModel


class ClassificationResult(BaseModel):
    category: str