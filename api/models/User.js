/**
 * User.js
 *
 * @description :: This is the user model. It has an username, a password and a few wrap-up functions, with saving of the hashed password in the DB (beforeCreate:).
 * Inside each attribute, different constraints can be specified (ex. required, unique, primaryKey etc). If those are not satisfied, the ORM will throw an error.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models - here, attribute types and examples can be found
 */

//use the bcrypt module for hashing passwords
import bcrypt from 'bcrypt';

//##################################
//#### SETTINGS
//################################## http://sailsjs.org/documentation/concepts/models-and-orm/model-settings

module.exports = {
//$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$ if one uncomments a line below, one should add that parameter name to the 'export' json at the end
//$$$$$$$$$$$$$$$$$$$$$$$$$$

//sails autogenerates the autocreated/updated at fields. uncomment to disable
    autoCreatedAt: false,
    autoUpdatedAt: false,

//sails also generates the id field automatically (autoincrementing)
//otherwise, if set to false, a column with the PK shall be specified
    autoPK: false,


//for the object, there can be specified a connection (configured in /config/connections.js)
//let connection = 'name-from-/connections.js';

//for the object, there can be specified a table name from the db (can be also used with pre-existing tables)
    tableName: 'GAMEUSERS',


//jsonify this object - (when will return it to the user)
//we remove the password, cause we don't want the client to access it
//(so we give it to the attributes list)


//will represent the attributes of this object
//username, email and password are required
attributes: {
      id: {
          type: 'integer',
          unique: true,
          columnName: 'PLAYERID'
      },
      username: {
          type: 'string',
          required: true,
          unique: true,
          columnName: 'USERNAME'
      },
      email : {
          type: 'string',
          required: true,
          unique: true,
          columnName: 'EMAIL'
      },
      password: {
          type: 'string',
          required: true,
          columnName: 'PASSWORD'
      },
      facebookId: {
          type: 'string',
          columnName: 'FACEBOOKID'
      },
      accessToken: {
          type: 'string',
          columnName: 'ACCESSTOKEN'
      },
      registrationDate: {
          type: 'date',
          columnName: 'REGISTRATIONDATE'
      },
      toJSON: function() {
          let obj = this.toObject();
          delete obj.password;
          delete obj.accessToken;
          return obj;
      },
      validatePassword: function(password, next){
          let obj = this.toObject();
          bcrypt.compare(password, obj.password, next);

      }
},


//about before's - http://sailsjs.org/documentation/concepts/models-and-orm/lifecycle-callbacks

//override the beforeCreate to hash the password before entering it to the DB
beforeCreate: function(user, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err){
                callback(err); //tell the next function we had errors
            }
            user.password = hash;//replace the password with the hashed password
            callback(null, user);//callback witn no error and the user object (callback is usually from the res object, with takes at most 2 objects - error, object, true/false sometimes)
        });
    });
},

//override the beforeUpdate to hash the password before updating it into the database
beforeUpdate: function(user, callback) {
    if(user.password){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {

                if(err){
                    console.log(err);
                    callback(err); //tell the next function we had errors
                    return;
                }
                user.password = hash;//replace the password with the hashed password
                callback(null, user);//callback witn no error and the user object (callback is usually from the res object, with takes at most 2 objects - error, object, true/false sometimes)
            });
        });
    }
    else {
        callback(null, user);
    }
},

//this module will export ('expose') his attributes, the toJson function and will overrite the beforeCreate
//Obs: Overriting is by default, based on name
};
