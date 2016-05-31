/**
 * UserController
 *
 * @description :: Server-side logic for managing users. It's by default, so it exposes the REST API with CRUD access on the /site/user object
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// Here we override some of the basic CRUD operations, so they act as we want them to (eg. at destroy, do logout too)
let create = function(req, res, next) {

  //logout possible user
  try {
    sails.services.passport.dosomelogout(req, res);
  } catch (e) {
    sails.log.debug('User is creating account, was not logged in.');
  }

  // create the user
  sails.services.passport.protocols.local.createUser(req.body, function(err, user) {
    if (err || !user){
      sails.log.debug('Error on creating account in User Controller.');
      return res.send(400, err.toJSON());
    }

    return res.ok(user);
  });
};


let update = function(req, res, next) {

  var query;
  if (req.params.id)
    query = req.params.id;
  else
    query = req.body.id;

  sails.services.passport.protocols.local.updateUser(query, req.body, function(err, user) {
    if (err) return res.negotiate(err);

    req.user = user;
    res.ok(user);

  });
};

let destroy = function(req, res, next) {

  var query;
  if (req.params.id)
    query = req.params.id;
  else
    query = req.body;


  sails.services.passport.protocols.local.deleteUser(query, function(err) {
    if (err) return res.negotiate(err);

    // here we also logout the user
    sails.services.passport.dosomelogout(req, res);
  });
};

//the function with wich i will be able to get my data
let me = function(req, res) {

  if (req.user)
    return res.ok(req.user);

  return res.forbidden();
};


export {
  create,
  update,
  destroy,
  me
};
