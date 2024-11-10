"""
Steps to run this file

1. create a virtual environment
    
    python3 -m venv pkg

2. Initialize the virtual environment

    source venv/pkg/bin/activate

3. Install fastapi

    pip3 install "fastapi[standard]"

4. run it

    fastapi run
"""

from fastapi import (
    FastAPI,
    Query,
    Depends,
    HTTPException,
    status
)
from pydantic import BaseModel
from typing import Annotated
from sqlmodel import (
    create_engine,
    select,
    SQLModel,
    Session,
    Field,

)

app = FastAPI()

# SQL Lite setup 
sql_lite_fn = 'database.db'
sql_lite_url = f"sqlite:///{sql_lite_fn}"
connect_args = {
    "check_same_thread": False
}

engine = create_engine(sql_lite_url, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

# Models
"""
How to use models

https://sqlmodel.tiangolo.com/tutorial/create-db-and-table/
"""
class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    address: str

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/healthz", status_code=status.HTTP_200_OK)
def health():
    return {"live": 1}

@app.get("/search/{query}")
def search(query):
    return  {"result": query}