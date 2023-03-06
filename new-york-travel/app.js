const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors')
const bodyParser = require('body-parser');
const db_cmd = require('./db/db_cmd.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Confirm server connection
app.listen(5000, () => {
    console.log("Server started (http://localhost:5000/) !");
})

// Send test message
app.get("/", (req, res) => {
    res.send("Hello, world!");
})

// Run SQL query
/*
app.get("/zipcode", (req, res) => {
    db.all("SELECT * FROM zipcodes", [], (err, rows) => {
        if (err) {
            console.log("Could not get zipcodes");
        } else {
            res.send(rows);
        }
    })
});
*/

/*
// SQL command to execute
let sql_cmd = "INSERT INTO users(first_name,last_name,username,password,residence_city,residence_state) VALUES (?,?,?,?,?,?)";

// Insert uer registration info into database
const registerUser = (userInfoJSON) => {
    let userInfoArray = [
        userInfoJSON['first_name'],
        userInfoJSON['last_name'],
        userInfoJSON['username'],
        userInfoJSON['password'],
        userInfoJSON['residence_city'],
        userInfoJSON['residence_state'],
    ];
    // console.log("=====================");
    // console.log(userInfoJSON);
    //console.log(userInfoArray);
    db.run(sql_cmd, userInfoArray, function(err) {
        if (err) {
            console.log("Failed to insert user into table.");
            return console.log(err.message);
        } else {
            console.log("Sucessfully completed insert");
        }
    })
    return 0;
}
*/

const registerUser = (userInfoJSON) => {
    let userInfoArray = [
        userInfoJSON['first_name'],
        userInfoJSON['last_name'],
        userInfoJSON['username'],
        userInfoJSON['password'],
        userInfoJSON['residence_city'],
        userInfoJSON['residence_state'],
    ];
    let insertParam = new db_cmd.insertParameters(
        "users",
        [["first_name",userInfoJSON["first_name"]],
        ["last_name",userInfoJSON["last_name"]],
        ["username",userInfoJSON["username"]],
        ["password",userInfoJSON["password"]],
        ["residence_city",userInfoJSON["residence_city"]],
        ["residence_state",userInfoJSON["residence_state"]]]
    );
    console.log(userInfoJSON);
    console.log(insertParam);
    db_cmd.dbInsert(insertParam);
}

app.post("/register", (req, res) => {
    registerUser(req.body);
})