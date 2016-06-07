/**
 * [Returns round question vector transposed in html, deleting correctAnswer]
 */
let bindRound = function(res, newvec, q, rows) {

  if (q >= rows.length) {
    sails.log.debug(newvec);
    return sails.controllers.question.renderView(res, newvec);
  }

  if (rows.hasOwnProperty(q)) {


    sails.models.round.findOne({
      roundid: rows[q].ROUNDID
    }).exec(function(err, round) {

      if (err) {
        sails.log.debug(err);
        return res.serverError('Something really bad happened here :(.');
      }
      if (!round)
        return res.notFound('Could not find the round, sorry.');

      rows[q].roundname = round.name;
      delete rows[q].CORRECTANSWER;
      delete rows[q].ROUNDID;
      newvec.push(rows[q]);
      //#####
      return bindRound(res, newvec, q + 1, rows);
    });
  }
};


/**
 * QuestionController
 *
 * @description [the question controller]
 */
module.exports = {

  renderView: function(res, rows) {

    var swig = require('swig');
    var rendered = swig.renderFile('views/game/rounds.swig',{
    questions:rows
    });
      return res.ok(rendered);
  },

  /**
   * Creates a question from the request body.
   */
  create: function(req, res) {

    if (!req.body)
      res.badRequest("You must specify the question");

    return sails.models.question.create(req.body, (err, user) => {
      if (err) {
        sails.log.debug(err);
        return res.serverError("Somthing bad hapened on server ");
      }

      return res.ok({
        message: "Success.",
        status: 1
      });
    });
  },


  /**
   * [Returns the question for the specified roundID in the body of the request(learning mode)]
   */
  render: function(req, res) {

    var roundId = req.param('roundID');
    var nQ = req.param('nrQuestions');

    if (!roundId || !nQ)
      return res.badRequest('You should specify all the data for the questions (roundID and nrQuestions).');

    setStartRound(req.user.id);

    var DB = new sails.services.databaseservice();
    var plsql = sails.config.queries.questions_loader;
    var oracledb = DB.oracledb;

    var bindvars = {
      p_roundID: roundId,
      nr_questions: nQ,
      cursor: {
        type: oracledb.CURSOR,
        dir: oracledb.BIND_OUT
      }
    };

    // search for a player
    sails.models.player.findOne({
      playerID: req.user.id
    }).exec(function(err, player) {

      if (err)
        return res.serverError("Something bad is happening on server");

      if (!player)
        return res.notFound('Could not find this Player, sorry.');

      if (player.lastRoundID < roundId)
        return res.forbidden("Cannot access a round higher than your current round.");

      // fetch the questions
      DB.procedureFetch(plsql, bindvars, function(err, rows) {

        if (err)
          return res.notFound('Seems like that round cannot be found.');

        var newvec = [];
        var q = 0;
        // call the correctAnswer remover
        return bindRound(res, newvec, q, rows);

      });
    });
  },




  submmitRoundAnswers: function(req, res) {
    if (!req.body)
      return res.badRequest("Cannot submmite a whole answe");

    var answers = req.body;
    var response = {};
    var correctAnswers = 0;

    var indexes = [];
    for (var x in answers) {
      indexes.push(x);
    }

    sails.log.debug(req.body);

    sails.log.debug("######################");



    ceckForAnswers(req, res, 0, indexes, answers, {}, correctAnswers);
}
};


let setStartRound = function(userID) {
  var DB = new sails.services.databaseservice();
  var query = sails.config.queries.update_starttime;
  var binds = {
    id: userID
  };
  // execute block plsql witch update LASTROUNDSTART;
  DB.procedureSimple(query, binds, (err) => {
    if (err) res.serverError("Error while entering in round");

  });

};

let sentResultRound = function(req, res, finalList, status, correctAnswers) {
  // setez campul
  var diff;
  var roundID;
  var roundTime;
  var nrOfQuestions;

  sails.log.debug("Sending ... results");
  var DB = new sails.services.databaseservice();
  var query = sails.config.queries.getpast_roundtime;
  var binds = {
    id: req.user.id
  };


  // update difference
  DB.executeQuery(query, binds, (err, result) => {
    if (err) return res.serverError("Error in server while compunting remaining time of round");
    diff = result[0].DIFFERENCE;
    if(diff == null){
      sails.log.debug(diff);
      sails.log.debug(diff==null);
        return res.badRequest("You shoudn't try to cheat  for experience :D");


      }
    // here we make LASTROUNDSTART null for prevent cheating;
    query = sails.config.queries.null_starttime;
      DB.procedureSimple(query, binds, (err) =>{
        if (err) return res.serverError("Error in server sorry for that");
      });
    sails.log.debug("diff=" + diff);
    ///////////////////////////////////////
    // load lastRoundId for user witch subbmited answers
    var PlayerDataLoader = new sails.services.playerdataloader();
    PlayerDataLoader.getLastRound(req.user.id, (err, roundID)=>{
      query = sails.config.queries.get_roundrow;
      binds = {
        id: roundID
      };
      DB.executeQuery(query, binds, (err, result) => {
        if (err) return res.serverError("Cannot read proprety time for current roundID");
        roundTime = result[0].ROUNDTIME;
        nrOfQuestions =  result[0].NROFQUESTIONS;
        sails.log.debug("RoundTime" + roundTime);

        sails.log.debug("Raspunsuri correcte"+correctAnswers);

        var currPercent=(correctAnswers*100)/nrOfQuestions;
        var pastCourse;
        if(currPercent>70)
            pastCourse=true;
        else
            pastCourse=false;
        if (diff > roundTime){ // user is late and have to repeat
          status = false;
          var Json = {
            flagTime: status,
            flagnextRound: pastCourse,
            correctAnswers: finalList
          };
          return res.json(Json);
        }
        else
          status = true;

        var Json;
        if(status && pastCourse){
          query=sails.config.queries.update_experience;
          binds={
            playerid: req.user.id,
            roundid: roundID,
            precent: currPercent
          }
          DB.procedureSimple(query, binds, (err)=>{
            if(err)
               res.serverError("Error on update experience, please try to replay that round");

            Json = {
              flagTime: status,
              flagnextRound: pastCourse,
              correctAnswers: finalList
            };
            return res.json(Json);

          });
        }
        else
        {
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






  // get timeout for current round for ceck if user is late;

};

let ceckForAnswers = function(req, res, index, indexes, answers, finalList, correctAnswers) {
  if (index >= indexes.length) {
    sails.log.debug("FINALL");
    sails.log.debug(index + "..." + indexes.length);
    var status = true;
    sentResultRound(req, res, finalList, status, correctAnswers);
    //return next(null, finalList);
  } else {
    Question.findOne({
      questionID: parseInt(indexes[index])
    }).exec(function(err, foundQ) {
      if (err) {
        return res.serverError("Something wery bad happend we will fix it as soon as we can");

      }
      if (!foundQ)
        return res.badRequest("Cannot find one of your subbmitet question's answer");

      var flag = foundQ.correctAnswer == answers[indexes[index]];
      if (flag) correctAnswers++;
      finalList[indexes[index]] = {
        correctA: flag,
        correctNr: foundQ.correctAnswer
      };
      sails.log.debug(finalList[indexes[index]]);
      sails.log.debug("Going forward.");


      ceckForAnswers(req, res, index + 1, indexes, answers, finalList, correctAnswers);

    });
  }
};
