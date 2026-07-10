from services.classification_service import classify_issue

result = classify_issue(
    tenant_message="Water is leaking from my ceiling.",
    vision_result={
        "damage": "water leak",
        "confidence": 0.95,
    },
)

print(result)