import requests

API_KEY = "2bc4d08d3cdaac43b8a51918b598490a842832827fe00600a0b592a81ab6c37a"

def search_serpapi(query: str):
    url = "https://serpapi.com/search"
    params = {
        "q": query,
        "api_key": API_KEY
    }
    
    response = requests.get(url, params=params)

    # Check for successful response
    if response.status_code == 200:
        data = response.json()
        
        # Extract only the title, link, and snippet from organic results
        simplified_results = [
            {
                "title": result.get("title"),
                "description": result.get("snippet"),
                "link": result.get("link")
            }
            for result in data.get("organic_results", [])
        ]
        
        return simplified_results
    
    else:
        return {"error": f"Failed to fetch data for query '{query}': {response.status_code}", "details": response.text}
