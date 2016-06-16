

 var swig  = require('swig');

 /**
  * PlayerController - handles all the player operations
  *
  * @description :: Server-side logic for managing Players
  */
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
						return res.serverError("Something very very bad happened on the server (cannot execute functions for retrieving player inventory from the DB).");
					}

					var rendered = swig.renderFile('views/game/inventory.swig', { items : result });
					res.ok( {data : rendered });
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
	 * Renders the player menu to the user (info, friends etc).
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
	},


  /**
 * [function add time to user witch use that ability]
 * @param  {[request]} req [here i get userID]
 * @param  {[response]} res [description]
 */
  addTime: function(req,res){

    sails.log.debug("ADDING TIME TO "+ req.user.id);
    var QS = new sails.services.questionservice();
    QS.addSomeTime(req.user.id, (err, result) => {

        if(err)
          return res.serverError('Something bad happened on the server (' + err.message + ').');

        return res.ok(result);
    });
  }
};
