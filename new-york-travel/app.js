const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbCmd = require("./db/db_cmd.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Confirm server connection
app.listen(5000, () => {
  console.log("Server started (http://localhost:5000/) !");
});

// Send test message
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Function to register user in database
// TODO: Check for duplicate username
const registerUser = async (userInfoJSON) => {
  let insertParam = new dbCmd.insertParameters("users", [
    ["first_name", userInfoJSON["first_name"]],
    ["last_name", userInfoJSON["last_name"]],
    ["username", userInfoJSON["username"]],
    ["password", userInfoJSON["password"]],
    ["residence_city", userInfoJSON["residence_city"]],
    ["residence_state", userInfoJSON["residence_state"]],
  ]);
  console.log(userInfoJSON);
  console.log(insertParam);
  let result = await dbCmd.dbInsert(insertParam);
  return result;
};

// Handles register post request
app.post("/register", async (req, res) => {
  const result = await registerUser(req.body);
  if (result === false) {
    console.log("Registration failed");
    res.sendStatus(401);
  } else {
    console.log("Registration successful");
    res.sendStatus(200);
  }
});

// Return true of user is in database, false of not
const loginCheck = async (userInfoJSON) => {
  let queryParam = new dbCmd.queryParameters(
    ["user_id", "username", "password", "first_name", "last_name", "residence_city", "residence_state"],
    ["users",],
    [
      ["username", "=", userInfoJSON.username],
      ["password", "=", userInfoJSON.password],
    ],
    [],
    [],
    0
  );
  const result = await dbCmd.dbQuery(queryParam);
  console.log(result);
  //console.log(result.length);
  if (result.length > 0) {
    return result;
  } else {
    return [];
  }
};

// Handles login post request
app.post("/login", async (req, res) => {
  console.log("Login request accepted");
  const result = await loginCheck(req.body);
  console.log(result);
  if (result.length > 0) {
    // Login successful
    console.log("Login successful.");
   res.status(200).send(result[0]);
  } else {
    // Login failed
    console.log("Login failed.");
    res.sendStatus(401);
  }
  console.log("Login request ended");
});

// Insert itinerary into database, return true on success, false on fail.
const itineraryInsert = async(itinJSON) => {
  /*
  itineraryJSON = {
    userId;
    itinName;
    itinStartDate;
    itinEndDate;
    itinDescription;
    destList[
      {
        locationId;
        visitDate;
        visitStartTime;
        visitEndTime;
        visitNote
      }
    ]
  }
  */

  // Insert Itinerary into DB
  let itinParam = new dbCmd.insertParameters (
    "itineraries",
    [
      ["itin_name", itinJSON.itinName],
      ["start_date", itinJSON.itinStartDate],
      ["end_date", itinJSON.itinEndDate],
      ["itin_description", itinJSON.itinDescription],
    ]
  );
  let itinId = await dbCmd.dbInsert(itinParam);
  if (!(itinId)) {
    console.log("Insert itinerary failed");
    return itinId;
  }

  // Link itin with user
  let userItinParam = new dbCmd.insertParameters (
    "users_itineraries",
    [
      ["user_id", itinJSON.userId],
      ["itin_id", itinId]
    ]
  );
  let userItinId = await dbCmd.dbInsert(userItinParam);
  if (!(userItinId)) {
    console.log("Failted to insert user-itin.");
    return userItinId;
  }

  // Insert each destination into DB and link to itin
  for (const dest of itinJSON.destList) {
    let destParam = new dbCmd.insertParameters (
      "destinations",
      [
        ["loc_id", dest.locationId],
        ["visit_date", dest.visitDate],
        ["visit_start_time", dest.visitStartTime],
        ["visit_end_time", dest.visitEndTime],
        ["visit_note", dest.visitNote]
      ]
    );
    let destId = await dbCmd.dbInsert(destParam);
    if (!(destId)) {
      console.log("Insert dest failed");
      return destId;
    }

    // Link itinerary with dest
    let itinDestParam = new dbCmd.insertParameters (
      "itins_dests",
      [
        ["itin_id", itinId],
        ["dest_id", destId]
      ]
    )
    let itinDestId = await dbCmd.dbInsert(itinDestParam);
    if (!(itinDestId)) {
      console.log("Insert itin-dest failed");
      return itinDestId;
    }
  }

  return true;
};


// Handle itinerary insert post request
app.post("/new-itinerary", async (req, res) => {
  console.log("Itinerary insert request accepted");
  const result = await itineraryInsert(req.body);
  if (result) {
    // Insert successful
    console.log("Itinerary insert successful.");
    res.status(200).send(JSON.stringify(result[0]));
  } else {
    // Insert failed
    console.log("Itinerary insert failed.");
    res.sendStatus(401);
  }
  console.log("Itinerary insert request ended");
});


// Query for all locations in database, return list of results on succcess, empty array on fail.
const locationQuery = async () => {
  let queryParam = new dbCmd.queryParameters (
    ["*"],
    ["locations"],
    [],
    [["loc_name", "ASC"]],
    null,
    0
  );
  let result = await dbCmd.dbQuery(queryParam);
  return result;
};

// Handle request to get locations
app.get("/locations", async (req, res) => {
  const result = await locationQuery();
  if (result.length > 0) {
    // Query successful
    console.log("Location query successful.");
    res.status(200).send(JSON.stringify(result));
  } else {
    // Query failed
    console.log("Location query failed.");
    res.sendStatus(401);
  }
});

// Get all itineraries of user
const itinQuery = async (userId) => {
  // SELECT * FROM itineraries JOIN user_itineraries 
  // ON itineraries.id = user_itineraries.itinerary_id 
  // WHERE user_itineraries.user_id = userId
  let queryParam = new dbCmd.queryParameters(
    [
      "itineraries.itin_id",
      "itineraries.itin_name",
      "itineraries.start_date",
      "itineraries.end_date",
      "itineraries.itin_description"
    ],
    [
      "users",
      ["users_itineraries", "users.user_id=users_itineraries.user_id"],
      ["itineraries", "users_itineraries.itin_id=itineraries.itin_id"]
    ],
    [
      ["users.user_id", "=", userId]
    ],
    [
      ["itineraries.itin_id", "DESC"]
    ],
    null,
    0
  );
  let result = await dbCmd.dbQuery(queryParam);
  return result;
};

// Handle request to get itineraries
app.get("/itineraries/:id", async (req, res) => {
  const result = await itinQuery(req.params.id);
  if (result.length > 0) {
    // Query successful
    console.log("Itin query successful.");
    res.status(200).send(JSON.stringify(result));
  } else {
    // Query failed
    console.log("Itin query failed.");
    res.sendStatus(401);
  }
});

// Lookup all itin info given itin_id
const itinEntryQuery = async (itinId) => {
  // Get itinerary information
  let itinParam = new dbCmd.queryParameters (
    [
      "itin_name",
      "start_date",
      "end_date",
      "itin_description",
    ],
    [
      "itineraries",
    ],
    [
      ["itin_id", "=", itinId]
    ],
    [],
    null,
    0
  ) 
  const itinResult = await dbCmd.dbQuery(itinParam);
  if (itinResult.length === 0) {
    return null;
  }

  // Get destination information
  let destParam = new dbCmd.queryParameters (
    [
      "destinations.visit_date",
      "destinations.visit_start_time",
      "destinations.visit_end_time",
      "destinations.visit_note",
      "locations.loc_name",
      "locations.loc_addr"
    ],
    [
      "itineraries",
      ["itins_dests", "itineraries.itin_id=itins_dests.itin_id"],
      ["destinations", "itins_dests.dest_id=destinations.dest_id"],
      ["locations","destinations.loc_id=locations.loc_id"]
    ],
    [
      ["itineraries.itin_id", "=", itinId]
    ],
    [
      ["destinations.visit_date", "ASC"],
      ["destinations.visit_start_time", "ASC"]
    ],
    null,
    0
  )
  let destResult = await dbCmd.dbQuery(destParam);
  return {
    itin_name: itinResult.itin_name,
    start_date: itinResult.start_date,
    end_date: itinResult.end_date,
    itin_description: itinResult.itinDescription,
    dest_list: destResult
  };
}

// Handles itin info lookup
app.get("/itinerary-entries/:id", async (req, res) => {
  const result = await itinEntryQuery(req.params.itinId);
  if (result) {
    // Query successful
    console.log("Itin entries query successful.");
    res.status(200).send(JSON.stringify(result));
  } else {
    // Query failed
    console.log("Itin entries query failed.");
    res.sendStatus(401);
  }
});
