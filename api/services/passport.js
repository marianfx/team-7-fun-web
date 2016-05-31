/**
 * Paaport.js - the service
 *
 * @description :: This service configures passport for use inside the application. Sets it's user serialization, the endpoints + callbacks and the auth.
 * @docs        :: http://passportjs.org/guide/username-password/
 */

 import passport from 'passport';
 import path from 'path';
 import url from 'url';

passport.strategiesLoaded = false;

passport.protocols = require('./protocols');//import the array of protocols defined in protocols

/**
* @description Given a profile (obtained from Oauth2 provider), parse info from it into the user.
* @param profile is object, usually having fields like: id, username, displayName, gender, emails, photos etc.
*/
let createUserFromProfileData = function(profile, tokens){

    var user = { };

    // If the profile object contains a list of emails, grab the first one and
    // add it to the user.
    if (profile.emails && profile.emails[0]) {

      user.email = profile.emails[0].value;

      // If the profile object contains a username, add it to the user.
      if (_.has(profile, 'username') && profile.username) {
        user.username = profile.username;
      }
      else{
          user.username = profile.id;//take the facebook id as username
      }

      // add other fileds from the profile

      // ## access token ##
      if (tokens) {
        user.facebookId = tokens.accessToken;
      }

      // ## photo URL ##
      let profilePicUrl = 'http://graph.facebook.com/v2.6/' + profile.id + '/picture?type=large';
      user.photoUrl = profilePicUrl;
    }

    return user;
};

/**
* @description If access tokens have changed, update the user in the Db Accordingly.
* @param user is the user to update
*/
let updateUserWithNewProfileData = function(req, queryHasTokens, user, c_user, next){

    // If the tokens have changed since the last session, update them
    if ( queryHasTokens &&
        (user.facebookId != c_user.facebookId)) {

      var query = {id: user.id};
      var toUpdate = {facebookId: c_user.facebookId};

      // Save any updates to the Passport before moving on
      return sails.models.user.update(query, toUpdate)
        .exec(function (err, updated) {
          sails.log.debug('Already existing user updated with success.');
          var _status = 1;
          if(err) _status = 0;

          return next(err, updated[0], {status: _status});
        });
    }

    // if nothing changed, just send the same response
    return next(null, req.user, {status: 1});
};


/**
 * Connect a third-party profile to a local user
 *
 * This is where most of the magic happens when a user is authenticating with a
 * third-party provider. What it does, is the following:
 *
 *   1. Given a provider and an identifier, find a mathcing Passport.
 *   2. From here, the logic branches into two paths.
 *
 *     - A user is not currently logged in:
 *       1. If a Passport wassn't found, create a new user as well as a new
 *          Passport that will be assigned to the user.
 *       2. If a Passport was found, get the user associated with the passport.
 *
 *     - A user is currently logged in:
 *       1. If a Passport wasn't found, create a new Passport and associate it
 *          with the already logged in user (ie. "Connect")
 *       2. If a Passport was found, nothing needs to happen.
 *
 * As you can see, this function handles both "authentication" and "authori-
 * zation" at the same time. This is due to the fact that we pass in
 * `passReqToCallback: true` when loading the strategies, allowing us to look
 * for an existing session in the request and taking action based on that.
 *
 * For more information on auth(entication|rization) in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 * http://passportjs.org/guide/authorize/
 *
 * @param {Object}   req
 * @param {Object}   query
 * @param {Object}   profile
 * @param {Function} next
 */
passport.connect = function (req, query, profile, next) {

  var queryHasTokens = _.has(query, 'tokens');
  req.session.tokens = query.tokens;

  // Get the authentication provider from the query.
  query.provider = req.param('provider');

  // Use profile.provider or fallback to the query.provider if it is undefined
  // as is the case for OpenID, for example
  var provider = profile.provider || query.provider;

  // If the provider cannot be identified we cannot match it to a passport so
  // throw an error and let whoever's next in line take care of it.
  if (!provider){
    return next(new Error('No authentication provider was identified.'), false, {status: 0});
  }

  // sails.log.debug('Profile received from service: ', profile);
  var user = createUserFromProfileData(profile, query.tokens);
  // sails.log.debug('User created from service data: ', user);

  // If an email wasnt available in the profile, we don't
  // have a way of identifying the user in the future. Throw an error and let
  // whoever's next in the line take care of it.
  if (!user.email) {
    return next(new Error('Cannot identify email. Cannot create account.'), false, { status: 0});
  }

  // unique search after email
  sails.models.user.findOne({
      email: user.email
    })
    .exec(function (errr, _user) {

      if(errr)
        return next(err, null, {status: 0});

      // not logged in, creating an account
      if (!req.user) {

        // Scenario: A new user is attempting to sign up using a third-party
        //           authentication provider.
        // Action:   Create a new user and assign them an facebookId.
        if (!_user) {

          return sails.services.passport.protocols.local.createUser(user, (err, c_user) => {

                if(err){
                    sails.log.debug('Error on creating user: ', err);
                    return next(err, false, {status: 0});
                }

                sails.log.debug('Success creating user: ', c_user);
                next(null, c_user, {status: 1});
            },
                true);//this means generate password

        }
        // Scenario: An existing user is trying to log in.
        // Action:   Get the user associated with the passport.
        else {
            return updateUserWithNewProfileData(req, queryHasTokens, _user, user, next);
        }
      }
      else {

        // Scenario: A user is currently logged in and trying to connect a new
        //           passport.
        // Action:   Create and assign a new passport to the user.
        if (_user) {
            return updateUserWithNewProfileData(req, queryHasTokens, _user, user, next);
        }
        // Scenario: The user is a nutjob or spammed the back-button.
        // Action:   Simply pass along the already established session.
        else {

          sails.log.debug('Logged in user is spamming or doing something wrong.');
          return next(null, req.user, {status: 1});
        }
      }
    });
};


