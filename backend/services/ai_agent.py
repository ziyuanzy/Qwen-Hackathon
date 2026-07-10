from typing import Type

from pydantic import BaseModel

from services.prompt_service import load_prompt
from services.qwen_client import chat
from utils.json_utils import parse_json_response
import json
from logger import logger

class AIAgent:

    def __init__(
        self,
        prompt_file: str,
        response_model: Type[BaseModel],
    ):
        self.prompt_file = prompt_file
        self.response_model = response_model

    def run(self, **kwargs):

        system_prompt = load_prompt(self.prompt_file)
        logger.debug(f"Running agent: {self.prompt_file}")

        user_prompt = ""

        for key, value in kwargs.items():
            if hasattr(value, "model_dump"):
                value = value.model_dump()
                
            if isinstance(value, dict):
                value = json.dumps(
                    value,
                    indent=2,
                    )
                
            user_prompt += (
                f"{key}:\n"
                f"{value}\n\n"
                )
            
        logger.debug("Prompt sent to Qwen:")
        logger.debug(user_prompt)

        messages = [
            {
                "role": "system",
                "content": system_prompt,
            },
            {
                "role": "user",
                "content": user_prompt,
            },
        ]

        response = chat(messages)

        logger.debug("Raw Qwen response:")
        logger.debug(response)

        try:
            data = parse_json_response(response)
            
        except Exception as e:
            raise ValueError(
                f"""
        Invalid JSON returned.
        Raw response:
        {response}
        """
        ) from e
        
        logger.debug("Parsed JSON:")
        logger.debug(data)
        return self.response_model(**data)