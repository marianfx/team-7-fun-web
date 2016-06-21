

/**
 * The service which handles mostly singleplayer and question loading / submitting
 * @return {[function]} [description]
 */
module.exports = function() {

  /**
   * [function consult DB and ceck is player answers is correct and build json final list with correct answers]
   * @param  {[int]} index          [first is 0 ]
   * @param  {[list int]} indexes        [indexes for accessing json question/answers from user]
   * @param  {[json]} answers        [initial json with answers]
   * @param  {[list json]} finalList      [list with correct answers to build]
   * @param  {[int]} correctAnswers [number of correctAnswers]
   */
  this.ceckForAnswers = function(req, res, ref, index, indexes, answers, finalList, correctAnswers) {

    if (index >= indexes.length) {
      sails.log.debug("FINAL");
      sails.log.debug(index + "..." + indexes.length);

      var status = true;
      ref.sentResultRound(req, res, finalList, status, correctAnswers);
      //return next(null, finalList);
    }
    else {
      Question.findOne()
        .where({
          questionID: parseInt(indexes[index])
        }).exec(function(err, foundQ) {

          if (err)
            return res.serverError("Something very bad happened on the server (while retrieving question).");

          if (!foundQ)
            return res.badRequest("Cannot find a question for which you submitted an answer.");

          var flag = foundQ.correctAnswer == answers[indexes[index]];
          if (flag) correctAnswers++;
          finalList[indexes[index]] = {
            correctA: flag,
            correctNr: foundQ.correctAnswer
          };

          sails.log.debug(finalList[indexes[index]]);
          sails.log.debug("Going forward.");

          ref.ceckForAnswers(req, res, ref, index + 1, indexes, answers, finalList, correctAnswers);
        });
    }
  };


  /**
   * [function send json to a user with answers and other stuff to inform user with progress]
   * @param  {[list json]} finalList      [that list contains question wirth correct answer]
   * @param  {[boolean]} status         [true is everything is aleright and no errors]
   */
  this.sentResultRound = function(req, res, finalList, status, correctAnswers) {

    var diff;
    var roundID;
    var roundTime;
    var nrOfQuestions;

    sails.log.debug("Sending results.");
    var DB = new sails.services.databaseservice();
    var query = sails.config.queries.getpast_roundtime;
    var binds = {
      id: req.user.id
    };

    // update difference
    DB.executeQuery(query, binds, (err, result) => {

      if (err)
          return res.serverError("Error in server while compunting remaining time of the round.");

      diff = result[0].DIFFERENCE;
      if (diff == null)
          return res.badRequest("You shoudn't try to cheat for experience :D  (meaning cannot submit while not playing).");

      sails.log.debug("Passed time: " + diff);

      // here we make LASTROUNDSTART null for prevent cheating;
      query = sails.config.queries.null_starttime;
      DB.procedureSimple(query, binds, (err) => {

        if (err)
            return res.serverError("Error in server sorry for that");

        // load lastRoundId for user witch subbmited answers
        var PlayerDataLoader = new sails.services.playerdataloader();
        PlayerDataLoader.getLastRound(req.user.id, (err, roundID) => {

          query = sails.config.queries.get_roundrow;
          binds = {
            id: roundID
          };

          DB.executeQuery(query, binds, (err, result) => {

            if (err)
              return res.serverError("Something bad happened on the server (Cannot read proprety 'time' for current roundID).");

            roundTime = result[0].ROUNDTIME;
            nrOfQuestions = result[0].NROFQUESTIONS;
            sails.log.debug("Round time:" + roundTime);
            sails.log.debug("Correct answers: " + correctAnswers);

            var currPercent = (correctAnswers * 100) / nrOfQuestions;
            var pastCourse;
            if (currPercent > 70)
              pastCourse = true;
            else
              pastCourse = false;

            if (diff > roundTime) { // user is late and has to repeat
              status = false;
              var _jsn = {
                flagTime: status,
                flagnextRound: pastCourse,
                correctAnswers: finalList
              };
              return res.json(_jsn);
            }
            else
              status = true;

            // if everything ok, udate experience, money etc
            var Json;
            if (status && pastCourse) {

              var PS = sails.services.playerservice;
              PS.updateExperience(req.user.id, roundID, currPercent, (err) => {
                if (err)
                  res.serverError("Something bad happened on the server (Error on updating experience, please try to replay that round).");

                Json = {
                  flagTime: status,
                  flagnextRound: pastCourse,
                  correctAnswers: finalList
                };

                return res.json(Json);
              });

            }
            else {
              Json = {
                flagTime: status,
                flagnextRound: pastCourse,
                correctAnswers: finalList
              };

              return res.json(Json);
            }
          });
        });
      });
    });
  };


  /**
   * [function update lastRoundStart for player with userID]
   * @param  {int} userID [id player to update lastRoundStart]
   */
  this.setStartRound = function(userID, res, next) {

    var DB = new sails.services.databaseservice();
    var query = sails.config.queries.update_starttime;
    var binds = {
      id: userID
    };

    sails.log.debug("START ROUND!");
    // execute block plsql witch update LASTROUNDSTART;
    DB.procedureSimple(query, binds, (err) => {
        return next(err);
    });

  };


  /**
   * Adds time for the current player (meaning he plays)
   * @param  {[integer]} _id [The id of the player]
   */
  this.addSomeTime = function(_id, next){

    var DB = new sails.services.databaseservice();
    var query = sails.config.queries.user_details;
    var binds={
      id : _id
    };

    DB.executeQuery(query,binds,(err,result) => {

      if(err)
        return next(new Error('Cannot execute database query for adding time'));

      var stime = result[0].S_TIME;
      var level = result[0].PLAYERLEVEL;
      var cost = Math.ceil(level/3);
      sails.log.debug(stime);
      sails.log.debug("COST " + cost);

      // cannot add time
      if((stime < cost) && (stime === 0))
        return next(null, {
                        flag : false,
                        time : 0
                      });

      query = sails.config.queries.add_time_player;
      binds = {
        playerid : _id
      };

       DB.procedureSimple(query, binds, (err) => {

         if(err)
            return next(null, { flag : false,
                         time : 0
                       });
         return next(null, { flag : true,
                         time : cost*5
                       });

         });
       });
  };

};
