

module.exports = function(){

    /**
     * Given a course ID, load and return all the rounds for it.
     * @method loadRoundsForCourse
     * @param  {[type]}            _courseId [The ID of the course]
     * @param  {Function}          next      [(err, resultRows)]
     */
    this.loadRoundsForCourse = function(_courseId, next){
      Round.find()
           .where({courseId: _courseId})
           .then( (_rounds) => {
                return next(null, _rounds);
           })
           .catch(next);
    };

    /**
     * Given a player ID, loads it's round id only from the DB
     * @method function
     * @param  {[type]}   _playerId [description]
     * @param  {Function} next      [description]
     * @return {[type]}             [description]
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
};
