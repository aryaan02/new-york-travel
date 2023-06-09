CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    residence_city VARCHAR NOT NULL,
    residence_state VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS itineraries (
    itin_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    itin_name VARCHAR NOT NULL,
    start_date VARCHAR NOT NULL,
    end_date VARCHAR NOT NULL,
    itin_description VARCHAR
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

CREATE TABLE IF NOT EXISTS locations (
    loc_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    loc_name VARCHAR NOT NULL,
    loc_hours_mon VARCHAR,
    loc_hours_tue VARCHAR,
    loc_hours_wed VARCHAR,
    loc_hours_thu VARCHAR,
    loc_hours_fri VARCHAR,
    loc_hours_sat VARCHAR,
    loc_hours_sun VARCHAR,
    loc_addr VARCHAR NOT NULL,
    loc_type VARCHAR NOT NULL,
    loc_rating REAL,
    loc_rating_count INTEGER
);

CREATE TABLE IF NOT EXISTS destinations (
    dest_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    visit_date VARCHAR NOT NULL,
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