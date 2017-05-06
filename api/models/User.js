//use the bcrypt module for hashing passwords
import Bcrypt from 'bcrypt';

module.exports = {
    tableName: 'GAMEUSERS',
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false,
    
attributes: {
      id: {
          primaryKey: true,
          autoIncrement: true,
          type: 'integer',
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
      isAdmin:{
        type:'integer',
        columnName:'ISADMIN'
      }, 
      toJSON: function() {
          let obj = this.toObject();
          delete obj.password;
          delete obj.accessToken;
          return obj;
      },
      validatePassword: function(password, next){
          let obj = this.toObject();
          Bcrypt.compare(password, obj.password, next);

      }
},


//about before's - http://sailsjs.org/documentation/concepts/models-and-orm/lifecycle-callbacks

//override the beforeCreate to hash the password before entering it to the DB
beforeCreate: function(user, callback) {
    Bcrypt.genSalt(10, (err, salt) => {
        Bcrypt.hash(user.password, salt, (err, hash) => {
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
        Bcrypt.genSalt(10, (err, salt) => {
            Bcrypt.hash(user.password, salt, (err, hash) => {

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
}
};
