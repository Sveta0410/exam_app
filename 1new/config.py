from dotenv import load_dotenv
import os

load_dotenv()

DB_PATH = os.environ.get("DB_PATH")
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
JWT_REFRESH_SECRET_KEY = os.environ.get("JWT_REFRESH_SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 30 minutes
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days
# число вопросов для каждой секции
NUM_Q_0 = 3
NUM_Q_1 = 8
NUM_Q_2 = 3
NUM_Q_3 = 2
NUM_Q_4 = 2
NUM_Q_5 = 2
