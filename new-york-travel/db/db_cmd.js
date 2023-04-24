const sqlite3 = require("sqlite3");

const DBFILEPATH = "./db/ny_travel.sqlite";

/*  Query parameter object

    columns: columns to return
    joinList: tables to join with join conditions
    filterList: filters to use in WHERE statements
    sortingList: arguments for ORDER BY
    groupBy: arguments to GROUP BY statement, null if not needed
    limit: max number of rows returned, 0 if no limit

    Format:
    columns = [column_name1, column_name2, ...]
    joinList = [table1, [table2, join_condition2], ...]
    filterList = [[column_name1, condition1, filter_string1], ...]
    sortingList = [[column_name1, "ASC" | "DESC"], ...]
    groupBy = column_name
    limit = max elements as integer

    Example:
    queryParam.columns = ["users.username", "users.password"]
    queryParam.joinList = ["destinations", ["locations", "destinations.loc_id = locations.id"]]
    queryParam.filterList = [["users.username", "LIKE", "jack"], ["locations.name", "=", "Wall Street"]]
    queryParam.sortingList = [["itineraries.name, "ASC"]]
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
    
    tableName: table to insert into
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

// Generate SQL command to query from database
// Return sql command string and list of parepared statement values on success
// Return null on fail.
const queryCmd = (queryParam) => {
  console.log(queryParam);
  let sqlCmd = "";
  let valuesList = [];
  if (queryParam.columns.length > 0) {
    // Add columns to select
    sqlCmd += `SELECT ${queryParam.columns.join(",")}`;
  } else {
    console.log("Invalid query parameters: missing columns list.");
    return null;
  }

  // Create JOIN command
  if (queryParam.joinList.length > 0) {
    sqlCmd += ` FROM ${queryParam.joinList[0]}`;
    let tableName, joinCond;
    for (let i = 1; i < queryParam.joinList.length; i++) {
      [tableName, joinCond] = queryParam.joinList[i];
      sqlCmd += ` JOIN ${tableName} ON ${joinCond}`;
    }
  } else {
    console.log("Invalid query parameters: missing join list.");
    return null;
  }

  // Create filter/WHERE command and list of values to filter by
  if (queryParam.filterList.length > 0) {
    let [filterCol, filterOp, filterValue] = queryParam.filterList[0];
    sqlCmd += ` WHERE ${filterCol} ${filterOp} ?`;
    valuesList.push(filterValue);
    for (let i = 1; i < queryParam.filterList.length; i++) {
      [filterCol, filterOp, filterValue] = queryParam.filterList[i];
      sqlCmd += ` AND ${filterCol} ${filterOp} ?`;
      valuesList.push(filterValue);
    }
  }

  // Add groupby command
  if (queryParam.gropuBy) {
    sqlCmd += ` GROUP BY ${queryParam.groupBy}`;
  }

  // Add sorting/ORDER BY command
  if (queryParam.sortingList.length > 0) {
    sqlCmd += ` ORDER BY ${queryParam.sortingList[0][0]} ${queryParam.sortingList[0][1]}`;
    for (let i = 1; i < queryParam.sortingList.length; i++) {
      sqlCmd += `, ${queryParam.sortingList[i][0]} ${queryParam.sortingList[i][1]}`;
    }
  }

  // Add limit statement
  if (queryParam.limit) {
    sqlCmd += ` LIMIT ${queryParam.limit}`;
  }

  return [sqlCmd, valuesList];
};

// Generate SQL command for inserting items into database
// Return sql command string and values for prepared statements on success
// Return null on fail.
const insertCmd = (insertParam) => {
  console.log(insertParam);
  let valueList = [];
  if (insertParam.tableName && insertParam.columnValues.length > 0) {
    let sqlCmd = `INSERT INTO ${insertParam.tableName}`;

    // Parse columnValues into two lists
    let columnList = [];
    for (let i = 0; i < insertParam.columnValues.length; i++) {
      if (Object.keys(insertParam.columnValues[i]).length < 2) {
        console.log("Invalid column value pair for insert");
        return 0;
      }
      columnList.push(insertParam.columnValues[i][0]);
      valueList.push(insertParam.columnValues[i][1]);
    }

    // Get prepared statement placeholder string
    let valueFields = "?,".repeat(insertParam.columnValues.length - 1) + "?";
    let columnNames = columnList.join(",");
    sqlCmd += `(${columnNames}) VALUES (${valueFields})`;

    return [sqlCmd, valueList];
  } else {
    console.log("Invalid insert parameter");
    return null;
  }
};

// Query items from database, return rows object on success, null on fail.
const dbQuery = (queryParam) => {
  let db = dbConn();

  // Get sql command for querying
  let [sqlCmd, valuesList] = queryCmd(queryParam);
  let resultArray = [];
  console.log(sqlCmd);
  console.log(valuesList);

  // Run command and check for errors
  let db_promise = new Promise(resolve => {
    db.all(sqlCmd, valuesList, (err, rows) => {
      if (err) {
        console.log("Error during DB query");
        console.log(err.message);
        resolve(null);
      }
      rows.forEach((row) => {
        resultArray.push(row);
      });
      
      if (resultArray.length > 0) {
        resolve(resultArray);
      } else {
        resolve([]);
      }
    });
  });

  dbClose(db);
  return db_promise;
};

// Insert items into database, return insertd item id on success, null on fail
const dbInsert = (insertParam) => {
  const db = dbConn();

  // Get sql command for inserting
  let [sqlCmd, valueList] = insertCmd(insertParam);

  // Run command and check error message
  let db_promise = new Promise(resolve => {
    db.run(sqlCmd, valueList, function (err) {
      if (err) {
        console.log("Failed to insert into table.");
        console.log(err.message);
        resolve(null);
      } else {
        console.log("Sucessfully completed insert");
        resolve(this.lastID);
      }
    });
  });

  dbClose(db);
  return db_promise;
};

module.exports = {
  queryParameters,
  insertParameters,
  insertCmd,
  queryCmd,
  dbQuery,
  dbInsert,
};
