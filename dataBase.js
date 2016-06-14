module.exports = {

  oracledb: require('oracledb'),

  procedureFetch: function(req, res, plsql, bindvars, next) {

    var oracledb = require('oracledb');
    var numRows = 8;
    var arrRows;

    oracledb.getConnection({
        user: "student",
        password: "student",
        connectString: "localhost/XE"
      },
      function(err, connection) {
        if (err) {
          console.error(err.message);
          return next(null);
        }
        connection.execute(
          plsql,
          bindvars,
          function(err, result) {
            if (err) {
              console.log("Eroare!!:" + err);
              return next(null);
            }
            console.log("Merge bine!");
            fetchRowsFromRS(connection, result.outBinds.cursor, numRows);
          });

        function fetchRowsFromRS(connection, resultSet, numRows) {
          resultSet.getRows( // get numRows rows
            numRows,
            function(err, rows) {
              if (err || (rows.length === 0)) {
                return next(null);

              }
              console.log("fetchRowsFromRS(): Got " + rows.length + " rows");
              return next(rows);

            });
        }
      });

  },

  procedureSimple: function(req, res, plsql, bindvars, next) {

    var oracledb = require('oracledb');

    oracledb.getConnection({
        user: "student",
        password: "student",
        connectString: "localhost/XE"
      },
      function(err, connection) {
        if (err) {
          sails.log.debug(err.message);
          return next(new Error(err));
        }
        connection.execute(
          plsql,
          bindvars,
          function(err, result) {
            if (err) {
              sails.log.debug(err);
              return next(new Error(err));
            }
            sails.log.debug("Database procedure OK.");
            return next(null);
          });
      });
  },

  loadQuestions: function(req, res, next) {

    var oracledb = sails.services.database.oracledb;
    var plsql = "BEGIN Game_Managament.loadQuestions(:p_roundID,:nr_questions,:cursor); END;";
    var bindvars = {
      p_roundID: req.body.roundID,
      nr_questions: 0,
      cursor: {
        type: oracledb.CURSOR,
        dir: oracledb.BIND_OUT
      }
    };
    sails.services.database.procedureFetch(req, res, plsql, bindvars, next);
  }
};
