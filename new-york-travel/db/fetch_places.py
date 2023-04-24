import googlemaps
import time
import sqlite3

# Define the API key (type in your own Google Maps API key)
API_KEY = "AIzaSyD5BEu-hTs6PC3vQNum5iIPEtW6nXB5wzE"

# Define the client object for Google Maps API
client = googlemaps.Client(API_KEY)

# Initialize the lists for attractions and restaurants
attractions = []
restaurants = []
cafes = []
hotels = []
bars = []

# Define the query for attractions
query = 'attractions in New York'

# Send the Places Text Search request
response = client.places(query)
for result in response['results']:
    attractions.append((result['name'], result['place_id']))

# Keep fetching the next page of results
while 'next_page_token' in response:
    time.sleep(2)
    next_page_token = response['next_page_token']
    response = client.places(query, page_token=next_page_token)
    for result in response['results']:
        attractions.append((result['name'], result['place_id']))

print('-----------------------------')

# Define the query for restaurants
query = 'restaurants in New York'

# Send the Places Text Search request
response = client.places(query)
for result in response['results']:
    restaurants.append((result['name'], result['place_id']))

# Keep fetching the next page of results
while 'next_page_token' in response:
    time.sleep(2)
    next_page_token = response['next_page_token']
    response = client.places(query, page_token=next_page_token)
    for result in response['results']:
        restaurants.append((result['name'], result['place_id']))

print('-----------------------------')

# Define the query for cafes
query = 'cafes in New York'

# Send the Places Text Search request
response = client.places(query)
for result in response['results']:
    cafes.append((result['name'], result['place_id']))

# Keep fetching the next page of results
while 'next_page_token' in response:
    time.sleep(2)
    next_page_token = response['next_page_token']
    response = client.places(query, page_token=next_page_token)
    for result in response['results']:
        cafes.append((result['name'], result['place_id']))

print('-----------------------------')

# Define the query for hotels
query = 'hotels in New York'

# Send the Places Text Search request
response = client.places(query)
for result in response['results']:
    hotels.append((result['name'], result['place_id']))

# Keep fetching the next page of results
while 'next_page_token' in response:
    time.sleep(2)
    next_page_token = response['next_page_token']
    response = client.places(query, page_token=next_page_token)
    for result in response['results']:
        hotels.append((result['name'], result['place_id']))

print('-----------------------------')

# Define the query for bars
query = 'bars in New York'

# Send the Places Text Search request
response = client.places(query)
for result in response['results']:
    bars.append((result['name'], result['place_id']))

# Keep fetching the next page of results
while 'next_page_token' in response:
    time.sleep(2)
    next_page_token = response['next_page_token']
    response = client.places(query, page_token=next_page_token)
    for result in response['results']:
        bars.append((result['name'], result['place_id']))

print('-----------------------------')

# Make connection to the database
conn = sqlite3.connect('ny_travel.sqlite')
cursor = conn.cursor()

# Insert attractions into the database
for attraction in attractions:
    if attraction[1]:
        print(attraction)
        response = client.place(attraction[1])
        # Get photo reference
        if 'photos' in response['result'] and response['result']['photos'][0]['photo_reference']:
            photo_ref = response['result']['photos'][0]['photo_reference']
            photo = client.places_photo(photo_ref, max_width=1000)
            name = attraction[0].replace("/", '')
            with open(f'../public/photos/{name}.jpg', 'wb+') as f:
                for line in photo:
                    f.write(line)

        if 'opening_hours' in response['result'] and 'formatted_address' in response['result'] and 'rating' in response['result'] and 'user_ratings_total' in response['result']:
            query = "INSERT INTO locations (loc_name, loc_hours_mon, loc_hours_tue, loc_hours_wed, loc_hours_thu, loc_hours_fri, loc_hours_sat, loc_hours_sun, loc_addr, loc_type, loc_rating, loc_rating_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

            values = (response['result']['name'],
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][0].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][1].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][2].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][3].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][4].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][5].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][6].split(":")[1:]),
                      response['result']['formatted_address'],
                      'Attraction',
                      response['result']['rating'],
                      response['result']['user_ratings_total'])
            cursor.execute(query, values)
        else:
            query = "INSERT INTO locations (loc_name, loc_addr, loc_type, loc_rating, loc_rating_count) VALUES (?, ?, ?, ?, ?)"

            values = (response['result']['name'],
                      response['result']['formatted_address'],
                      'Attraction',
                      response['result']['rating'],
                      response['result']['user_ratings_total'])
            cursor.execute(query, values)
        conn.commit()

# Insert restaurants into the database
for restaurant in restaurants:
    if restaurant[1]:
        print(restaurant)
        response = client.place(restaurant[1])
        # Get photo reference
        if 'photos' in response['result'] and response['result']['photos'][0]['photo_reference']:
            photo_ref = response['result']['photos'][0]['photo_reference']
            photo = client.places_photo(photo_ref, max_width=1000)
            name = restaurant[0].replace("/", '')
            with open(f'../public/photos/{name}.jpg', 'wb+') as f:
                for line in photo:
                    f.write(line)

        if 'opening_hours' in response['result']:
            query = "INSERT INTO locations (loc_name, loc_hours_mon, loc_hours_tue, loc_hours_wed, loc_hours_thu, loc_hours_fri, loc_hours_sat, loc_hours_sun, loc_addr, loc_type, loc_rating, loc_rating_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

            values = (response['result']['name'],
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][0].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][1].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][2].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][3].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][4].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][5].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][6].split(":")[1:]),
                      response['result']['formatted_address'],
                      'Restaurant',
                      response['result']['rating'],
                      response['result']['user_ratings_total'])
            cursor.execute(query, values)
        else:
            query = "INSERT INTO locations (loc_name, loc_addr, loc_type, loc_rating, loc_rating_count) VALUES (?, ?, ?, ?, ?)"

            values = (response['result']['name'],
                      response['result']['formatted_address'],
                      'Restaurant',
                      response['result']['rating'],
                      response['result']['user_ratings_total'])
            cursor.execute(query, values)
        conn.commit()

