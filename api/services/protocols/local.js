/**
 * local.js
 *
 * @description :: This is the local auth protocol based on username and password. Provides methods for creating, updating, verifying etc of users. Used in Passport service.
 * @docs        :: http://passportjs.org/guide/username-password/
 */

/**
* Create an user
*
* @description :: The function for user creation. Simply calls the blueprint for create, with the user data. The data will be validated according to the model, and be saved to the db if ok.
*/
let createUser = (_user, next) => {
    return sails.models.users.create(_user, (err, user) => {
        if(err){
            return next(err);
        }
        return next(null, user);
    });
};

/**
* Update an user
*
* @description :: The function for user updating. Simply calls the blueprint for update, with the user data. The data will be validated according to the model, and be saved to the db if ok.
*/
let updateUser = (_user, next) => {
    return sails.models.users.update({id: _user.id}, _user, (err, user) => {
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
let deleteUser = (_user, next) => {
    return sails.models.users.destroy({id: _user.id}, (err) => {
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

    sails.models.users.findOne({username: username}, (err, user) => {
        //an error happened
        if(err){
            return next(err);
        }

        //no user with that username, so return false
        if(!user){
            return next(null, false, {text: "Invalid user.", status: 0});
        }

        //validate the password
        user.validatePassword(password, (err, res) => {

            if(err){
                return next(err);
            }
            //answer: error, user, message
            if(res === false){
                return next(null, false, {text: "Invalid password.", status: 0});
            }
            return next(null, user, {text: "Success.", status: 1});
        });

    });
};

export {createUser, updateUser, deleteUser, login};
