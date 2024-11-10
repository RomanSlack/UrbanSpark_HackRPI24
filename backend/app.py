from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Relationship, SQLModel, Session, create_engine, select
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

class Address(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    address: str
    lat: float
    long: float
    name: str
    url: str

    # Foreign key to relate Address to User
    user_id: int = Field(foreign_key="user.id")

    # Relationship to User model
    user: "User" = Relationship(back_populates="addresses")

# Updated User model with a relationship to Address
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    city: str
    home_address: str
    work_address: str
    age: int

    # One-to-many relationship to Address
    addresses: List[Address] = Relationship(back_populates="user")

# Endpoint to create a new user
@app.post("/users/", response_model=User)
def create_user(user: User):
    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)
        return user

@app.post("/users/{user_name}/addresses/", response_model=Address)
def create_address(user_name: str, address: Address):
    with Session(engine) as session:
        # Fetch the user by name
        user = session.exec(select(User).where(User.name == user_name)).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Associate the address with the user
        address.user_id = user.id
        session.add(address)
        session.commit()
        session.refresh(address)
        return address

# Endpoint to get all addresses for a user by their name
@app.get("/users/{user_name}/addresses/", response_model=List[Address])
def get_addresses_for_user(user_name: str):
    with Session(engine) as session:
        # Fetch the user by name
        user = session.exec(select(User).where(User.name == user_name)).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Get all addresses associated with the user
        addresses = session.exec(select(Address).where(Address.user_id == user.id)).all()
        return addresses
    
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