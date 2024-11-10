from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session, create_engine, select
from sqlmodel import Field
from typing import Annotated, Optional, List
from pydantic import BaseModel
from serp import search_serpapi

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

class QueryRequest(BaseModel):
    queries: List[str]  # Expecting a list of strings

@app.post("/search")
async def search(query_request: QueryRequest):
    queries = query_request.queries  # Extract the queries list from the request

    all_results = {}
    for query in queries:
        result = search_serpapi(query)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        all_results[query] = result

    return {"results": all_results}

# User model using SQLModel
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    city: str
    home_address: str
    work_address: str
    age: int

# Create the database tables

# Endpoint to create a new user
@app.post("/users/", response_model=User)
def create_user(user: User):
    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)
        return user

# Endpoint to retrieve a user by name
@app.get("/users/search/", response_model=List[User])
def get_user_by_name(name: str):
    # GET /users/search/?name=name
    with Session(engine) as session:
        statement = select(User).where(User.name == name)
        users = session.exec(statement).all()
        if not users:
            raise HTTPException(status_code=404, detail="User not found")
        return users