# Insert cafes into the database
for cafe in cafes:
    if cafe[1]:
        print(cafe)
        response = client.place(cafe[1])
        # Get photo reference
        if 'photos' in response['result'] and response['result']['photos'][0]['photo_reference']:
            photo_ref = response['result']['photos'][0]['photo_reference']
            photo = client.places_photo(photo_ref, max_width=1000)
            name = cafe[0].replace("/", '')
            with open(f'../public/photos/{name}.jpg', 'wb+') as f:
                for line in photo:
                    f.write(line)

        if 'opening_hours' in response['result']:
            query = "INSERT INTO locations(loc_name, loc_hours_mon, loc_hours_tue, loc_hours_wed, loc_hours_thu, loc_hours_fri, loc_hours_sat, loc_hours_sun, loc_addr, loc_type, loc_rating, loc_rating_count) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

            values = (response['result']['name'],
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][0].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][1].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][2].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][3].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][4].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][5].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][6].split(":")[1:]),
                      response['result']['formatted_address'],
                      'Cafe',
                      response['result']['rating'],
                      response['result']['user_ratings_total'])
            cursor.execute(query, values)
        else:
            query = "INSERT INTO locations(loc_name, loc_addr, loc_type, loc_rating, loc_rating_count) VALUES(?, ?, ?, ?, ?)"

            values = (response['result']['name'],
                      response['result']['formatted_address'],
                      'Cafe',
                      response['result']['rating'],
                      response['result']['user_ratings_total'])
            cursor.execute(query, values)
        conn.commit()

# Insert hotels into the database
for hotel in hotels:
    if hotel[1]:
        print(hotel)
        response = client.place(hotel[1])
        # Get photo reference
        if 'photos' in response['result'] and response['result']['photos'][0]['photo_reference']:
            photo_ref = response['result']['photos'][0]['photo_reference']
            photo = client.places_photo(photo_ref, max_width=1000)
            name = hotel[0].replace("/", '')
            with open(f'../public/photos/{name}.jpg', 'wb+') as f:
                for line in photo:
                    f.write(line)

        if 'opening_hours' in response['result']:
            query = "INSERT INTO locations(loc_name, loc_hours_mon, loc_hours_tue, loc_hours_wed, loc_hours_thu, loc_hours_fri, loc_hours_sat, loc_hours_sun, loc_addr, loc_type, loc_rating, loc_rating_count) VALUES(?, ?, ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)"

            values = (response['result']['name'],
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][0].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][1].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][2].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][3].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][4].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][5].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][6].split(":")[1:]),
                      response['result']['formatted_address'],
                      'Hotel',
                      response['result']['rating'],
                      response['result']['user_ratings_total'])
            cursor.execute(query, values)
        else:
            query = "INSERT INTO locations(loc_name, loc_addr, loc_type, loc_rating, loc_rating_count) VALUES(?, ?, ?, ?, ?)"

            values = (response['result']['name'],
                      response['result']['formatted_address'],
                      'Hotel',
                      response['result']['rating'],
                      response['result']['user_ratings_total'])
            cursor.execute(query, values)
        conn.commit()

# Insert bars into the database
for bar in bars:
    if bar[1]:
        print(bar)
        response = client.place(bar[1])
        # Get photo reference
        if 'photos' in response['result'] and response['result']['photos'][0]['photo_reference']:
            photo_ref = response['result']['photos'][0]['photo_reference']
            photo = client.places_photo(photo_ref, max_width=1000)
            name = bar[0].replace("/", '')
            with open(f'../public/photos/{name}.jpg', 'wb+') as f:
                for line in photo:
                    f.write(line)

        if 'opening_hours' in response['result']:
            query = "INSERT INTO locations(loc_name, loc_hours_mon, loc_hours_tue, loc_hours_wed, loc_hours_thu, loc_hours_fri, loc_hours_sat, loc_hours_sun, loc_addr, loc_type, loc_rating, loc_rating_count) VALUES(?, ?, ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)"

            values = (response['result']['name'],
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][0].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][1].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][2].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][3].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][4].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][5].split(":")[1:]),
                      ':'.join(response['result']['opening_hours']
                               ['weekday_text'][6].split(":")[1:]),
                      response['result']['formatted_address'],
                      'Bar',
                      response['result']['rating'],
                      response['result']['user_ratings_total'])
            cursor.execute(query, values)
        else:
            query = "INSERT INTO locations(loc_name, loc_addr, loc_type, loc_rating, loc_rating_count) VALUES(?, ?, ?, ?, ?)"

            values = (response['result']['name'],
                      response['result']['formatted_address'],
                      'Bar',
                      response['result']['rating'],
                      response['result']['user_ratings_total'])
            cursor.execute(query, values)
        conn.commit()


# Close the connection
cursor.close()
conn.close()
