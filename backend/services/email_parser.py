from email import policy
from email.parser import BytesParser

from pathlib import Path
from uuid import uuid4


def parse_eml(file_path: str):

    with open(file_path, "rb") as f:

        msg = BytesParser(
            policy=policy.default,
        ).parse(f)

    subject = msg.get("Subject", "")

    sender = msg.get("From", "")

    body = ""

    if msg.is_multipart():

        for part in msg.walk():

            if (
                part.get_content_type()
                == "text/plain"
            ):

                body = part.get_content()

                break

    else:

        body = msg.get_content()

    attachment_path = None

    for part in msg.iter_attachments():

        filename = part.get_filename()

        if not filename:

            continue

        if filename.lower().endswith(
            (
                ".jpg",
                ".jpeg",
                ".png",
                ".webp",
            )
        ):

            Path("uploads").mkdir(
                exist_ok=True,
            )
            
            attachment_path = f"uploads/{uuid4().hex}_{filename}"

            with open(
                attachment_path,
                "wb",
            ) as img:

                img.write(
                    part.get_payload(
                        decode=True,
                    )
                )

            break

    return {

        "subject": subject,

        "sender": sender,

        "body": body,

        "image_path": attachment_path,

    }