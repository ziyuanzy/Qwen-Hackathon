from sqlalchemy.orm import Session
from models.maintenance_reference import MaintenanceReference

def get_reference(
    db: Session,
    category: str,
):
    return (
        db.query(
            MaintenanceReference
        )
        .filter(
            MaintenanceReference.category == category
        )
        .first()
    )