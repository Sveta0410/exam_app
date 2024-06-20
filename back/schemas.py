from typing import Union, List, Any

from pydantic import BaseModel


class UserBase(BaseModel):
    fio: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    fio: str
    is_active: bool

    class Config:
        orm_mode = True


class UserOut(BaseModel):
    id: int
    fio: str


class SystemUser(UserOut):
    password: str


class GetResult(BaseModel):
    num_prot: int
    fio: str
    result: float
    res_to_show: List[Any]


class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str


class TokenPayload(BaseModel):
    sub: str = None
    exp: int = None
