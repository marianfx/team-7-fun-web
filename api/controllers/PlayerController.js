

 var swig  = require('swig');

/**
 * PlayerController
 *
 * @description :: Server-side logic for managing Players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

	loadCookies: function(req, res) {

		var player_id = req.user.id;

		PlayerService.getPlayer(player_id, function(err, data) {

			if(err) {
				sails.log.error(err);
				return res.serverError("Something very very bad happened on the server.");
			}
			else {

				var html = swig.renderFile('views/game/cookies.swig', { cookies : data[0].cookies } );
				res.ok(html);
			}
		});
	},

	loadSkillpoints: function(req, res) {

		var player_id = req.user.id;

		PlayerService.getPlayer(player_id, function(err, data) {

			if(err) {
				sails.log.error(err);
				return res.serverError("Something very very bad happened on the server.");
			}
			else {

				var html = swig.renderFile('views/game/skillpoints.swig', { skillpoints : data[0].skillPoints } );
				res.ok(html);
			}
		});
	},


  /**
   * Returns current player's inventory. User must be logged in.
   * @method function
   */
	loadInventory: function(req, res) {

		var player_id = req.user.id;

		PlayerService.getPlayer(player_id, function(err, data) {

			if(err) {
				sails.log.debug(err);
				return res.serverError("Something very very bad happened on the server.");
			}
			else {

				var html = swig.renderFile('views/game/inventory.swig', { items : data[0].items, playerName : data[0].playerName });
				res.ok(html);
			}
		});
	},

	loadTopPlayersBy: function(req,res) {

		var byWhat = req.body.by;

		PlayerService.getTopPlayersBy(byWhat, function(err, data) {

			if(err) {

				res.serverError("Something very bad happened on the server.");
			}
			else {

				if(byWhat === 'PLAYERLEVEL')
					byWhat = 'LEVEL';

				byWhat = byWhat.charAt(0) + byWhat.slice(1).toLowerCase();

				var html = swig.renderFile('views/game/topplayers.swig', { players : data, header : byWhat });
				res.ok(html);
			}
		});
	},

	loadSkills: function(req, res) {

		var player_id = req.user.id;

		PlayerService.getSkills(player_id, function(err, data) {

			if(err) {
				sails.log.debug(err);
				return res.serverError("Something very very bad happened on the server.");
			}
			else {

				var html = swig.renderFile('views/game/skills.swig', { skills : data[0] });

				res.ok(html);
			}
		});
	},

	buyItem: function(req, res) {

		var player_id = req.user.id;

		var item_id = req.body.itemID;

		PlayerService.buyItem(player_id, item_id, function(err) {

			if(err) {

				//sails.log.debug(err);
				res.serverError({ message: err.message });
			}
			else {
				res.ok(null);
			}
		});
	},

	addSkill: function(req, res) {

		var player_id = req.user.id;
		var skill = req.body.skill;

		PlayerService.addSkill(player_id, skill, function(err) {

			if(err) {

				sails.log.debug(err);
				res.serverError({ message: error.message });
			}
			else {

				res.ok(null);
			}
		});
	},

	rollDice: function(req, res) {

		var player_id = req.user.id;

		var response = {};

		PlayerService.rollDice(player_id, function(err, data) {

			if(err) {
				sails.log.debug('error in player controller:');
				sails.log.debug(err);
				res.serverError({ message: err.message });
				return;
			}

			response.html_firstDie = swig.renderFile('views/game/die.swig', { dieSide :  data.random1 });
			response.html_secondDie = swig.renderFile('views/game/die.swig', { dieSide :  data.random2 });

			response.what = data.what;

			sails.log.debug(response);

			res.ok(response);
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
