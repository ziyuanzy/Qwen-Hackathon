from pathlib import Path

PROMPT_DIR = Path(__file__).parent.parent / "prompts"


def load_prompt(filename: str) -> str:
    prompt_path = PROMPT_DIR / filename

    with open(prompt_path, "r", encoding="utf-8") as f:
        return f.read()