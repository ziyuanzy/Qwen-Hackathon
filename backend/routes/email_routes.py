from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
import shutil
from pathlib import Path

from database.db import get_db
from services.email_import_service import import_email

router = APIRouter()


@router.post("/import")
async def import_email_route(
    email_file: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    Path("emails").mkdir(exist_ok=True)

    save_path = Path("emails") / email_file.filename

    with open(save_path, "wb") as buffer:

        shutil.copyfileobj(
            email_file.file,
            buffer,
        )

    try:

        ticket = import_email(
            db=db,
            eml_path=str(save_path),
        )

        return ticket

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )