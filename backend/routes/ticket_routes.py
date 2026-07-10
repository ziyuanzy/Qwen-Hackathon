from fastapi import APIRouter, Depends, File, Form, UploadFile, HTTPException
from sqlalchemy.orm import Session

from database.db import get_db

from services.storage_service import save_upload
from services.ticket_service import submit_ticket

from crud.maintenance import (get_requests, get_request, update_status)

from schemas.ticket_response import TicketResponse
from schemas.status import UpdateStatusRequest

from schemas.approval import ApproveRecommendationRequest
from crud.maintenance import (approve_recommendation, close_ticket)

from services.email_parser import parse_eml
from pathlib import Path

router = APIRouter(
    prefix="/tickets",
    tags=["Ticket"],
)


@router.post("")
async def create_ticket(
    tenant_name: str = Form(...),
    unit_number: str = Form(...),
    tenant_message: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    image_path = save_upload(image)

    return submit_ticket(
        db=db,
        tenant_name=tenant_name,
        unit_number=unit_number,
        tenant_message=tenant_message,
        image_path=image_path,
    )


@router.get(
    "",
    response_model=list[TicketResponse],
)
def list_tickets(
    db: Session = Depends(get_db),
):

    return get_requests(db)

@router.patch(
    "/{request_id}/status",
    response_model=TicketResponse,
)
def change_status(
    request_id: int,
    body: UpdateStatusRequest,
    db: Session = Depends(get_db),
):

    ticket = update_status(
        db,
        request_id,
        body.status,
    )

    if ticket is None:

        raise HTTPException(
            status_code=404,
            detail="Ticket not found",
        )

    return ticket

@router.get(
    "/{request_id}",
    response_model=TicketResponse,
)
def get_ticket_route(
    request_id: int,
    db: Session = Depends(get_db),
):

    ticket = get_request(
        db,
        request_id,
    )

    if ticket is None:

        raise HTTPException(
            status_code=404,
            detail="Ticket not found",
        )

    return ticket

@router.patch(
    "/{request_id}/approve",
    response_model=TicketResponse,
)
def approve_ai_recommendation(

    request_id: int,

    body: ApproveRecommendationRequest,

    db: Session = Depends(get_db),

):

    ticket = approve_recommendation(

        db,

        request_id,

        body.contractor_type,

    )

    if ticket is None:

        raise HTTPException(

            status_code=404,

            detail="Ticket not found",

        )

    return ticket

@router.patch(
    "/{request_id}/close",
    response_model=TicketResponse,
)
def close_case(

    request_id: int,

    db: Session = Depends(get_db),

):

    ticket = close_ticket(
        db,
        request_id,
    )

    if ticket is None:

        raise HTTPException(
            status_code=404,
            detail="Ticket not found",
        )

    return ticket

@router.post("/import-email")
async def import_email(

    email: UploadFile = File(...),

    db: Session = Depends(get_db),

):

    Path("uploads").mkdir(
        exist_ok=True,
    )

    temp_path = (
        f"uploads/{email.filename}"
    )

    with open(
        temp_path,
        "wb",
    ) as f:

        f.write(
            await email.read()
        )

    parsed = parse_eml(
        temp_path,
    )

    if parsed["image_path"] is None:

        raise HTTPException(

            status_code=400,

            detail="Email must contain an image attachment.",

        )

    return submit_ticket(

        db=db,

        tenant_name=parsed["sender"],

        unit_number="Unknown",

        tenant_message=f"{parsed['subject']}\n\n{parsed['body']}",

        image_path=parsed["image_path"],

    )