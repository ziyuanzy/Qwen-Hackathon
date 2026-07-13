from sqlalchemy.orm import joinedload

from models.maintenance_request import MaintenanceRequest

from models.status import (
    STATUS_OPTIONS,
    CONTRACTOR_ASSIGNED,
    AWAITING_RESIDENT,
    CLOSED,
)


def get_requests(db):

    return (

        db.query(MaintenanceRequest)

        .options(

            joinedload(
                MaintenanceRequest.analysis,
            )

        )

        .order_by(
            MaintenanceRequest.created_at.desc(),
        )

        .all()

    )


def get_request(
    db,
    request_id: int,
):

    return (

        db.query(MaintenanceRequest)

        .options(

            joinedload(
                MaintenanceRequest.analysis,
            )

        )

        .filter(
            MaintenanceRequest.id == request_id,
        )

        .first()

    )


def update_status(
    db,
    request_id: int,
    status: str,
):

    if status not in STATUS_OPTIONS:

        raise ValueError(
            "Invalid status",
        )

    request = get_request(
        db,
        request_id,
    )

    if request is None:

        return None

    request.status = status

    db.commit()

    db.refresh(request)

    return request


def approve_recommendation(
    db,
    request_id: int,
    contractor_type: str,
):

    ticket = get_request(
        db,
        request_id,
    )

    if ticket is None:

        return None

    ticket.approved_contractor_type = contractor_type

    consistency = None

    if (
        ticket.analysis
        and ticket.analysis.vision
    ):

        consistency = ticket.analysis.vision.get(
            "consistency",
        )

    if consistency == "MISMATCH":

        ticket.status = AWAITING_RESIDENT

    else:

        ticket.status = CONTRACTOR_ASSIGNED

    db.commit()

    db.refresh(ticket)

    return ticket


def create_request(
    db,
    tenant_name: str,
    unit_number: str,
    tenant_message: str,
    image_path: str | None,
):

    request = MaintenanceRequest(

        tenant_name=tenant_name,

        unit_number=unit_number,

        tenant_message=tenant_message,

        image_path=image_path,

    )

    db.add(request)

    db.commit()

    db.refresh(request)

    return request


def close_ticket(
    db,
    request_id: int,
):

    ticket = get_request(
        db,
        request_id,
    )

    if ticket is None:

        return None

    ticket.status = CLOSED

    db.commit()

    db.refresh(ticket)

    return ticket