from database.db import SessionLocal
from services.ticket_service import submit_ticket


def main():
    db = SessionLocal()

    try:
        print("=" * 60)
        print("STARTING END-TO-END PIPELINE TEST")
        print("=" * 60)

        result = submit_ticket(
            db=db,
            tenant_name="John Tan",
            unit_number="12-34",
            tenant_message="Water has been leaking from my ceiling for two days.",
            image_path="uploads/leak1.png",
        )

        print("\n" + "=" * 60)
        print("PIPELINE COMPLETED SUCCESSFULLY")
        print("=" * 60)

        print(result.model_dump_json(indent=4))

        print("\n" + "=" * 60)
        print("END-TO-END TEST PASSED")
        print("=" * 60)

    except Exception:
        print("\n" + "=" * 60)
        print("PIPELINE FAILED")
        print("=" * 60)
        raise

    finally:
        db.close()


if __name__ == "__main__":
    main()