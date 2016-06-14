/**
 * Passport.js
 *
 * @description :: Policy for sails authentication, based on passport.js. Basically, initialize passport and it's built in session support.
 *
 * Will be used to route the AuthController in /config/policies.js
 *
 * In a typical web application, the credentials used to authenticate a user
 * will only be transmitted during the login request. If authentication
 * succeeds, a session will be established and maintained via a cookie set in
 * the user's browser.
 *
 * Each subsequent request will not contain credentials, but rather the unique
 * cookie that identifies the session. In order to support login sessions,
 * Passport will serialize and deserialize user instances to and from the
 * session.
 *
 * Obs: This one also makes the user info available at res.locals
 * @docs        :: http://passportjs.org/guide/configure/, https://github.com/langateam/sails-auth
 *
 * @param {Object}   req
* @param {Object}   res
* @param {Function} next
 */

import passport from 'passport';
import http from 'http';

//list of methods which are put by passport into req
let methods = ['login', 'logIn', 'logout', 'logOut', 'isAuthenticated', 'isUnauthenticated'];

module.exports = function(req, res, next){

    passport.initialize()(req, res, () => {
        passport.session()(req, res, () => {

            //assure that the passport methods are available for sockets communication too
            //by default they are only available for http requests
            //socket != http
            if(req.isSocket){
                _.each(methods, (method) => {
                    req[method] = http.IncomingMessage.prototype[method].bind(req);
                });
            }

            res.locals.user = req.user;//send the user data to be available at locals.user on the client

            next();//continue processing (middleware, etc)
        });
    });
};
