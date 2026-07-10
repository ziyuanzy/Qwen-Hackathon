from services.vision_service import analyze_image

result = analyze_image(
    "uploads/leak1.png"
)

print(result.model_dump())