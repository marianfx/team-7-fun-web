
/**
*   @description:: Builds the callback url with the access token from the memory (if none exists, none will there be and no login)
*/
export default {

  buildCallbackNextUrl: function (req) {
    var url = req.query.next;
    var includeToken = req.query.includeToken;
    var accessToken = _.get(req, 'session.tokens.accessToken');

    if (includeToken && accessToken) {
      return url + '?access_token=' + accessToken;
    }
    else {
      return url;
    }
  }

};
