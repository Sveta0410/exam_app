from fastapi import APIRouter, HTTPException
from my_test.schemas import users
from my_test.utils import users as users_utils


router = APIRouter()


@router.post("/sign-up", response_model=users.User)
async def create_user(user: users.UserCreate):
    db_user = await users_utils.get_user_by_fio(fio=user.FIO)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return await users_utils.create_user(user=user)