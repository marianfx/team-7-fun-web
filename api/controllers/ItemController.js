/**
 * ItemsController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var swig = require('swig');

module.exports = {

	/**
	***Gets all items from database to populate the shop view.
	***It will look for all the items in the database which
	***cookies cost is not zero (since those which cost 0 
	***are in fact courses)
	*/

	loadShop: function(req, res) {

		var player_id = req.params.id, /*TO CHANGE*/
			lastItemID,
			limit;

        try {
            lastItemID = parseInt(req.body.lastItemID);
        } catch (e) {
            lastItemID = 0;
        }
 
        try {
            limit = parseInt(req.body.limit);
        } catch (e) {
            limit = 2;
        }

		ItemService.loadShop(player_id, lastItemID, limit, function(err, data) {

			if(err) {
				sails.log.debug(err);
				res.serverError("Something very bad has happen on the server.");
			}
			else {

				var html = swig.renderFile('views/game/shop.swig', { items : data.items });

				var enhancedData = {
					htmlToAppend : html,
					lastID : data.lastID
				};

				res.ok(enhancedData);
			}		
		});
	},

	reloadShop: function(req, res) {

		var player_id = req.params.id, /*TO CHANGE*/
			lastItemID = parseInt(req.body.lastItemID);

		ItemService.reloadShop(player_id, lastItemID, function(err, data) {


			if(err) {
				sails.log.debug(err);
				res.serverError("Something very bad happened on the server.");
			}
			else {

				var html = swig.renderFile('views/game/shop.swig', { items : data });

				res.ok(html);
			}
		});
	}
	
};

