
module.exports = function(){


    /**
     * Given a player ID, loads it's round id only from the DB
     * @method function
     * @param  {[integer]}   _playerId [the player id]
     * @param  {Function(err, lastRoundId)} next      [(err, lastRoundId)]
     */
    this.getLastRound = function(_playerId, next){

      var DB = new sails.services.databaseservice();
      var query = sails.config.queries.user_lastround;
      var binds = {id: _playerId};
      DB.executeQuery(query, binds, (err, result) => {
          if(err)
            return next(err);

          return next(null, result[0].LASTROUNDID);
      });
    };


    /**
     * Gets all of the user friends
     * @method function
     */
    this.getFriendsList = function(_playerId, next) {

      var DB = new sails.services.databaseservice();
      var query = sails.config.queries.all_friends;
      var binds = {me: _playerId};
      DB.executeQuery(query, binds, (err, result) => {
          if(err)
            return next(err);

          return next(null, result);
      });
    };


    /**
     * Loads all player info (including previous courses)
     * @method function
     */
    this.getAllPlayerInfo = function(_playerId, next){

      var object = {};
      var CourseLoader     = new sails.services.courseloader();

      // load player data
      sails.controllers.player.getPlayer(_playerId, (err, players) => {
          if(err)
            return next(err);

          object.user = players[0];
          object.user.nextlvl = 50 * Math.pow(2, object.user.PLAYERLEVEL + 1);//progresie geom

          CourseLoader.renderRoundsUntilX(_playerId, (err, result) => {
              if(err)
                return next(err);

              object.courses = result.courses;

              this.getFriendsList(_playerId, (err, friendlist) => {
                  if(err)
                    return next(err);

                  object.friends = friendlist;
                  // sails.log.debug(object);
                  return next(null, object);

              });
          });
      });
    };
};
