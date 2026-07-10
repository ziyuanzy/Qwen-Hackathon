from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from database.db import Base


class Contractor(Base):
    __tablename__ = "contractors"

    id = Column(Integer, primary_key=True)

    name = Column(String(100))

    specialty = Column(String(50))

    phone = Column(String(20))

    status = Column(
        String(20),
        default="Available"
    )