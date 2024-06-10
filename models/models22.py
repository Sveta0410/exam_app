from sqlalchemy import MetaData, Table, Column, INTEGER, ForeignKey, TEXT, String, Boolean

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from auth.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    items = relationship("Item", back_populates="owner")


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")

# metadata = MetaData()
#
#
# pers = Table(
#     "pers",
#     metadata,
#     Column('id', INTEGER, primary_key=True),
#     Column('FIO', TEXT),
#     Column('email', String(length=320), unique=True, index=True, nullable=False),
#     Column('hashed_password', TEXT),
#     Column('is_active', Boolean, default=True, nullable=False),
#     Column('is_superuser', Boolean, default=False, nullable=False),
#     Column('is_verified', Boolean, default=False, nullable=False),
# )
#
# exam_results = Table(
#     "exam_results",
#     metadata,
#     Column('id', INTEGER, primary_key=True),
#     Column('result', INTEGER),
#     Column('id_pers', INTEGER, ForeignKey("pers.c.id")),
# )
#
# exam_tb = Table(
#     "exam_tb",
#     metadata,
#     Column('id', INTEGER, primary_key=True),
#     Column('exam_tb', TEXT),
#     Column('section', INTEGER),
#     Column('answer1', TEXT),
#     Column('answer2', TEXT),
#     Column('answer3', TEXT),
#     Column('answer4', TEXT),
#     Column('answer5', TEXT),
#     Column('answer6', TEXT),
#     Column('answer7', TEXT),
#     Column('answer8', TEXT),
#     Column('answer9', TEXT),
#     Column('rightanswer', INTEGER),
# )
#
# exam_ans = Table(
#     "exam_ans",
#     metadata,
#     Column('id', INTEGER, primary_key=True),
#     Column('question', INTEGER, ForeignKey("exam_tb.c.id")),
#     Column('answer', INTEGER,),
#     Column('is_good', Boolean),
#     Column('id_pers', INTEGER, ForeignKey("pers.c.id")),
#     Column('id_attempt', INTEGER, ForeignKey("exam_results.c.id")),
# )
