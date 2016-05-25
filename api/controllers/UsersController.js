/**
 * UserController
 *
 * @description :: Server-side logic for managing users. It's by default, so it exposes the REST API with CRUD access on the /site/user object
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // Here we override some of the basic CRUD operations, so they act as we want them to (eg. at destroy, do logout too)
    create: function (req, res, next) {
        sails.services.passport.protocols.local.createUser(req.body, function (err, user) {
          if (err) return res.negotiate(err);

          res.ok(user);
        });
    },

    update: function (req, res, next) {
        var query;
        if(req.params.id)
            query = req.params.id;
        else
            query = req.body.id;

        sails.services.passport.protocols.local.updateUser(query, req.body, function (err, user) {
          if (err) return res.negotiate(err);

          req.user = user;
          res.ok(user);
        });
    },

    destroy: function (req, res, next) {
        var query;
        if(req.params.id)
            query = req.params.id;
        else
            query = req.body;

        sails.services.passport.protocols.local.deleteUser(query, function (err) {
          if (err) return res.negotiate(err);

          // here we also logout the user
          sails.services.passport.dosomelogout(req, res);
        });
    },

    //the function with wich i will be able to get my data
    me: function(req, res){

        if(req.user)
            return res.ok(req.user);

        return res.forbidden();
    },

    blueprints: {
        //Specify if theere will be exposed actions (user-defined functions)
        actions: true,
        //Specify if there will be the default RESTful API exposed (can do POST /auth => create object etc)
        rest: true,
        //Specify if there will be created shortcuts for the CRUD operations (by default, the RESTfull api can be created, but no shortcuts exposed (eg there will not be an /auth/create for this if this is not set to true, I would have to do POST /auth))
        shortcuts: false
    }
};
