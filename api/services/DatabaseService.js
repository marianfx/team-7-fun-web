/**
 * This is the service responsable with the Oracle Special Procedure Calls and Queries Fetcher
 * @type {Function}
 */
module.exports = function() {
    /**
     * Calls a procedure from the database and fetches the results, passing them to the next function. Warning, does return a cursor. NOT for normal queries.
     * @method procedureFetch
     */
    this.procedureFetch = function (plsql, bindvars, next) {

      var numRows = 8;
      var arrRows;

      this.executer = require("mysql").createConnection(require("../../config/local").mysql_full);
      this.executer.on('error', function(err) {
        return next(err, null);
      });
      var conn = this.executer;
      this.executer.query(
        plsql,
        bindvars,
        function (err, result) {
          if (err) {
            sails.log.debug(err.message);
            return next(err, null);
          }
          //sails.log.debug(result[0]);
          conn.end();
          return next(null, result[0]);
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

        this.executer = require("mysql").createConnection(require("../../config/local").mysql_full);
        this.executer.on('error', function(err) {
          return next(err, null);
        });
        var conn = this.executer;
        this.executer.query(
          plsql,
          bindvars,
          function (err, result) {

            if (err) {
              sails.log.debug(err);
              return next(err);
            }
            //sails.log.debug(result);
            conn.end();
            return next(null);
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

        this.executer = require("mysql").createConnection(require("../../config/local").mysql_full);
        this.executer.on('error', function(err) {
          return next(err, null);
        });
        var conn = this.executer;
        this.executer.query(
          query,
          bindparams,
          function (err, result) {

            if (err) {
              sails.log.debug(err);
              return next(err, []);
            }
            //sails.log.debug(result);
            conn.end();
            return next(err, result);
          });
      };



      /**
         * Executes an SQL procedure against the database, passing the result (OUT parameters) to next.
         * @method executeQuery
         * @param  {[type]}   plsql    [The SQL Code to EXECUTE]
         * @param  {[type]}   bindvars [The binded variables]
         * @param  {Function} next     [The next function in line to call]
         */
        this.executeProcedure = function (query, bindparams, next, isFromAddLuck = false) {

          this.executer = require("mysql").createConnection(require("../../config/local").mysql_full);
          this.executer.on('error', function(err) {
            return next(err, null);
          });
          var conn = this.executer;
          this.executer.query(
            query,
            bindparams,
            function (err, result) {
              if (err) {
                return next(err, null);
              }
              var returnO = result;
              if(!isFromAddLuck)
                returnO = result[0];
              conn.end();
              return next(err, returnO);
            });
        };

      /**
       * Parse a possible error from the database.
       * @method parseError
       */
      this.parseError = function (err, next) {

        if (err) {
          sails.log.debug(err);
          var containsORA = err.message.indexOf('ER_SIGNAL_EXCEPTION');

          if (containsORA >= 0) {
            var startIndex = err.message.indexOf(':') + 2;
            err.message = err.message.substr(startIndex, err.length);

            var endIndex = err.message.indexOf('ORA');
            err.message = err.message.substr(0);
            sails.log.debug(err.message);

          } else {
            err.message = 'Something very very bad happened on the server.';
          }
        }

        next(err);
      };
};
