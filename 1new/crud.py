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
#from jose import JWTError, jwt

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


# async def get_current_user(db: Session, token: str = Depends(reuseable_oauth)) -> schemas.SystemUser:
#     try:
#         payload = jwt.decode(
#             token, JWT_SECRET_KEY, algorithms=[ALGORITHM]
#         )
#         token_data = schemas.TokenPayload(**payload)
#
#         if datetime.fromtimestamp(token_data.exp) < datetime.now():
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="Token expired",
#                 headers={"WWW-Authenticate": "Bearer"},
#             )
#     except(jwt.JWTError, ValidationError):
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Could not validate credentials",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#
#     user: Union[dict[str, Any], None] = db.get(token_data.sub, None)
#
#     if user is None:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Could not find user",
#         )
#
#     return schemas.SystemUser(**user)

# async def get_current_user(db: Session, token: str = Depends(reuseable_oauth)) -> schemas.SystemUser:
#     try:
#         payload = jwt.decode(
#             token, JWT_SECRET_KEY, algorithms=[ALGORITHM]
#         )
#         username: str = payload.get("sub")
#         token_data = schemas.TokenPayload(**payload)
#
#         if datetime.fromtimestamp(token_data.exp) < datetime.now():
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="Token expired",
#                 headers={"WWW-Authenticate": "Bearer"},
#             )
#     except(jwt.JWTError, ValidationError):
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Could not validate credentials",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#
#     user = get_user_by_fio(db, username)
#     user = models.User(user)
#
#     if user is None:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Could not find user",
#         )
#
#     return user


def get_current_user_by_fio(db: Session, fio: str):
    return db.query(models.User).filter(models.User.fio == fio).first()


# def get_user(db: Session, user_id: int):
#     return db.query(models.User).filter(models.User.id == user_id).first()

def get_user(db, username: str):
    return db.query(models.User).filter(models.User.fio == username).first()

def get_user_by_fio(db: Session, fio: str):
    return db.query(models.User).filter(models.User.fio == fio).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


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
        #logger.error(f'msg="user not found" {username=}')
        raise HTTPException(404, "user not found")

    return schemas.UserOut(
        id=user.id,
        fio=user.fio,
    )


# async def get_current_user(token: Annotated[str, Depends(reuseable_oauth)], db: Session = Depends(get_db),):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = schemas.TokenData(username=username)
#     except InvalidTokenError:
#         raise credentials_exception
#     user = get_user(db, username=token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user
#
#
# async def get_current_active_user(
#     current_user: Annotated[schemas.UserOut, Depends(get_current_user)],
# ):
#     return current_user
