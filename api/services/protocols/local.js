var VError = require('../../util/VError.js');

/**
 * local.js
 *
 * @description :: This is the local auth protocol based on username and password. Provides methods for creating, updating, verifying etc of users. Used in Passport service.
 * @docs        :: http://passportjs.org/guide/username-password/
 */



 //use the bcrypt module for hashing passwords
 import bcrypt from 'bcrypt';

/**
* Create an user
*
* @description :: The function for user creation. Simply calls the blueprint for create, with the user data. The data will be validated according to the model, and be saved to the db if ok.
*/
let createUser = (_user, next, generatePass) => {

    // two cases - user logs in with facebook => need to generate a random password
    if(generatePass){
        // put a random password (cause it does not matter, this means logging from a service)
        bcrypt.genSalt(10, (err, salt) => {

            if(err){
                sails.log.debug('Error generating random salt.');
                return next(err);
              }

            _user.password = salt;

            return sails.models.user.create(_user, (err, user) => {
                if(err || !user){
                    var therrr = new VError({originalError: err});
                    // sails.log.debug(therrr);
                    return next(therrr);
                }
                return next(null, user);
            });

        });
    }
    else {

        return sails.models.user.create(_user, (err, user) => {
            if(err || !user){
                var therrr = new VError({originalError: err});
                // sails.log.debug(therrr);
                return next(therrr);
            }

            return next(null, user);
        });
    }

};

/**
* Update an user
*
* @description :: The function for user updating. Simply calls the blueprint for update, with the user data. The data will be validated according to the model, and be saved to the db if ok.
*/
let updateUser = (query, _user, next) => {
    return sails.models.user.update(query, _user, (err, user) => {
        if(err){
            return next(err);
        }

        user = user[0];//get the first element of the array
        return next(null, user);//return the user
    });
};

/**
* Update an user
*
* @description :: The function for user updating. Simply calls the blueprint for update, with the user data. The data will be validated according to the model, and be saved to the db if ok.
*/
let deleteUser = (query, next) => {
    return sails.models.user.destroy(query, (err) => {
        if(err){
            return next(err);
        }

        return next(null);//success on deleting
    });
};

/**
* Login the user
*
* @description :: This is the main thang of the local login process, which will be passed as the login function to the passport's local Strategy on configuration, in the passport service
*/
let login = (req, username, password, next) => {

    sails.models.user.findOne({username: username}, (err, user) => {
        //an error happened
        if(err){
            return next(err);
        }

        //no user with that username, so return false
        if(!user){
            return next(null, false, {message: "Invalid user.", status: 0});
        }

        //validate the password
        user.validatePassword(password, (err, res) => {

            if(err){
                return next(err);
            }

            //answer: error, user, message
            if(res === false){
                return next(null, false, {message: "Invalid password.", status: 0});
            }
            return next(null, user, {message: "Success.", status: 1});
        });

    });
};

export {createUser, updateUser, deleteUser, login};
