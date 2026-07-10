from sqlalchemy.orm import Session

from crud.ai_analysis import create_analysis
from crud.maintenance import create_request

from services.orchestrator import process_ticket


def submit_ticket(
    db: Session,
    tenant_name: str,
    unit_number: str,
    tenant_message: str,
    image_path: str,
):

    try:

        result = process_ticket(
            tenant_message=tenant_message,
            image_path=image_path,
        )

        request = create_request(
            db=db,
            tenant_name=tenant_name,
            unit_number=unit_number,
            tenant_message=tenant_message,
            image_path=image_path,
        )

        create_analysis(
            db=db,
            request_id=request.id,
            result=result,
        )

        return {
            "success": True,
            "request_id": request.id,
            "status": request.status,
        }

    except Exception as e:

        print("========== TICKET ERROR ==========")
        import traceback
        traceback.print_exc()
        print("==================================")

        return {
            "success": False,
            "message": str(e),
        }