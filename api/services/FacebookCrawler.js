
var request = require('request');
var swig = require('swig');

var _theuser;

/**
 * [The Facebook Crawler Object]
 * @method function
 * @return {[type]} [Class]
 */
module.exports = function () {


  /**
   * @description Recursively queries the facebook graph for getting all the required data (likes, friends etc)
   * @method function
   * @param  {[Vector]} object [the final returned object]
   * @param  {[String]} The facebook Graph URL to call  [description]
   */
  this.doRequest = function (ref, object, urele, next) {

    request({
      uri: urele,
      method: "GET",
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10
    }, function (error, response, body) {

      if(error) {
        sails.log.debug("Error occured.");
        return next(ref, error, null);
      }

      var obj = JSON.parse(body);
      // sails.log.debug(obj);

      if(obj.paging && obj.paging.next) {

          var newObj = object.concat(obj.data);
          return ref.doRequest(ref, newObj, obj.paging.next, next);
      } else {
          sails.log.debug("Finished");
          if(object.length === 0 && obj.data.length !== 0)
            object = obj.data;
          return next(ref, null, object);
      }
    });
  };


  /**
   * [The functions returns the user friends]
   * @method function
   * @param  {[type]} accessToken [The facebook Access Token]
   * @return {[type]}             [description]
   */
  this.getUserFriends = function (c_user, accessToken, next) {

    var _url = "https://graph.facebook.com/v2.6/me/friends?access_token=" + accessToken;
    sails.log.debug(c_user);
    _theuser = c_user;

    var finalObject = [];
    this.doRequest(this, finalObject, _url, function (ref, err, result) {
          sails.log.debug('Friends here');
          sails.log.debug(result);
          ref.addToFriends(ref, 0, result, [], next);
    });
  };


  /**
   * Adds the specified list of facebook Ids to current user friends list.
   * @method function
   */
  this.addToFriends = function(ref, index, allList, finalList, next){

      if (index >= allList.length){
          sails.log.debug("FINISHED");
          return next(null, finalList);
      }
      sails.log.debug("AddToFriends");
      var usr = allList[index];
      sails.log.debug(index);
      sails.log.debug(usr);
      sails.models.user.findOne()
          .where({FACEBOOKID: usr.id})
          .then( (_usr) => {

              // no user found, so continue
              if(!_usr)
                return ref.addToFriends(ref, index + 1, allList, finalList, next);

              sails.log.debug("Userfind");
              sails.log.debug("Found user");
              sails.log.debug(_usr);
              sails.log.debug("Me user");
              sails.log.debug(_theuser);
              sails.controllers.friend.createHandler(_theuser.id, _usr.id, function(err){
                    if(err){
                        sails.log.debug(err);
                        return next(null, finalList);
                    }

                    sails.log.debug("Going forward.");
                    finalList.push(_usr);
                    return ref.addToFriends(ref, index + 1, allList, finalList, next);
              });
          })
          .catch( (_err) => {
                sails.log.debug(_err);
                return ref.addToFriends(ref, index + 1, allList, finalList, next);
          });
  };

};
