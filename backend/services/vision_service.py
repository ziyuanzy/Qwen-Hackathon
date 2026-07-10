from agents.vision_agent import VisionResult
from services.prompt_service import load_prompt
from services.qwen_client import vision_chat
from utils.image_utils import image_to_data_uri
from utils.json_utils import parse_json_response
from logger import logger


def analyze_image(
    image_path: str,
    tenant_message: str,
) -> VisionResult:

    image = image_to_data_uri(image_path)

    prompt = (
        load_prompt("vision.md")
        + f"\n\nResident Description:\n{tenant_message}"
    )

    content = [
        {
            "image": image,
        },
        {
            "text": prompt,
        },
    ]

    response = vision_chat(content)

    assistant_text = (
        response["output"]["choices"][0]["message"]["content"][0]["text"]
    )

    data = parse_json_response(
        assistant_text,
    )

    reasoning = response["output"]["choices"][0]["message"].get(
        "reasoning_content",
    )

    if reasoning:

        logger.info(
            "Vision reasoning:\n%s",
            reasoning,
        )

    return VisionResult(**data)