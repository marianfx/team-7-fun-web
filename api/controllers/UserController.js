
/**
 * UserController
 *
 * @description :: Server-side logic for managing users. It's by default, so it exposes the REST API with CRUD access on the /site/user object
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  /**
   * [The overriden create method for users, auto-tries logout and then calls the wrapped up user creation]
   */
  create: function(req, res, next) {

    //logout possible user
    try {
      sails.services.passport.dosomelogout(req, res);
    } catch (e) {
      sails.log.debug('User is creating account, was not logged in.');
    }

    // create the user
    sails.services.passport.protocols.local.createUser(req.body, function(err, user) {
      if (err || !user){
        sails.log.debug(err);
        sails.log.debug(user);
        sails.log.debug('Error on creating account in User Controller.');
        return res.send(400, err.toJSON());
      }

      return res.ok(user);
    });
  },


  /**
   * [Wrapper for user update]
   */
  update: function (req, res, next) {

    var query;
    if (req.params.id)
      query = req.params.id;
    else
      query = req.body.id;

    sails.services.passport.protocols.local.updateUser(query, req.body, function(err, user) {
      if (err) return res.serverError("Something bad happend on server");

      req.user = user;
      res.ok(user);

    });
  },


  /**
   * [Wrapper for user destroy]
   * @method function
   */
  destroy: function(req, res, next) {

    var query;
    if (req.params.id)
      query = req.params.id;
    else
      query = req.body;


    sails.services.passport.protocols.local.deleteUser(query, function(err) {
      if (err) return res.serverError("An error occured  while deleting user");

      // here we also logout the user
      sails.services.passport.dosomelogout(req, res);
    });
  },


  /**
   * [Wrapper for connected user data return]
   */
  me: function(req, res) {

    if (req.user)
      return res.ok(req.user);

    return res.forbidden();
  },


};