/**
 * Disconnect user from facebook (remove facebookId?)
 *
 * @param  {Object} req
 * @param  {Object} res
 */
passport.disconnect = function (req, res, next) {

  var user = req.user;
  var provider = req.param('provider');

  return sails.models.user.findOne({
      email: user.email
    })
    .then(function (_user) {

        _user.facebookId = '';
        _user.save();
        return next(null, user);
    })
    .catch(next);
};


/**
 * This is the endpoint which handles the authentication using passport's authenticate()
 * GET /auth/:provider (provider can be 'local'), through the controller, of course
 *
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 *
 * @param  {Object} req
 * @param  {Object} res
 */
 passport.endpoint = function(req, res){

     let strategies = sails.config.passport;        //get the strategies from the passport config
     let provider   = req.params.provider;          //see routes for how this is being called (with a provider, doh)

     let options = {};

     //check if the provider is found in the strategies list (otherwise, no login possible, mate)
     if(!_.has(strategies, provider)){
         return res.redirect('/signin');
     }

        // Attach scope if it has been set in the config
      if (_.has(strategies[provider], 'scope')) {
        options.scope = strategies[provider].scope;
      }

    // Redirect the user to the provider for authentication. When complete,
    // the provider will redirect the user back to the application at
    //     /auth/:provider/callback
    this.authenticate(provider, options)(req, res, req.next);
 };

 /**
 * This is the callback from the provider - we do the login through the provider, then check here the result
 * GET /auth/:provider/callback or GET /auth/:provider/:action (provider can be 'local'), through the controller, of course
 *
 * For more information on authentication in Passport.js, check out:
 * http://passportjs.org/guide/authenticate/
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
 passport.callback = function(req, res, next){

     let provider   = req.param('provider', 'local');
     let action     = req.param('action');

     //check if provider is local, and call the specific actions
     if(provider === 'local' && action !== undefined){

         if(action === 'register' && !req.user){//if he tries to register, he must not be logged in
             this.protocols.local.register(req, res, next);
         }//could provide in the future connect/disconnect with social services
         else{
             res.forbidden();
         }
     }
     else {
        // The provider will redirect the user to this URL after approval. Finish
        // the authentication process by attempting to obtain an access token. If
        // access was granted, the user will be logged in. Otherwise, authentication
        // has failed.
        this.authenticate(provider, next)(req, res, req.next);
     }
 };

 /**
  * Load all strategies defined in the Passport configuration (/config/passport.js)
  * This is the actual part where the actual passport is being configured with the strategies.
  *
  * For more information on the providers supported by Passport.js, check out:
  * http://passportjs.org/guide/providers/
  *
  */

 passport.loadStrategies = function () {
      let strategies = sails.config.passport;       //load the strategies from /config/passport.js

      //go through all the strategies (key: {content}), see passport config
      _.each(strategies, (strategy, key) => {

          let options = { passReqToCallback: true };//this says don't pass the req object to the callback
          var Strategy;

          //if local strategy is loaded
          if(key == 'local'){
              //this is how the fiend from the request containing the username will be called ('identifier')
            // _.extend(options, { usernameField: 'identifier' });

            //Here the configuration
            //If there exist a local object defined, load the strategy from inside it
            //Also tell passport to use this new strategy, with the specified options
            //AND - the most IMPORTANT - to use as auth function the login defined in local
            if(strategies.local){
                Strategy = strategies.local.strategy;
                passport.use(new Strategy(options, this.protocols.local.login));
            }
          }
          else{

              let protocol = strategies[key].protocol;              //get the specified protocol

              let callback = path.join('auth', key, 'callback');    //build the callback (eg auth/facebook/callback)
              Strategy = strategies[key].strategy;

              // try to get the application base URL (where does it run??)
              var appURL = sails.config.globals.serverURL;

              //configure the protocol based on the auth type (eg. facebook uses auth2, others use openid)
              switch(protocol){
                  case 'oauth':
                  case 'oauth2':
                    options.callbackURL = url.resolve(appURL, callback);
                    break;

                  case 'openid':
                    options.returnURL   = url.resolve(appURL, callback);
                    options.realm       = appURL;
                    options.profile     = true;
                    break;
              }

              // add any other missing options which is weitten in the config of the specified protocol
              _.extend(options, strategies[key].options);

              //finally, configure passport to use this strategy too
              //remember, we load the protocols list; when not local, the protocols have a 'whole' module as export which will be used (check for example /protocols/oauth2)
              passport.use(new Strategy(options, this.protocols[protocol]));
          }
      }, this);
  };


  // Passport session setup.
  // To support persistent login sessions, Passport needs to be able to
  // serialize users into and deserialize users out of the session. Typically,
  // this will be as simple as storing the user ID when serializing, and finding
  // the user by ID when deserializing.
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });


  passport.deserializeUser(function (id, done) {
    sails.models.user.findOne(id, function (err, user) {
      done(err, user);
    });
  });

  // the logout service
  passport.dosomelogout = function(req, res) {
      req.logout();//logout from passport

      //also delete from session
      delete req.user;
      delete req.session.passport;
      req.session.authenticated = false;
  };

  //YUP, this module exports passport, CONFIGURED
  module.exports = passport;
