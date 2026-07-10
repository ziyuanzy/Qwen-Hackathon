from fastapi import APIRouter, Depends, File, Form, UploadFile
from sqlalchemy.orm import Session

from database.db import get_db

from services.storage_service import save_upload
from services.ticket_service import submit_ticket

router = APIRouter()


@router.post("/ticket")
async def create_ticket(
    tenant_name: str = Form(...),
    unit_number: str = Form(...),
    tenant_message: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    image_path = save_upload(image)

    result = submit_ticket(
        db=db,
        tenant_name=tenant_name,
        unit_number=unit_number,
        tenant_message=tenant_message,
        image_path=image_path,
    )

    return result.model_dump()