# project-project-group-6
project-project-group-6 created by GitHub Classroom

# New York Travel
By Aryaan Khan, Alex Shin, and Yuhang Cui

Project Folder: new-york-travel.

## Technology stack:

API: Google Maps API

Scripting Language: Python

Database: SQLite

Backend: Node.js with Express.js

Frontend: React.js

## How to Run the Project
To install dependencies, run "npm install".

To start the backend Express.js server, run "node app.js".

To start the frontend React.js server, run "npm start".

To get the database file we used, download it from "https://drive.google.com/drive/folders/1R3KIhhRInFFefY3-XO-Qwp9ltJILEatd?usp=share_link" and place it in the "db/" folder.

## Description of Files

Frontend Pages:
- Login Page: Default landing page, asks the user to login or register an account.
- Register Page: Provide form for user to create an account.
- Accounts Page: Greets the user, and allow the user to view or create itineraries.
- New Itinerary Page: Allows the user to create a new itinerary. 

Backend Request Endpoints:
- /register: Handle user registration request. 
- /login: Checks if login information is valid. 
- /new-itinerary: Handle request to create a new itinerary. 
- /locations: Returns information about all locations in database. 
- /itineraries: Get list of itineraries of user. 
- /itinerary-entries: Get all destination entries of a itinerary.
- /user-info: Return basic information about a user.

Database Structure:
Tables:
- users: Stores login and basic personal information about each user. 
- itineraries: Stores information about each itinerary. 
- users_itineraries: Links users to each itinerary they created. 
- locations: Contain information about each location to visit, like opening time and address. 
- destinations: Contains information about each destination in the itinerary, such as visit date and timespan. 
- itins_dests: Link each itinerary to the destinations it contains. 
- For more details about each table column, reference db/db_init.sql.

Project folder structure:

app.js: Backend Express server code. Handles database related requests from frontend.

db: Contains database file and related scripts.
- db_cmd.js: Provides functions for database interaction.
- db_init.sql: SQL commands to initialize database tables.
- db_init.sh: Runs db_init.sql to initialize database. 
- fetch_places.py: Fetch location information from Google Maps API and stores it in the database. Requires Google Maps API key to be provided.
- ny_travel.sqlite: Database file, not tracked by Github.

public: Contains frontend resources.
- photos: Contain photos for locations, fetched from Google Maps API.

src: Contains frontend React.js code.
- components: Contains components used by frontend pages, including page body content, header/navbar, and UI elements like buttons.
- pages: Endpoints for routing, renders frontend element from components. 
- styles: Contains css file to deal with fonts.
- Other files included are mostly default React.js startup code.
