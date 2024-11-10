from fastapi import FastAPI, HTTPException
from serp import search_serpapi
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    queries: List[str]  # Expecting a list of strings

@app.post("/search")
async def search(query_request: QueryRequest):
    queries = query_request.queries  # Extract the queries list from the request

    all_results = {}
    for query in queries:
        result = search_serpapi(query)
        print("hello ")
        print(result)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        all_results[query] = result

    return {"results": all_results}
