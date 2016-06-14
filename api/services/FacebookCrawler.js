var request = require('request');
var swig = require('swig');



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

      if(obj.paging && obj.paging.next) {

          var newObj = object.concat(obj.data);
          return ref.doRequest(ref, newObj, obj.paging.next, next);
      } else {
          sails.log.debug("Finished");
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
  this.getUserFriends = function (req, accessToken, next) {

    var _url = "https://graph.facebook.com/v2.6/me/friends?access_token=" + accessToken;

    var finalObject = [];
    this.doRequest(this, finalObject, _url, function (ref, err, result) {
          ref.addToFriends(req, ref, 0, result, [], next);
    });
  };


  /**
   * Adds the specified list of facebook Ids to current user friends list.
   * @method function
   */
  this.addToFriends = function(req, ref, index, allList, finalList, next){

      if (index >= allList.length){
          sails.log.debug("FINISHED");
          return next(null, finalList);
      }

      var usr = allList[index];
      User.findOne()
          .where({facebookId: usr.id})
          .exec( (err, _usr) => {

              if(err || !_usr){
                  sails.log.debug(err);
                  return next(null, finalList);
              }

              sails.controllers.friend.createHandler(req.user.id, _usr.id, function(err){

                    if(err){
                        sails.log.debug(err);
                        return next(null, finalList);
                    }

                    sails.log.debug("Going forward.");
                    finalList.push(_usr);
                    return ref.addToFriends(req, ref, index + 1, allList, finalList, next);
              });
          });
  };

};
