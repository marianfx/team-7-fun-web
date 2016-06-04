

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

      if (err)
        return res.serverError('Something really bad happened here :(.');
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
      res.render('game/rounds', {
        questions: rows
      });
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
      }).exec( function(err, player) {

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

    submmitRoundAnswers: function(req, res)
      {
        if (!req.body)
          return res.forbiden("Cannot submmite a whole answe");

          sails.log.debug(req.body);
          return res.json("YAY merge!");
      }
};
