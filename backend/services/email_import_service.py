from email.utils import parseaddr
from pathlib import Path
import re

from crud.ai_analysis import create_analysis
from crud.maintenance import create_request

from services.email_parser import parse_eml
from services.orchestrator import process_ticket


def import_email(
    db,
    eml_path: str,
):

    email = parse_eml(
        eml_path,
    )

    image_path = email["image_path"]

    print("=" * 60)
    print("Image path:", image_path)

    if image_path:

        p = Path(image_path)

        print("Exists:", p.exists())

        if p.exists():

            print("Size:", p.stat().st_size)

    print("=" * 60)

    if image_path is None:

        raise ValueError(
            "No supported image attachment was found. Please advise the resident to attach one JPG, JPEG, PNG or WEBP image to the email before importing."
        )

    sender = email["sender"]

    body = email["body"]

    # --------------------------------------------------
    # Extract possible name from email body signature
    # --------------------------------------------------

    possible_name = None

    lines = [

        line.strip()

        for line in body.splitlines()

        if line.strip()

    ]

    for line in reversed(lines[-8:]):

        if (

            len(line.split()) <= 3

            and not any(

                word in line.lower()

                for word in [
                    "thanks",
                    "regards",
                    "sincerely",
                    "best",
                    "dear",
                    "hi",
                ]

            )

        ):

            possible_name = line

            break

    # --------------------------------------------------
    # Extract unit number
    # --------------------------------------------------

    content = f"{email['subject']}\n{email['body']}"

    unit_match = re.search(
    r"(\d{1,3}-\d{1,4})",
    content,
)

    if unit_match:

        unit_number = unit_match.group(1)

    else:

        unit_number = "Unknown"

    # --------------------------------------------------
    # Determine resident name
    # --------------------------------------------------

    tenant_name = None

    if sender:

        display_name, email_address = parseaddr(
            sender,
        )

        if display_name.strip():

            tenant_name = (
                f"{display_name.strip()} (Email Submission)"
            )

    if not tenant_name:

        if possible_name:

            tenant_name = (
                f"{possible_name} (Email Submission)"
            )

        else:

            tenant_name = (
                "Unknown Resident (Email Submission)"
            )

    # --------------------------------------------------
    # Run AI FIRST
    # --------------------------------------------------

    analysis = process_ticket(

        image_path=image_path,

        tenant_message=body,

    )

    # --------------------------------------------------
    # Only create ticket if AI succeeds
    # --------------------------------------------------

    request = create_request(

        db=db,

        tenant_name=tenant_name,

        unit_number=unit_number,

        tenant_message=body,

        image_path=image_path,

    )

    create_analysis(

        db=db,

        request_id=request.id,

        result=analysis,

    )

    return request