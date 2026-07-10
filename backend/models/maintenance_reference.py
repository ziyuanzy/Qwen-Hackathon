from sqlalchemy import Column, Float, Integer, String
from database.db import Base


class MaintenanceReference(Base):

    __tablename__ = "maintenance_reference"

    id = Column(
        Integer,
        primary_key=True,
    )
    category = Column(
        String,
        unique=True,
        nullable=False,
    )
    contractor_type = Column(
        String,
        nullable=False,
    )
    typical_duration = Column(
        String,
        nullable=False,
    )
    min_cost = Column(
        Float,
        nullable=False,
    )
    max_cost = Column(
        Float,
        nullable=False,
    )
    description = Column(
        String,
        nullable=False,
    )