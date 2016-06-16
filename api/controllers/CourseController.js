


 var swig             = require('swig');
 var CourseLoader     = new sails.services.courseloader();

/**
 * Course controller - handles course rendering mostly
 *
 * @description :: Server-side logic for managing courses
 */
module.exports = {

    /**
     * Renders all the courses to the server, with the given templates (users the CourseLoader)
     */
    render: function(req, res){

        var me = req.user.id;
        CourseLoader.renderAll(me, (err, result) => {
            if(err)
              return res.serverError(sails.config.messages.server_error_DB_fault);
            return res.ok(result);
        });

    },


    /**
     * [function gets course for requested ROUNDID]
     * @param  {[request]} req [containt roundID]
     * @param  {[response]} res [return rendered modalCourse]
     * @return {[type]}     [description]
     */
     renderModalCourse: function(req, res){

        var DB = new sails.services.databaseservice();
        var query = sails.config.queries.get_round_course;
        var binds = {
          roundid: req.param('roundID')
        };

        DB.executeQuery(query,binds,(err,result)=>{
          if(err)
            return res.serverError("cannot find Course for that round");

          var course = result[0].COURSE;
          var swig = require('swig');
          var rendered = swig.renderFile('views/game/modalCourse.swig',{
            content: course
          });
          return res.ok(rendered);
        });
   }

};
