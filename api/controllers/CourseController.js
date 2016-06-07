


 var swig             = require('swig');
 var CourseLoader     = new sails.services.courseloader();

/**
 * Course controller
 *
 * @description :: Server-side logic for managing courses
 */

module.exports = {

    render: function(req, res){

        var me = req.user.id;

        CourseLoader.renderAll(me, (err, result) => {
            if(err)
              return res.serverError(sails.config.messages.server_error_DB_fault);

            return res.ok(result);
        });

    },

};
