/**
 * PlayerController
 *
 * @description :: Server-side logic for managing Players
 */

 var swig             = require('swig');

module.exports = {

  /**
   * Returns current player's inventory. User must be logged in.
   * @method function
   */
	getInventory: function(req, res) {

		var player_id = req.user.id;

		var DB = new sails.services.databaseservice();
		var query = sails.config.queries.player_inv;
		var bindParams = {
				id: player_id
		};

		DB.executeQuery(query, bindParams, (err, result) => {
					if(err) {
						sails.log.debug(err);
						return res.serverError("Something very very bad happened on the server.");
					}

					var toRender = swig.renderFile('views/game/inventory.swig', { items : result });
					res.ok( {data : toRender });
		});
	},


  /**
   * User buys an item.
   * @method function
   */
	buyItem: function(req, res) {

		var player_id = req.user.id;

		var itm = null;
		if(req.body && req.body.itemID)
				itm = req.body.itemID;
		else
			if(req.params.itemID)
				itm = req.params.itemID;

		//desired item was not transmitted
    if(!itm)
      return res.badRequest('One should buy an item which exists.');

		var db = new sails.services.databaseservice();
		var query = sails.config.queries.buy_item;

		var bindparams = {
			playerID : player_id,
			itemID : itm
		};

		db.procedureSimple(query, bindparams, function(err) {

			if(err) {
					return db.parseError(err, function(error) {
								res.serverError({message: error.message});
						});
			}
			return res.ok(null);
		});
	},


	/**
	 * Returns a row with all the necessary player data
	 * @method function
	 * @param  {Function} next [the function in line to call]
	 */
	getPlayer: function(pid, next) {

		var db = new sails.services.databaseservice();
		var query = sails.config.queries.user_details;

		var bindparams = {
			id : pid
		};

		db.executeQuery(query, bindparams, function(err, data) {
				next(err, data);
		});
	},


	/**
	 * [function description]
	 * @method function
	 */
	render: function(req, res, next){

			// load player info
			// load friends
			// load courses (smaller than the current one). For each one, add the rounds.
			var me = req.user.id;
			var PlayerLoader = new sails.services.playerdataloader();
			PlayerLoader.getAllPlayerInfo(me, (err, result) => {
					if(err)
						return res.serverError(sails.config.messages.server_error_DB_fault);

            var rendered = swig.renderFile('./views/game/playermenu.swig', {data: result});
            return res.ok(rendered);
			});

	}
};
