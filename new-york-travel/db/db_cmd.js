const sqlite3 = require("sqlite3");

const DBFILEPATH = "./ny_travel.sqlite";

/*  Query parameter object

    columns: columns to return
    joinList: tables to join with join conditions
    filterList: filters to use in WHERE statements
    sortingList: arguments for ORDER BY
    groupBy: arguments to GROUP BY statement
    limit: max number of rows returned

    Format:
    columns = [column_name1, column_name2, ...]
    joinList = [table1, [table2, join_condition2], ...]
    filterList = [[column_name1, condition1, filter_string1], ...]
    sortingList = [[column_name1, "ASC" | "DESC"], ...]
    groupLy = column_name
    limit = max elements as integer

    Example:
    queryParam.columns = ["users.username", "users.password"]
    queryParam.joinList = ["destinations", ["locations", "destinations..loc_id = locations.id"]]
    queryParam.filterList = [["users.username", "LIKE", "jack"], ["locations.name", "=", "Wall Street"]]
    queryParam.sortingList = ["itineraries.name, "ASC"]
    queryParam.groupBy = "users.username"
    queryParam.limit = 1000
*/
class queryParameters {
  columns;
  joinList;
  filterList;
  sortingList;
  groupBy;
  limit;
  constructor(columns, joinList, filterList, sortingList, groupBy, limit) {
    this.columns = columns;
    this.joinList = joinList;
    this.filterList = filterList;
    this.sortingList = sortingList;
    this.groupBy = groupBy;
    this.limit = limit;
  }
}

/*  Insert Parameter object
    
    table: table to insert into
    columnValues: pair of column name and values to insert    

    Format:
    tableName = table name as string
    columnValues = [[column_name1, value1], [column_name2, value2]]

    Example:
    insertParam.tableName = "users"
    insertParam.columnValues = [["username", "jack"],["password", "123"]]
*/
class insertParameters {
  tableName;
  columnValues;
  constructor(tableName, columnValues) {
    this.tableName = tableName;
    this.columnValues = columnValues;
  }
}

// Connect to database
const dbConn = () => {
  const db = new sqlite3.Database(DBFILEPATH, (err) => {
    if (err) {
      console.log("Could not connect to db.");
    } else {
      console.log("Connected to db!");
    }
  });
  return db;
};

// Close database
const dbClose = (db) => {
  db.close((err) => {
    if (err) {
      console.log("Db closeing error:");
      console.log(err.message);
      return;
    }
    console.log("DB closed");
  });
};

// Generate SQL command to query from database, return sql command string on success, null on fail.
const queryCmd = (queryParam) => {
  return 0;
};

// Generate SQL command for inserting items into database, return sql command string on success, null on fail.
const insertCmd = (insertParam) => {
  // let sql_cmd = "INSERT INTO users(first_name,last_name,username,password,residence_city,residence_state) VALUES (?,?,?,?,?,?)";
  if (insertParam.table && insertParam.columnValues.length > 0) {
    let sqlCmd = `INSERT INTO ${insertParam.table}`;
    let columnList = [];
    let valueList = [];
    // Parse columnValues into two lists
    for (let i = 0; i < insertParam.columnValues.length; i++) {
      if (insertParam.columnValues[i].length < 2) {
        console.log("Invalid column value pair for insert");
        return 0;
      }
      columnList.push(insertParam.columnValues[i][0]);
      valueList.push(insertParam.columnValues[i][1]);
    }
    // Get prepared statement placeholder string
    let valueFields = "?,".repeat(insertParam.columnValues.length - 1) + "?";
    let columnNames = columnList.join(",");
    sqlCmd += `${columnNames} VALUES (${valueFields})`;
    return [sqlCmd, valueList];
  } else {
    console.log("Invalid insert parameter");
    return null;
  }
};

// Query items from database
const dbQuery = (queryParam) => {
  let db = dbConn();
  dbClose(db);
  return 0;
};

// Insert items into database
const dbInsert = (insertParam) => {
  let db = dbConn();
  dbClose(db);
  return 0;
};

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
