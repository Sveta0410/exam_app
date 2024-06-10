from sqlalchemy import MetaData, Table, Column, INTEGER, ForeignKey, TEXT, String, Boolean, UUID, text, Integer, \
    DateTime

metadata = MetaData()


pers = Table(
    "pers",
    metadata,
    Column('id', INTEGER, primary_key=True),
    Column('FIO', TEXT),
    Column('hash_password', TEXT),
)

exam_results = Table(
    "exam_results",
    metadata,
    Column('id', INTEGER, primary_key=True),
    Column('result', INTEGER),
    Column('id_pers', INTEGER, ForeignKey("pers.id")),
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
    Column('question', INTEGER, ForeignKey("exam_tb.id")),
    Column('answer', INTEGER,),
    Column('is_good', Boolean),
    Column('id_pers', INTEGER, ForeignKey("pers.id")),
    Column('id_attempt', INTEGER, ForeignKey("exam_results.id")),
)

tokens_table = Table(
    "tokens",
    metadata,
    Column("id", Integer, primary_key=True),
    Column(
        "token",
        UUID(as_uuid=False),
        server_default=text("uuid_generate_v4()"),
        unique=True,
        nullable=False,
        index=True,
    ),
    Column("expires", DateTime()),
    Column("pers_id", ForeignKey("pers.id")),
)