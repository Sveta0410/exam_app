from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from sqlalchemy.sql.annotation import Annotated

import models
import schemas
import os
from datetime import datetime, timedelta
from typing import Union, Any
import jwt

from database import SessionLocal


password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 30 minutes
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days
ALGORITHM = "HS256"
JWT_SECRET_KEY = "os.environ['JWT_SECRET_KEY']"   # should be kept secret
JWT_REFRESH_SECRET_KEY = "os.environ['JWT_REFRESH_SECRET_KEY']"    # should be kept secret

reuseable_oauth = OAuth2PasswordBearer(
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
    db: Session = Depends(get_db), token: str = Depends(reuseable_oauth)
) -> schemas.UserOut:
    try:
        payload=jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])

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
