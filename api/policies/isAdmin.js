/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to check if user  is admin
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  //if not authemticated, die
  if (req.session.authenticated === false || !req.user)
    return res.forbidden();

  //
  User.findOne()
    .where({
      id: req.user.id
    }).exec(function(err, foundUser) {

      if (err)
        return res.serverError("Something very bad happened on the server (while searching user for authentication).");

      if (!foundUser)
        return res.badRequest("Cannot find a User for which trying to acces this route.");

      var flag = foundUser.isAdmin;
      if (flag) {
        return next();
      }

      // User is not allowed
      // (default res.forbidden() behavior can be overridden in `config/403.js`)
      return res.forbidden({
        message: 'Only admin can add courses'
      });
    });
};
