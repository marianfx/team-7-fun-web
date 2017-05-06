var fs = require("fs");
var path = require("path");
var requiredPath = path.resolve(__dirname, 'dbsetup.json');

fs.exists(requiredPath, (exists) => {

  if (exists) {
    fs.readFile(requiredPath, (err, content) => {
      if (err)
        throw err;

      console.log("Config loaded from dbsetup.json");
      var jObject = JSON.parse(content);

      if (!jObject.hasOwnProperty("run") || !jObject.run) {
        console.log("No need to run Database Initializer. If you want to run it, in the config file (dbsetup.json) please set 'run' to true.");
        return;
      }

      CallRunOperations(jObject);
    })
  } else {
    console.log("Cannot find config file dbsetup.json");
    CallRunOperations();
  }
});



function CallRunOperations(jObject) {
  if (!jObject)
    jObject = {};

  RunSqlOperations((hasError) => {

    if (!hasError) {
      jObject.run = false;
      fs.writeFile("dbsetup.json", JSON.stringify(jObject), (err) => {
        if (err) {
          console.log("Failed to write back to file (to make the query execution not run again).")
          return;
        }
        console.log("The execution of queries ended and the settings are saved in the file.");
        process.exit();
      });
    } else {
      console.log("Process finished with errors.")
      process.exit();
    }

  });
}




function RunSqlOperations(next){
    var conn = require("mysql").createConnection(require("./local").mysql_full);
    var queries = [
        "../DB_MySql/1. Project Init.sql",
        "../DB_MySql/2.Game Management.sql",
        "../DB_MySql/3.Player.sql",
        "../DB_MySql/4.Auth.sql",
        "../DB_MySql/5.Triggers.sql",
        "../DB_MySql/6.Populate Items.sql",
        "../DB_MySql/7.Populate Rounds.sql",
        "../DB_MySql/8.Indexes.sql",
    ];
    RunOperation(conn, queries, 0, next);
}

function RunOperation(conn, queries, index, next) {
  var filePath = path.resolve(__dirname, queries[index]);
  console.log("Starting executing " + queries[index]);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.log("Failed to read " + queries[index]);
      console.log(err);
      return next(true);
    }

    conn.on('error', function (err) {
      console.log(err);
      return;
    });

    content = content.toString();
    conn.query(content, [], (err, result) => {
      if (err) {
        console.log(err.message);
        return;
      }

      console.log("Executed with success!");

      if (index >= queries.length - 1) {
        console.log("Finished executing all.")
        return next();
      }
      else{
        RunOperation(conn, queries, index + 1, next);
      }
    });
  });
}