from services.qwen_client import ask_qwen

response = ask_qwen(
    "Give me a one sentence explanation of AI."
)

print(response)