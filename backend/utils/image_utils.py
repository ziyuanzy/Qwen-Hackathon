import base64
from pathlib import Path


def image_to_data_uri(image_path: str) -> str:
    """
    Convert an image into a data URI:
    data:image/jpeg;base64,...
    """

    extension = Path(image_path).suffix.lower()

    mime = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
    }.get(extension, "image/jpeg")

    with open(image_path, "rb") as f:
        encoded = base64.b64encode(f.read()).decode()

    return f"data:{mime};base64,{encoded}"