from sqlalchemy import (
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)

from sqlalchemy.orm import relationship
from datetime import datetime
from database.db import Base
from models.status import PENDING


class MaintenanceRequest(Base):

    __tablename__ = "maintenance_requests"

    id = Column(Integer, primary_key=True)

    tenant_name = Column(String)

    unit_number = Column(String)

    tenant_message = Column(Text)

    image_path = Column(
        String,
        nullable=True,
    )

    status = Column(
        String,
        nullable=False,
        default=PENDING,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    analysis = relationship(
        "AIAnalysis",
        back_populates="request",
        uselist=False,
    )

    approved_contractor_type = Column(
    String,
    nullable=True,
    )