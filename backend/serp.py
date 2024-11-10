import requests

API_KEY = "fb6e2882f68d0dd7f1f4fecd65f0c082216c780ef8e052378dd59fe41fe4c690"

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
