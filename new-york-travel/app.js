const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const bodyParser = require("body-parser");
const db_cmd = require("./db/db_cmd.js");

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

const registerUser = (userInfoJSON) => {
  let insertParam = new db_cmd.insertParameters("users", [
    ["first_name", userInfoJSON["first_name"]],
    ["last_name", userInfoJSON["last_name"]],
    ["username", userInfoJSON["username"]],
    ["password", userInfoJSON["password"]],
    ["residence_city", userInfoJSON["residence_city"]],
    ["residence_state", userInfoJSON["residence_state"]],
  ]);
  console.log(userInfoJSON);
  console.log(insertParam);
  db_cmd.dbInsert(insertParam);
};

app.post("/register", (req, res) => {
  registerUser(req.body);
});

const loginCheck = async (userInfoJSON) => {
  let queryParam = new db_cmd.queryParameters(
    ["username", "password"],
    ["users"],
    [
      ["username", "=", userInfoJSON.username],
      ["password", "=", userInfoJSON.password],
    ],
    [],
    [],
    0
  );
  const result = await db_cmd.dbQuery(queryParam);
  //console.log(result);
  return result;
};

app.post("/login", async (req, res) => {
  console.log("Login request accepted");
  const result = await loginCheck(req.body);
  console.log(result);
  console.log("Login request ended");
});
