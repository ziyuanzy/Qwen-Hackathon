from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

UPLOAD_DIR = Path("uploads")

UPLOAD_DIR.mkdir(
    exist_ok=True,
)


def save_upload(
    image: UploadFile,
) -> str:

    extension = Path(
        image.filename,
    ).suffix

    filename = f"{uuid4()}{extension}"

    filepath = UPLOAD_DIR / filename

    with open(
        filepath,
        "wb",
    ) as file:

        file.write(
            image.file.read(),
        )

    return str(filepath)