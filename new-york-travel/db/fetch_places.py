import googlemaps
import time

API_KEY = "AIzaSyD5BEu-hTs6PC3vQNum5iIPEtW6nXB5wzE"

# Define the client object for Google Maps API
client = googlemaps.Client(API_KEY)

attractions = []
restaurants = []

# Define the query for attractions
query = 'attractions in New York'

# Send the Places Text Search request
response = client.places(query)
for result in response['results']:
    attractions.append(result['name'])

# Keep fetching the next page of results
for i in range(2):
    next_page_token = response['next_page_token']
    time.sleep(2)
    response = client.places(query, page_token=next_page_token)
    for result in response['results']:
        attractions.append(result['name'])

query = 'restaurants in New York'

# Send the Places Text Search request
response = client.places(query)
for result in response['results']:
    restaurants.append(result['name'])
    
print(attractions)
print(restaurants)