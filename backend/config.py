import os

from dotenv import load_dotenv

load_dotenv()

QWEN_API_KEY = os.getenv("QWEN_API_KEY")
QWEN_BASE_URL = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1"
QWEN_MODEL = "qwen3.7-plus"
DATABASE_URL = os.getenv("DATABASE_URL")
QWEN_VISION_URL = (
    "https://dashscope-intl.aliyuncs.com/api/v1/"
    "services/aigc/multimodal-generation/generation"
)