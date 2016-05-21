/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to check if user is trying to modify it's own profile
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy if he is authenticated, he has data about himself and it's the same as the data he is tryin to modify
  var _username = req.body.username;
  var _id = req.param('id');

  if (req.session.authenticated && (_username || _id)) {

      if(_id !== undefined && _id !== null){
          if(_id == req.user.id)
            return next();
      }
      else if(_username !== undefined && _username !== null){
          if(_username == req.user.username)
            return next();
    }
  }

  //on account delete must implement logout too

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden();
};
