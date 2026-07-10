from sqlalchemy import Column, ForeignKey, Integer, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from database.db import Base
from datetime import datetime
from sqlalchemy.orm import relationship

class AIAnalysis(Base):

    __tablename__ = "ai_analysis"

    id = Column(Integer, primary_key=True)

    request_id = Column(
        Integer,
        ForeignKey("maintenance_requests.id"),
        nullable=False,
    )

    request = relationship(
        "MaintenanceRequest",
        back_populates="analysis",
    )

    vision = Column(JSONB)

    classification = Column(JSONB)

    priority = Column(JSONB)

    planner = Column(JSONB)

    communication = Column(JSONB)

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