

/**
 * Actual fetch of the rows given an result set.
 * @method function
 */
let fetchRowsFromRS = function(connection, resultSet, numRows, next) {

    resultSet.getRows( // get numRows rows
        numRows,
        function (err, rows) {

          connection.release( (err) => {
                  if (err)
                    sails.log.error(err.message);
          });

          if(err || (rows.length === 0)) {
              return next(new Error('Could not fetch any rows.'));

          }

          sails.log.debug('Got ' + rows.length + ' rows.');
          return next(null, rows);

        });
};

/**
 * Actual fetch of the rows given an result set. For a given game id.
 * @method function
 */
let fetchRowsFromRS2 = function(connection, resultSet, numRows, gameID, next) {

    resultSet.getRows( // get numRows rows
        numRows,
        function (err, rows) {
            if(err || (rows.length === 0)) {
                return next(new Error('Could not fetch any rows.'), null,null);

            }
            sails.log.debug('Got ' + rows.length + ' rows.');
            return next(null, gameID, rows);

        });
};


/**
 * This is the service responsable with the Oracle Special Procedure Calls and Queries Fetcher
 * @type {Function}
 */
module.exports = function() {

    /**
     * The Oracle DB Module
     */
    this.oracledb = require('oracledb');


    /**
     * Calls a procedure from the database and fetches the results, passing them to the next function. Warning, does return a cursor. NOT for normal queries.
     * @method procedureFetch
     */
    this.procedureFetch = function (plsql, bindvars, next) {

            var numRows = 8;
            var arrRows;

            this.oracledb.getConnection(sails.config.connections.oracle_user,
                function (err, connection) {
                    if(err) {
                        sails.log.debug(err.message);
                        return next(err, null);
                    }
                    connection.execute(
                        plsql,
                        bindvars,
                        function (err, result) {
                            if(err) {
                                sails.log.debug(err.message);
                                return next(err, null);
                            }

                            fetchRowsFromRS(connection, result.outBinds.cursor, numRows, next);
                        });

        });
      };


      /**
       * Executes a procedure without a result set output. Passes callback to next.
       * @method procedureSimple
       * @param  {[type]}   plsql    [The PLSQL Code to EXECUTE]
       * @param  {[type]}   bindvars [The binded variables]
       * @param  {Function} next     [The next function in line to call]
       */
      this.procedureSimple = function (plsql, bindvars, next) {

          this.oracledb.getConnection(sails.config.connections.oracle_user,
              function (err, connection) {
                  if(err) {
                      sails.log.debug(err.message);
                      return next(err);
                  }

                  connection.execute(
                      plsql,
                      bindvars,
                      function (err, result) {

                        connection.release( (err) => {
                                if (err)
                                  sails.log.error(err.message);
                        });

                        if(err) {
                            sails.log.debug(err);
                            return next(err);
                        }
                        return next(null);
                      });
              });
      };


      /**
       * Executes an SQL query against the database, passing the results to next.
       * @method executeQuery
       * @param  {[type]}   plsql    [The SQL Code to EXECUTE]
       * @param  {[type]}   bindvars [The binded variables]
       * @param  {Function} next     [The next function in line to call]
       */
      this.executeQuery = function (query, bindparams, next) {

          this.oracledb.getConnection(sails.config.connections.oracle_user,
              function (err, connection) {
                  if(err) {
                      sails.log.debug(err.message);
                      return next(err, []);
                  }

                  connection.execute(
                      query,
                      bindparams,
                      function (err, result) {

                        connection.release( (err) => {
                                if (err)
                                  sails.log.error(err.message);
                        });

                        if(err) {
                            sails.log.debug(err);
                            return next(err, []);
                        }

                        return next(err, result.rows);
                      });
              });

      };


      /**
         * Executes an SQL procedure against the database, passing the result (OUT parameters) to next.
         * @method executeQuery
         * @param  {[type]}   plsql    [The SQL Code to EXECUTE]
         * @param  {[type]}   bindvars [The binded variables]
         * @param  {Function} next     [The next function in line to call]
         */
        this.executeProcedure = function (query, bindparams, next) {

            this.oracledb.getConnection(sails.config.connections.oracle_user,
                function (err, connection) {
                    if(err) {
                        sails.log.debug(err.message);
                        return next(err, null);
                    }

                    connection.execute(
                        query,
                        bindparams,
                        function (err, result) {

                            connection.release( (err) => {
                                if (err)
                                  sails.log.error(err.message);
                            });

                            if(err) {
                                return next(err, null);
                            }

                            return next(err, result.outBinds);
                        });
                });

        };


        /**
         * Loads the questions
         * @method loadQuestions
         */
         this.loadQuestions = function (lastRound, gameID, next) {

            var plsql = "BEGIN Game_Managament.loadQuestions(:p_roundID,:nr_questions,:cursor); END;";
            var bindvars = {
              p_roundID: lastRound,
              nr_questions: 5,
                cursor: {
                    type: this.oracledb.CURSOR,
                    dir: this.oracledb.BIND_OUT
                }
            };

            this.procedureFetch2(plsql, bindvars,gameID, next);
        };

        /**
         * Calls a procedure from the database and fetches the results, passing them to the next function. Warning, does return a cursor. NOT for normal queries.
         * @method procedureFetch
         */
        this.procedureFetch2 = function (plsql, bindvars,gameID, next) {

                var numRows = 8;
                var arrRows;

                this.oracledb.getConnection(sails.config.connections.oracle_user,
                    function (err, connection) {
                        if(err) {
                            sails.log.debug(err.message);
                            return next(err, null);
                        }
                        connection.execute(
                            plsql,
                            bindvars,
                            function (err, result) {
                                if(err) {
                                    sails.log.debug(err.message);
                                    return next(err, null);
                                }

                                fetchRowsFromRS2(connection, result.outBinds.cursor, numRows,gameID, next);
                            });

            });
          };


      /**
       * Parse a possible error from the database.
       * @method parseError
       */
      this.parseError = function (err, next) {

              if(err) {

              var containsORA = err.message.indexOf('ORA');

              if(containsORA >= 0) {

                var startIndex = err.message.indexOf(':') + 2;
                err.message = err.message.substr(startIndex, err.length);

                var endIndex = err.message.indexOf('ORA');

                err.message = err.message.substr(0, endIndex);

                sails.log.debug(err.message);

              }
              else {
                err.message = 'Something very very bad happened on the server.';
              }
          }

          next(err);

      };

};
