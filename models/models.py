from sqlalchemy import MetaData, Table, Column, INTEGER, ForeignKey, TEXT, String, Boolean

metadata = MetaData()

pers = Table(
    "pers",
    metadata,
    Column('id', INTEGER, primary_key=True),
    Column('FIO', TEXT),
    Column('email', String(length=320), unique=True, index=True, nullable=False),
    Column('hashed_password', TEXT),
    Column('is_active', Boolean, default=True, nullable=False),
    Column('is_superuser', Boolean, default=False, nullable=False),
    Column('is_verified', Boolean, default=False, nullable=False),
)

exam_results = Table(
    "exam_results",
    metadata,
    Column('id', INTEGER, primary_key=True),
    Column('result', INTEGER),
    Column('id_pers', INTEGER, ForeignKey("pers.c.id")),
)

exam_tb = Table(
    "exam_tb",
    metadata,
    Column('id', INTEGER, primary_key=True),
    Column('exam_tb', TEXT),
    Column('section', INTEGER),
    Column('answer1', TEXT),
    Column('answer2', TEXT),
    Column('answer3', TEXT),
    Column('answer4', TEXT),
    Column('answer5', TEXT),
    Column('answer6', TEXT),
    Column('answer7', TEXT),
    Column('answer8', TEXT),
    Column('answer9', TEXT),
    Column('rightanswer', INTEGER),
)

exam_ans = Table(
    "exam_ans",
    metadata,
    Column('id', INTEGER, primary_key=True),
    Column('question', INTEGER, ForeignKey("exam_tb.c.id")),
    Column('answer', INTEGER,),
    Column('is_good', Boolean),
    Column('id_pers', INTEGER, ForeignKey("pers.c.id")),
    Column('id_attempt', INTEGER, ForeignKey("exam_results.c.id")),
)
