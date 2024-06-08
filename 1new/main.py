from sqlalchemy.orm import Session
from sqlalchemy.sql.annotation import Annotated

import crud
import models
import schemas
from database import SessionLocal, engine
from fastapi import FastAPI, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from schemas import UserOut,  TokenSchema, SystemUser
from crud import (
    get_hashed_password,
    create_access_token,
    create_refresh_token,
    verify_password,
    get_current_user
)

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency



@app.post("/signup/", summary="Create new user", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(crud.get_db)):
    db_user = crud.get_user_by_fio(db, fio=user.fio)
    if db_user:
        raise HTTPException(status_code=400, detail="fio already registered")
    user.password = get_hashed_password(user.password)
    return crud.create_user(db=db, user=user)


@app.post('/login/', summary="Create access and refresh tokens for user", response_model=TokenSchema)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(crud.get_db)):
    user = crud.get_user_by_fio(db, fio=form_data.username)
    #user = db.get(form_data.username, None)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect fio or password"
        )

    hashed_pass = user.hashed_password
    if not verify_password(form_data.password, hashed_pass):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect fio or password"
        )

    return {
        "access_token": create_access_token(user.fio),
        "refresh_token": create_refresh_token(user.fio),
    }


@app.get('/me', summary='Get details of currently logged in user')
async def get_me(current_user: UserOut = Depends(get_current_user)):
    return {"hello, you are in secret zone"}
# @app.get('/me/', summary='Get details of currently logged in user')
# async def get_me(user: schemas.SystemUser = Depends(get_current_user)):
#     return UserOut(
#         id=user.id,
#         fio=user.fio,
#     )
