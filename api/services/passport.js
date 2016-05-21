/**
 * Paaport.js - the service
 *
 * @description :: This service configures passport for use inside the application. Sets it's user serialization, the endpoints + callbacks and the auth.
 * @docs        :: http://passportjs.org/guide/username-password/
 */

 import passport from 'passport';
 import path from 'path';
 import url from 'url';
 import _ from 'lodash';//useful for collection handling

passport.strategiesLoaded = false;

passport.protocols = require('./protocols');//import the array of protocols defined in protocols

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

      return res.redirect('/');//redirect to main page
  };

  //YUP, this module exports passport, CONFIGURED
  module.exports = passport;
