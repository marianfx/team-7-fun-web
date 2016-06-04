/**
 * OAuth 2.0 Authentication Protocol
 *
 * OAuth 2.0 is the successor to OAuth 1.0, and is designed to overcome
 * perceived shortcomings in the earlier version. The authentication flow is
 * essentially the same. The user is first redirected to the service provider
 * to authorize access. After authorization has been granted, the user is
 * redirected back to the application with a code that can be exchanged for an
 * access token. The application requesting access, known as a client, is iden-
 * tified by an ID and secret.
 *
 * For more information on OAuth in Passport.js, check out:
 * http://passportjs.org/guide/oauth/
 *
 * @param {Object}   req
 * @param {string}   accessToken
 * @param {string}   refreshToken
 * @param {Object}   profile
 * @param {Function} next
 */
 import bcrypt from 'bcrypt';




module.exports =  function (req, accessToken, refreshToken, profile, next) {


  var query = {
    protocol: 'oauth2',
    tokens: { accessToken: accessToken, refreshToken: refreshToken}
  };

  // Save the user friends into the database
  var FB = require('./../facebookCrawler');
  var fb = new FB();
  fb.getUserFriends(req, accessToken, function(err, result){
        sails.log.debug(result);
  });

  sails.services.passport.connect(req, query, profile, next);

};
