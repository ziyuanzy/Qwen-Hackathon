from pydantic import BaseModel


class CommunicationResult(BaseModel):
    tenant_message: str
    internal_summary: str
    contractor_message: str