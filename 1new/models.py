from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Float
from database import Base


class User(Base):
    __tablename__ = "pers"

    id = Column(Integer, primary_key=True)
    fio = Column(String, unique=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)


class ExamResults(Base):
    __tablename__ = "exam_results"
    
    id = Column(Integer, primary_key=True)
    result = Column(Float)
    id_pers = Column(Integer, ForeignKey("pers.id"))
    date = Column(Date)


class ExamTb(Base):
    __tablename__ = "exam_tb"

    id = Column(Integer, primary_key=True)
    exam_tb = Column(String)
    section = Column(Integer)
    answer1 = Column(String)
    answer2 = Column(String)
    answer3 = Column(String)
    answer4 = Column(String)
    answer5 = Column(String)
    answer6 = Column(String)
    answer7 = Column(String)
    answer8 = Column(String)
    answer9 = Column(String)
    rightanswer = Column(Integer)


class ExamAns(Base):
    __tablename__ = "exam_ans"

    id = Column(Integer, primary_key=True)
    question = Column(Integer, ForeignKey("exam_tb.id"))
    answer = Column(Integer,)
    is_good = Column(Boolean)
    id_pers = Column(Integer, ForeignKey("pers.id"))
    id_attempt = Column(Integer, ForeignKey("exam_results.id"))
