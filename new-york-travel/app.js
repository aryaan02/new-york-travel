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
    ["username", "password", "first_name", "last_name", "residence_city", "residence_state"],
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
    /*
    res.sendStatus(200);
    res.send(result[0]);
    */
   res.status(200).send(result[0]);
  } else {
    // Login failed
    console.log("Login failed.");
    res.sendStatus(401);
  }
  console.log("Login request ended");
});

// Insert itinerary into database
const itineraryInsert = async(itineraryJSON) => {
  let insertParam = new dbCmd.insertParameters;
};