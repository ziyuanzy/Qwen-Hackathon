from openai import OpenAI

from config import (
    QWEN_API_KEY,
    QWEN_BASE_URL,
    QWEN_MODEL,
)

client = OpenAI(
    api_key=QWEN_API_KEY,
    base_url=QWEN_BASE_URL,
    timeout=120,
)


def chat(messages):
    """
    Send a list of messages to Qwen.

    Returns the raw text response.
    """

    completion = client.chat.completions.create(
        model=QWEN_MODEL,
        messages=messages,
    )

    return completion.choices[0].message.content

import requests

from config import (
    QWEN_API_KEY,
    QWEN_MODEL,
    QWEN_VISION_URL,
)


def vision_chat(content):

    payload = {
        "model": QWEN_MODEL,
        "input": {
            "messages": [
                {
                    "role": "user",
                    "content": content,
                }
            ]
        },
        "parameters": {
            "incremental_output": False
        }
    }

    headers = {
        "Authorization": f"Bearer {QWEN_API_KEY}",
        "Content-Type": "application/json",
    }

    try:

        response = requests.post(
            QWEN_VISION_URL,
            headers=headers,
            json=payload,
            timeout=300,
        )

        print("Status:", response.status_code)
        print(response.text)

        response.raise_for_status()

        return response.json()

    except requests.exceptions.Timeout:

        raise ValueError(
            "Qwen Vision took too long to respond. Please try importing the email again."
        )

    except requests.exceptions.RequestException as e:

        raise ValueError(
            f"Unable to contact Qwen Vision: {e}"
        )