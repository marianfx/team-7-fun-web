/**
 * AuthController.js
 *
 * @description :: This is the Auth controller - which provides ACTIONS (see documentation or readme) for login actions, based on passport js
 * @docs        :: http://sailsjs.org/documentation/concepts/controllers- here, concepts about controllers
 */

//##################################
//#### SETTINGS
//##################################
//The Blueprints (see blueprints in readme) specify which default actions this controller will support
let blueprints = {
    //Specify if theere will be exposed actions (user-defined functions)
    actions: true,
    //Specify if there will be the default RESTful API exposed (can do POST /auth => create object etc)
    rest: false,
    //Specify if there will be created shortcuts for the CRUD operations (by default, the RESTfull api can be created, but no shortcuts exposed (eg there will not be an /auth/create for this if this is not set to true, I would have to do POST /auth))
    shortcuts: false
};

/**
 * Log out a user.
 *
 * Passport exposes a logout() function on req (also aliased as logOut()) that
 * can be called from any route handler which needs to terminate a login
 * session. Invoking logout() will remove the req.user property and clear the
 * login session (if any).
 *
 * For more information on logging out users in Passport.js, check out:
 * http://passportjs.org/guide/logout/
 *
 * @param {Object} req
 * @param {Object} res
 */
let logout = function(req, res) {
    sails.services.passport.dosomelogout(req, res);
};


/**
 * Create a third-party authentication endpoint (accessing AuthController.provider will invoke eg facebook auth)
 *
 * @param {Object} req
 * @param {Object} res
 */
 let provider = function(req, res) {
     sails.services.passport.endpoint(req, res);
 };


 /**
 *
 * This function checks out the error which occurred and redirects to the specific endpoint.
 * Eg if I came from register, redirect back there, etc.
 * This is the endpoint with the client, all errors are sent through here
 *
 */
 let negotiateError = function(action, res, err, message){

   if (action === 'register') {
     res.redirect('/register');
   }
   else if (action === 'signin') {
     res.redirect('/signin');
   }
   else {
     // make sure the server always returns a response to the client
     // i.e passport-local bad username/email or password
     res.ok(message);
   }
 };


/**
* Create a authentication callback endpoint
*
* This endpoint handles everything related to creating and verifying Pass-
* ports and users, both locally and from third-aprty providers.
*
* Passport exposes a login() function on req (also aliased as logIn()) that
* can be used to establish a login session. When the login operation
* completes, user will be assigned to req.user.
*
* For more information on logging in users in Passport.js, check out:
* http://passportjs.org/guide/login/
*
* @param {Object} req
* @param {Object} res
*/
let callback = function(req, res) {

    let action = req.param('action');

    //check for strategies load
    if(sails.services.passport.strategiesLoaded === false){
        sails.services.passport.loadStrategies();
        sails.services.passport.strategiesLoaded = true;
    }

    //calls the passport authenticator, and then handles the next()
    sails.services.passport.callback(req, res, (err, user, message) => {

      if (err || !user) {
        return negotiateError(action, res, err, message);
      }

      req.login(user, (err) => {
        if (err) {
          return negotiateError(action, res, err);
        }

        req.session.authenticated = true;
        req.user = user;

        // Upon successful login, optionally redirect the user if there is a
        // `next` query param
        if (req.query.next) {
          var url = sails.services.authservice.buildCallbackNextUrl(req);
          res.status(302).set('Location', url);
        }

        return res.json(message);
      });
    });
};

export {blueprints, logout, provider, callback};
