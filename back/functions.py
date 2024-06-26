from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError
from sqlalchemy import func
from sqlalchemy.orm import Session, load_only
from passlib.context import CryptContext

import models
import schemas
from datetime import datetime, timedelta
from typing import Union, Any
import jwt

from database import SessionLocal

from config import ALGORITHM, JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES, \
    REFRESH_TOKEN_EXPIRE_MINUTES, NUM_Q_0, NUM_Q_1, NUM_Q_2, NUM_Q_3, NUM_Q_4, NUM_Q_5

from datetime import datetime

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

reusable_oauth = OAuth2PasswordBearer(
    tokenUrl="/login",
    scheme_name="JWT"
)


def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    return password_context.verify(password, hashed_pass)


def create_access_token(subject: Union[str, Any], expires_delta: int = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
    return encoded_jwt


def create_refresh_token(subject: Union[str, Any], expires_delta: int = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)

    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, JWT_REFRESH_SECRET_KEY, ALGORITHM)
    return encoded_jwt


def get_user(db, username: str):
    return db.query(models.User).filter(models.User.fio == username).first()


def get_user_by_fio(db: Session, fio: str):
    return db.query(models.User).filter(models.User.fio == fio).first()


def get_questions(db: Session):
    section0 = db.query(models.ExamTb).filter(models.ExamTb.section == 0).order_by(func.random()).limit(NUM_Q_0).all()
    section1 = db.query(models.ExamTb).filter(models.ExamTb.section == 1).order_by(func.random()).limit(NUM_Q_1).all()
    section2 = db.query(models.ExamTb).filter(models.ExamTb.section == 2).order_by(func.random()).limit(NUM_Q_2).all()
    section3 = db.query(models.ExamTb).filter(models.ExamTb.section == 3).order_by(func.random()).limit(NUM_Q_3).all()
    section4 = db.query(models.ExamTb).filter(models.ExamTb.section == 4).order_by(func.random()).limit(NUM_Q_4).all()
    section5 = db.query(models.ExamTb).filter(models.ExamTb.section == 5).order_by(func.random()).limit(NUM_Q_5).all()
    return section0 + section1 + section2 + section3 + section4 + section5


def get_all_users(db: Session):
    users = db.query(models.User).all()
    return users


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = user.password
    db_user = models.User(fio=user.fio, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_current_user(
        db: Session = Depends(get_db), token: str = Depends(reusable_oauth)
) -> schemas.UserOut:
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])

        username = payload.get("sub", None)
        if username is None:
            raise HTTPException(
                401,
                "could not validate credentials",
            )

    except InvalidTokenError:
        raise HTTPException(
            401,
            "could not validate credentials",
        )
    user = get_user(db, username)

    if user is None:
        raise HTTPException(404, "user not found")

    return schemas.UserOut(
        id=user.id,
        fio=user.fio,
    )


def verify_token(
        db: Session, token: str = Depends(reusable_oauth)
) -> schemas.UserOut:
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])

        username = payload.get("sub", None)
        if username is None:
            raise HTTPException(
                401,
                "could not validate credentials",
            )

    except InvalidTokenError:
        raise HTTPException(
            401,
            "could not validate credentials",
        )
    user = get_user(db, username)
    if user is None:
        raise HTTPException(404, "user not found")

    return schemas.UserOut(
        id=user.id,
        fio=user.fio,
    )


def save_result(db: Session, res: schemas.GetResult):
    user_id = get_user_by_fio(db, fio=res.fio).id
    today = datetime.today()
    ex_res = models.ExamResults(id=res.num_prot, result=res.result, id_pers=user_id, date=today)
    db.add(ex_res)
    db.commit()
    db.refresh(ex_res)
    for ans in res.res_to_show:
        print(ans)
        is_good = 1 if ans["answer"] == ans["rightanswer"] else 0
        ex_ans = models.ExamAns(question=ans["question"], answer=ans["answer"], is_good=is_good, id_pers=user_id,
                                id_attempt=res.num_prot)
        db.add(ex_ans)
        db.commit()
        db.refresh(ex_ans)
    return "ok"
