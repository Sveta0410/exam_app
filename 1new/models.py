from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    fio = Column(String, unique=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
