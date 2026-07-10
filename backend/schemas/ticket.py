from pydantic import BaseModel


class TicketRequest(BaseModel):
    tenant_name: str
    unit_number: str
    tenant_message: str
    image_path: str