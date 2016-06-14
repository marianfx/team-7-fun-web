/**
 *   @description:: Builds the callback url with the access token from the memory (if none exists, none will there be and no login)
 */
module.exports = {

	buildCallbackNextUrl: function(req) {
		var url = '/game';
		var includeToken = req.query.includeToken;
		var accessToken = _.get(req, 'session.tokens.accessToken');

		if (includeToken && accessToken) {
			sails.log.debug('Accesed with access token.');
			return url + '?access_token=' + accessToken;
		} else {
			sails.log.debug('Accesed with no access token.');
			return url;
		}
	}

};
