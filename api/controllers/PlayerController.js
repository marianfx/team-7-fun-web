/**
 * PlayerController
 *
 * @description :: Server-side logic for managing Players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var swig = require('swig');

module.exports = {

	getInventory: function(req, res) {

		var player_id = req.params.id;


		Player.find( { playerID : player_id }).
			populate('items').exec(function (err, data) {

				if(err) {
					sails.log.debug(err);
					return res.serverError("Something very very bad happened on the server.");
				}
				
				sails.log.debug(data[0].items);

				var result = swig.renderFile('views/game/inventory.swig', { items : data[0].items });

				res.ok( {data : result });
			});
	},

	buyItem: function(req, res) {

		var player_id = req.params.id;

		var item_id = req.body.itemID;

		var db = new sails.services.databaseservice();
		var query = sails.config.queries.buy_item; /*CHANGE*/

		var bindparams = {
			playerID : player_id,
			itemID : item_id
		};

		db.procedureSimple(null, null, query, bindparams, function(err) {

			if(err) {
				db.parseError(err, function(error) {

					res.serverError({message: error.message});
				});
			}

			else {
				err.ok(null);
			}
		});
	},

	getPlayer: function(req, res, next) {

		var player_id = req.params.id;

		var db = new sails.services.databaseservice();

		var query = sails.config.queries.user_details;
		var bindparams = {
			id : player_id
		};

		db.executeQuery(query, bindparams, function(err, data) {

			next(err, data);
		});
	}
	
};

