from os import environ

import databases
from fastapi import FastAPI
from sqlalchemy import select

from models.models import pers
from routers import users



SQLALCHEMY_DATABASE_URL = f"sqlite+aiosqlite:///D:\\sveta\\практика\\exam_0\\my_test\\test.db"
# создаем объект database, который будет использоваться для выполнения запросов
database = databases.Database(SQLALCHEMY_DATABASE_URL)


app = FastAPI()


@app.on_event("startup")
async def startup():
    # когда приложение запускается устанавливаем соединение с БД
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    # когда приложение останавливается разрываем соединение с БД
    await database.disconnect()


@app.get("/")
async def read_root():
    # изменим роут таким образом, чтобы он брал данные из БД
    query = (
        select(
                pers.c.id,
                pers.c.FIO,
        )
    )
    return await database.fetch_all(query)

app.include_router(users.router)