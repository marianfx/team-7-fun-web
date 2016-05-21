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
 import _ from 'lodash';
 import bcrypt from 'bcrypt';

export default function (req, accessToken, refreshToken, profile, next) {

  var query = {
    identifier: profile.id,
    protocol: 'oauth2',
    tokens: { accessToken: accessToken }
  };

  if (!_.isUndefined(refreshToken)) {
    query.tokens.refreshToken = refreshToken;
  }

  //save the tokens reveived (cause any login pushes a token) into the session
  req.session.tokens = query.tokens;

  //let the service handle the connection with the provider
  //so we build here the user based on the response from the provider
  let user = {};
  query.provider = req.param('provider');   //get the privider from which this one came (eg facebook)
  let provider = profile.provider || query.provider;
  if(!provider){
      return next(new Error('The provider cannot be identified so cannot login.'));
  }

  // get the email of the user
  //the e-mail is how we link a local user (in our database) with an facebook/twitter user
  if(profile.emails && profile.emails[0]){
      user.email = profile.emails[0].value;
  }
  if(!user.email){
      return next(new Error('Email cannot be retrieved so cannot link to a local user.'));
  }

  if(!req.user){//if this user is not logged in

      sails.models.user.findOne({email: user.email})
        .exec((err, _user) => {
            if(err){
                return next(err);
            }

            if(!_user){//the user does not exist, create a random password and save it to the db
              bcrypt.genSalt(10, (err, salt) => {
                  if(err){
                      return next(err);
                  }

                  user.username     = profile.id;           //assing an unique id
                  user.facebookId   = profile.id;   //also save the provider id
                  user.password     = salt;
                  sails.models.user.create(user)
                      .exec((err, _user) => {
                          return next(err, _user);
                      });
              });
            }
            else{//in this case, user already has an account, so just link it (aka update)
                sails.models.user.update({id: user.id}, {facebookId: profile.id})
                    .exec((err, _user) => {
                        next(err, user);
                    });
            }
      });
  }
  else{//user already logged in, so just pass in the already logged in user
      next(null, req.user);
  }

}
