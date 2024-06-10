
from typing import AsyncGenerator, Optional, Type

from fastapi import Depends
from fastapi_users.db import SQLAlchemyUserDatabase
from fastapi_users.models import UP
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable, SQLAlchemyBaseOAuthAccountTable
from sqlalchemy import String, Boolean, Column, TEXT, Integer, select, func
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from config import DB_PATH

DATABASE_URL = f"sqlite+aiosqlite:///{DB_PATH}"


class Base(DeclarativeBase):
    pass


class Pers(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = "pers"

    id = Column(Integer, primary_key=True)
    FIO = Column(TEXT, unique=True, index=True, nullable=False)
    email = Column(
        String(length=320)
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


class MySQLAlchemyUserDatabase(SQLAlchemyUserDatabase):
    async def get_by_fio(self, fio: str) -> Optional[UP]:
        statement = select(self.user_table).where(
            func.lower(self.user_table.FIO) == func.lower(fio)
        )
        return await self._get_user(statement)
    pass


engine = create_async_engine(DATABASE_URL)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session

# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
#
# from config import DB_PATH
#
# SQLALCHEMY_DATABASE_URL =  f"sqlite+aiosqlite:///{DB_PATH}"
# # SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"
# >>>>>>> 975da632c845d1c829db3142ca10bf3d94ac909d
#
# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
# )
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
#
# <<<<<<< HEAD
# async def get_user_db(session: AsyncSession = Depends(get_async_session)):
#     yield MySQLAlchemyUserDatabase(session, Pers)
# =======
# Base = declarative_base()
# >>>>>>> 975da632c845d1c829db3142ca10bf3d94ac909d
