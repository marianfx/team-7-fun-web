/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to check if user is trying to modify it's own profile
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

   //if not authemticated, die
   if(req.session.authenticated === false || !req.user) return res.forbidden();

  // Check if an username (to update / delete etc) is provided. Else, Forbidden.
  var _username = '';
  if( req.body.username)
    _username = req.body.username;
  else {

      var param = req.param('username');
      if(!param)
        return res.forbidden();
      _username = param;
  }

  if(_username == req.user.username)
        return next();

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden();
};
