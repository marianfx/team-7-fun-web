/**
 * Passport.js
 *
 * @description :: This is the configurator for passport.js. It specifies the strategy and specific data (as scope) for each strategy.
 * Accessed with config.passport.config_name
 *
 * @docs        :: http://passportjs.org/guide/providers/
 *
 */

 module.exports.passport = {

    local: {
        strategy: require('passport-local').Strategy
    },

    facebook: {
        name: 'Facebook',
        protocol: 'oauth2',
        strategy: require('passport-facebook').Strategy,
        options: {
          clientID: '1706259366298551',
          clientSecret: '1c2bc70e95da4dab58a2adffeccf4958',
          profileFields: ['id', 'email', 'gender', 'displayName', 'photos'],
          scope: ['public_profile', 'email', 'user_photos', 'user_likes']
        }
    }

    /*
 google: {
   name: 'Google',
   protocol: 'oauth2',
   strategy: require('passport-google-oauth').OAuth2Strategy,
   options: {
     clientID: 'your-client-id',
     clientSecret: 'your-client-secret',
     scope: ['profile', 'email']
   }
 }

 twitter: {
   name: 'Twitter',
   protocol: 'oauth',
   strategy: require('passport-twitter').Strategy,
   options: {
     consumerKey: 'your-consumer-key',
     consumerSecret: 'your-consumer-secret'
   }
 },

 github: {
   name: 'GitHub',
   protocol: 'oauth2',
   strategy: require('passport-github').Strategy,
   options: {
     clientID: 'your-client-id',
     clientSecret: 'your-client-secret'
   }
 },

 facebook: {
   name: 'Facebook',
   protocol: 'oauth2',
   strategy: require('passport-facebook').Strategy,
   options: {
     clientID: 'your-client-id',
     clientSecret: 'your-client-secret'
   }
 }

 youtube: {
   name: 'Youtube',
   protocol: 'oauth2',
   strategy: require('passport-youtube').Strategy,
   options: {
     clientID: 'your-client-id',
     clientSecret: 'your-client-secret'
   },
 },

 'youtube-v3': {
   name: 'Youtube',
   protocol: 'oauth2',
   strategy: require('passport-youtube-v3').Strategy,
   options: {
     clientID: 'your-client-id',
     clientSecret: 'your-client-secret'
     // Scope: see https://developers.google.com/youtube/v3/guides/authentication
     scope: [ 'https://www.googleapis.com/auth/youtube.readonly' ],
   },
 },

 */
 };
