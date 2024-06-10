from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, UUID4
from pydantic import UUID4, BaseModel, Field, validator

class UserCreate(BaseModel):
    """ Проверяет sign-up запрос """
    FIO: str
    password: str


class UserBase(BaseModel):
    """ Формирует тело ответа с деталями пользователя """
    id: int
    FIO: str


class TokenBase(BaseModel):
    token: UUID4 = Field(..., alias="access_token")
    expires: datetime
    token_type: Optional[str] = "bearer"

    class Config:
        allow_population_by_field_name = True

    @validator("token")
    def hexlify_token(cls, value):
        """ Конвертирует UUID в hex строку """
        return value.hex


class User(UserBase):
    """ Формирует тело ответа с деталями пользователя и токеном """
    token: TokenBase = {}