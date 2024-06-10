from typing import Optional

from fastapi_users import schemas
from typing import Union

from pydantic import BaseModel


class ItemBase(BaseModel):
    title: str
    description: Union[str, None] = None


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    items: list[Item] = []

    class Config:
        orm_mode = True

# class UserRead(schemas.BaseUser[int]):
#     id: int
#     FIO: str
#     email: str
#     is_active: bool = True
#     is_superuser: bool = False
#     is_verified: bool = False
#
#     class Config:
#         orm_mode = True
#
#
# class UserCreate(schemas.BaseUserCreate):
#     FIO: str
#     email: str
#     password: str
#     is_active: Optional[bool] = True
#     is_superuser: Optional[bool] = False
#     is_verified: Optional[bool] = False
