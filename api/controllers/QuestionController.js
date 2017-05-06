
/**
 * [Recursively gets the rounds ]
 * @param  {[type]} res       [description]
 * @param  {[type]} newvec    [description]
 * @param  {[type]} q         [description]
 * @param  {[type]} rows      [description]
 * @param  {[type]} roundTime [description]
 * @return {[type]}           [description]
 */
let bindRound = function (res, newvec, q, rows, roundTime) {

  sails.log.debug("In bind round method.");

  if (q >= rows.length || !rows.hasOwnProperty(q)) {
    sails.log.debug(newvec);
    sails.log.debug("CURRENT ROUNDTIME IS " + roundTime);
    return sails.controllers.question.renderView(res, newvec, roundTime);
  }
  
  sails.models.round.findOne({
    roundid: rows[q].ROUNDID
  }).exec(function (err, round) {
    if (err) {
      return res.serverError('Something really bad happened here :(.');
    }
    if (!round)
      return res.notFound('Could not find the round, sorry.');
    var roundTime = round.roundTime;
    rows[q].roundname = round.name;
    delete rows[q].CORRECTANSWER;
    delete rows[q].ROUNDID;
    newvec.push(rows[q]);
    //#####
    return bindRound(res, newvec, q + 1, rows, roundTime);
  });
};



/**
 * QuestionController - the controller which handles the requests for questions & singleplayer
 *
 * @description [the question controller]
 */
module.exports = {

  /**
   * [return a rendered HTML content for round]
   * @param  {response} res  [response for client]
   * @param  {json} rows [json with content for a render]
   * @return {[String]}      [html content]
   */
  renderView: function(res, rows, roundTime) {

    var swig = require('swig');
    var rendered = swig.renderFile('views/game/rounds.swig', {
      questions : rows,
      time : roundTime
    });

    return res.ok(rendered);
  },


  /**
   * [Creates a question from the request body]
   */
  create: function(req, res) {

    if (!req.body)
      return res.badRequest("You must specify the question.");

    return sails.models.question.create(req.body, (err, user) => {
      if (err) {
        return res.serverError("Somthing bad hapened on server(while creating question).");
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

    if (!roundId || !nQ) {
      return res.badRequest('You should specify all the data for the questions (roundID and nrQuestions).');
    }

    var QS = new sails.services.questionservice();
    QS.setStartRound(req.user.id, res, (err) => {
        if(err)
          res.serverError("Something very bad happened on the server (Error while entering in round).");

        // round started, load questions, prepare player
        var DB = new sails.services.databaseservice();
        var plsql = sails.config.queries.questions_loader;

        var bindvars = [roundId, nQ];

        // search for a player
        sails.models.player.findOne({
          playerID: req.user.id
        }).exec(function(err, player) {

          if (err)
            return res.serverError("Something bad is happening on server (error while finding player for round).");

          if (!player)
            return res.notFound('Could not find this Player, sorry.');

          if (player.lastRoundID < roundId)
            return res.forbidden("Cannot access a round higher than your current round.");

          // fetch the questions
          DB.procedureFetch(plsql, bindvars, function(err, rows) {

            if (err)
              return res.notFound('Seems like that round cannot be found.');
            
            sails.log.debug("I'm inside the question render.");
            sails.log.debug(rows);
            var newvec = [];
            var q = 0;
            var roundTime = 300;
            // call the correctAnswer remover
            return bindRound(res, newvec, q, rows, roundTime);
          });
        });
    });


  },



  /**
   * [Accepts or denies the player's answer]
   */
  submmitRoundAnswers: function(req, res) {

    if (!req.body)
      return res.badRequest("Cannot submit an empty answer.");

    sails.log.debug('Retriving answes from player: ' + req.user.id);
    var answers = req.body;
    var response = {};
    var correctAnswers = 0;

    var indexes = [];
    for (var x in answers) {
      indexes.push(x);
    }
    var QS = new sails.services.questionservice();
    sails.log.debug("starting ceck for user answers");

    // run the service which checks for the answers (handles the answering to the server too - BAD)
    QS.ceckForAnswers(req, res, QS, 0, indexes, answers, {}, correctAnswers);
  }

};
