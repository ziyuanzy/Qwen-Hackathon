from agents.classification_agent import ClassificationResult
from services.ai_agent import AIAgent

agent = AIAgent(
    prompt_file="classification.md",
    response_model=ClassificationResult,
)

def classify_issue(
    tenant_message: str,
    vision_result: dict,
):
    return agent.run(
        tenant_message=tenant_message,
        vision_result=vision_result,
    )