from typing import Optional

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, IntegerIDMixin

from config import SECRET_MANAGER
from auth.database import Pers, get_user_db

SECRET = SECRET_MANAGER


class UserManager(IntegerIDMixin, BaseUserManager[Pers, int]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, pers: Pers, request: Optional[Request] = None):
        print(f"User {pers.id} has registered.")


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)