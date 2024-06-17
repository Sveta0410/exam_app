import time

from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import Any, Callable

import crud
import models
import schemas
from database import SessionLocal, engine
from fastapi import FastAPI, Request, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from schemas import UserOut, TokenSchema, SystemUser, GetResult
from fastapi.middleware.cors import CORSMiddleware
from crud import (
    get_hashed_password,
    create_access_token,
    create_refresh_token,
    verify_password,
    get_current_user
)

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:8000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next: Callable) -> Any:
    start_time = time.time()
    response = await call_next(request)

    # logger.info(
    #     f'method="{request.scope["method"]}" router="{request.scope["path"]}" '
    #     f"process_time={round(time.time() - start_time, 3)} "
    #     f"status_code={response.status_code}"
    # )
    return response


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}


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
    return current_user


@app.get("/all")
def all_page(db: Session = Depends(crud.get_db), current_user: UserOut = Depends(get_current_user)):
    all_data = db.query(models.ExamTb).all()
    return all_data
    # return {
    #     "data": [item.generate_dictionary() for item in all_data]
    # }


@app.get("/random")
def random_page(db: Session = Depends(crud.get_db), current_user: UserOut = Depends(get_current_user)):
    #all_data = db.query(models.ExamTb).all()
    all_data = db.query(models.ExamTb).order_by(func.random()).first()
    my_quiz = crud.get_questions(db)
    return my_quiz
    # return {
    #     "Question": choice(all_data).generate_dictionary()
    # }


@app.get("/r")
def random_page(db: Session = Depends(crud.get_db)):
    #all_data = db.query(models.ExamTb).all()
    all_data = db.query(models.ExamTb).order_by(func.random()).first()
    my_quiz = crud.get_questions(db)
    return my_quiz
    # return {
    #     "Question": choice(all_data).generate_dictionary()
    # }


@app.post("/write_res/")
def create_user(res: schemas.GetResult,  db: Session = Depends(crud.get_db)):
    # numProt: numProt,
    # fio: fio,
    # resToShow: resToShow,
    # result: countCorrect / questions.length * 5
    # db_user = crud.get_user_by_fio(db, fio=user.fio)
    # if db_user:
    #     raise HTTPException(status_code=400, detail="fio already registered")
    # user.password = get_hashed_password(user.password)
    print(res)
    return crud.get_user_by_fio(db, res.fio)
