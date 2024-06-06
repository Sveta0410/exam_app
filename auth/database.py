from typing import AsyncGenerator

from fastapi import Depends
from fastapi_users.db import SQLAlchemyBaseUserTableUUID, SQLAlchemyUserDatabase
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from sqlalchemy import String, Boolean, Column, TEXT, Integer
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from config import DB_PATH

DATABASE_URL = f"sqlite+aiosqlite:///{DB_PATH}"


class Base(DeclarativeBase):
    pass


class Pers(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = "pers"
    
    id = Column(Integer, primary_key=True)
    FIO = Column(TEXT)
    email = Column(
        String(length=320), unique=True, index=True, nullable=False
    )
    hashed_password = Column(
        String(length=1024), nullable=False
    )
    is_active = Column(Boolean, default=True, nullable=False)
    is_superuser = Column(
        Boolean, default=False, nullable=False
    )
    is_verified = Column(
        Boolean, default=False, nullable=False
    )


engine = create_async_engine(DATABASE_URL)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, Pers)
