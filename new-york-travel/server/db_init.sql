CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    residence_city VARCHAR NOT NULL,
    residence_state VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS itineraries (
    itin_id INTEGER NOT NULL,
    itin_name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS users_itineraries (
    user_id INTEGER NOT NULL,
    itin_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, itin_id),
    FOREIGN KEY (user_id) 
        REFERENCES users (user_id),
    FOREIGN KEY (itin_id)
        REFERENCES itineraries (itin_id)
);

CREATE TABLE IF NOT EXISTS zipcodes (
    zipcode_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    zipcode VARCHAR NOT NULL,
    city_name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS locations (
    loc_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    loc_name VARCHAR NOT NULL,
    loc_open_time VARCHAR NOT NULL,
    loc_close_time VARCHAR NOT NULL,
    loc_addr VARCHAR NOT NULL,
    zipcode_id INTEGER NOT NULL,
    FOREIGN KEY (zipcode_id)
        REFERENCES zipcodes (zipcode_id)
);

CREATE TABLE IF NOT EXISTS destinations (
    dest_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    visit_start_time VARCHAR NOT NULL,
    visit_end_time VARCHAR NOT NULL,
    visit_note VARCHAR,
    loc_id INTEGER NOT NULL,
    FOREIGN KEY (loc_id)
        REFERENCES locations (loc_id)
);

CREATE TABLE IF NOT EXISTS itins_dests (
    itin_id INTEGER NOT NULL,
    dest_id INTEGER NOT NULL,
    PRIMARY KEY (itin_id, dest_id),
    FOREIGN KEY (itin_id)
        REFERENCES itineraries (itin_id)
    FOREIGN KEY (dest_id)
        REFERENCES destinations (dest_id)
);