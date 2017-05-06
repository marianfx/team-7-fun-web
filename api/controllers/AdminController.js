var swig = require('swig');

module.exports = {

  renderCourse: function (req, res) {

    if (!req.user) {
      return res.redirect('/signin');
    }

    var rendered = swig.renderFile('./views/admin/newCourse.swig');
    return res.ok(rendered);
  },

  renderRound: function (req, res) {

    if (!req.user) {
      return res.redirect('/signin');
    }


    Course.find().exec(function (err, rows) {
      if (err) {
        return res.serverError("Something bad happend on server wile retriving all courses from DB");
      }
      var rendered = swig.renderFile('./views/admin/newRound.swig', {
        courses: rows
      });
      return res.ok(rendered);

    });


  },

  renderQuestion: function (req, res) {
    
    if (!req.user) {
      return res.redirect('/signin');
    }

    Round.find().exec(function (err, rows) {
      if (err) {
        return res.serverError("Something bad happend on server wile retriving all courses from DB");
      }
      var rendered = swig.renderFile('./views/admin/newQuestion.swig', {
        rounds: rows
      });
      return res.ok(rendered);

    });


  },

  createCourse: function (req, res) {


    var DB = new sails.services.databaseservice();
    var query = sails.config.queries.insert_course;
    var bindParams = Object.keys(req.body).map(key => req.body[key]);

    DB.procedureSimple(query, bindParams, function (err) {
      if (err) {
        sails.log.debug(err);
        sails.log.debug('Error on creating Course in AdminController.');
        return res.badRequest();
      }

      return res.ok();
    });

  },

  createRound: function (req, res) {

    //return sails.models.round.create(req.body,
    var DB = new sails.services.databaseservice();
    var query = sails.config.queries.insert_round;
    var bindParams = Object.keys(req.body).map(key => req.body[key]);

    DB.procedureSimple(query, bindParams, function (err) {
      if (err) {

        sails.log.debug(err);
        sails.log.debug('Error on creating Round in AdminController.');
        return res.badRequest();
      }

      return res.ok();
    });

  },

  createQuestion: function (req, res) {


    var DB = new sails.services.databaseservice();
    var query = sails.config.queries.insert_question;
    var bindParams = Object.keys(req.body).map(key => req.body[key]);

    DB.procedureSimple(query, bindParams, function (err) {
      if (err) {

        sails.log.debug(err);

        sails.log.debug('Error on creating Round in AdminController.');
        return res.badRequest();
      }

      return res.ok();
    });

  }
};
