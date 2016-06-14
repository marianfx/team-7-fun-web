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
    if(req.session.authenticated === false || !req.user)
        return res.forbidden();

    // Check if an username / id (to update / delete etc) is provided. Else, Forbidden.
    if( req.body.id && req.body.id == req.user.id){
        return next();
    }
    if(req.params.id && req.params.id == req.user.id ){
        return next();
    }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden({message: 'Only available to do this on yourself, don\'t destroy other\'s profiles.'});
};
