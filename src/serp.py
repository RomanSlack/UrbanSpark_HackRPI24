import serpapi


params = {
   "engine": "google",
   "q": "Volunteering in Rapid City South Dakota",
   "api_key": "8f0f7e61794200e4c5eda13abda9e8144ddfd7f655dad5ca45177feff6b0e1a3"
}


search = serpapi.search(params)
results = search


print(results)                                                         


for x in range(9):
   if "organic_results" in results and len(results["organic_results"]) > 0:
       first_result = results["organic_results"][x]
       title = first_result.get("title", "No title available")
       link = first_result.get("link", "No link available")
       description = first_result.get("snippet", "No description available")


       print(f"Title: {title}")
       print(f"Link: {link}")
       print(f"Description: {description}")
else:
   print("No results found.")
