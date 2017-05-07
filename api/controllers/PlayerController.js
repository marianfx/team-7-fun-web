

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

	loadTopPlayersBy: function(req, res) {

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
				res.serverError({ message: err.message });
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
			sails.log.debug("Dice.");
			//sails.log.debug(data[1]);
			//sails.log.debug(data[1][0]['@p_random1']);
			response.html_firstDie = swig.renderFile('views/game/die.swig', { dieSide :  data[1][0]['@p_random1'] });
			response.html_secondDie = swig.renderFile('views/game/die.swig', { dieSide :  data[2][0]['@p_random2'] });

			response.what = data[3][0]['@p_what'];

			//sails.log.debug(response);

			res.ok(response);
		});
	},

	loadProfile: function(req, res) {

		var player_id = parseInt(req.user.id),
			profile_to_get_id = parseInt(req.param('id'));

		PlayerService.getProfile(player_id, profile_to_get_id, function(err, data) {

			if(err) {

				res.serverError('Something very bad happened on the server.');
			}
			else {

				var response = {};

				response.arefriends = data.arefriends;
				response.html = swig.renderFile('views/game/profile.swig', { userdata :  data });
				res.ok(response);
			}
		});
	},

	addFriend: function(req, res) {

		var player1_id = parseInt(req.user.id),
			player2_id = parseInt(req.body.id);

		PlayerService.addFriend(player1_id, player2_id, function(err, data) {

			if(err) {

				sails.log.debug(err);
				res.serverError('Something very bad happened on the server.');
			}
			else {

				res.ok({ playername : data });
			}
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

		var bindparams = [pid];

		db.executeQuery(query, bindparams, function(err, data) {
				next(err, data);
		});
	},


	/**
	 * Renders the player menu to the user (info, friends etc).
	 * @method function
	 */
	render: function (req, res, next) {

	  // load player info
	  // load friends
	  // load courses (smaller than the current one). For each one, add the rounds.
	  var me = req.user.id;
	  var PlayerLoader = new sails.services.playerdataloader();
	  PlayerLoader.getAllPlayerInfo(me, (err, result) => {
	    if (err)
	      return res.serverError(sails.config.messages.server_error_DB_fault);

	    var rendered = swig.renderFile('./views/game/playermenu.swig', {
	      data: result
	    });
	    return res.ok(rendered);
	  });
	},



	  /**
	 * [function add time to user witch use that ability]
	 * @param  {[request]} req [here i get userID]
	 * @param  {[response]} res [description]
	 */
	  addTime: function (req, res) {

	    sails.log.debug("ADDING TIME TO " + req.user.id);

	    console.log(req.body.message);
	    if (req.body.message === "multiplayer") {
	      sails.services.arena.addTime(req.user.id, res);
	      return;
	    }

	    var QS = new sails.services.questionservice();
	    QS.addSomeTime(req.user.id, (err, result) => {

	      if (err)
	        return res.serverError('Something bad happened on the server (' + err.message + ').');

	      return res.ok(result);
	    });
	  },



    /**
   * Update player profile basic info (name & picture)
   * @method function
   */
  update: function(req, res){

    var name = req.param('playerName').toString();
    name = name.trim();
    if(name.length < 3)
        return res.redirect('/game');

    sails.log.debug("Updating " + name);
    return sails.models.player.update({playerID: req.user.id}, {playerName: name}, (err, player) => {

        if(err)
            return res.redirect('/game');

        return sails.controllers.player.updatePic(req, res, (err) => {
            if(err)
              return res.redirect('/game');

            return res.redirect('/game');
        });
    });
  },

  /**
   * Upload the profile picture.
   * @method function
   */
  updatePic: function(req, res, next) {

      req.file('avatar')
          .upload({
              maxBytes: 2000000, //2MB
              dirname: require('path').resolve(sails.config.appPath, 'assets/images/avatars')
          },
          (err, uploaded) => {

              if(err){
                sails.log.debug(err);
                return next('Something very bad happened on the server. Cannot upload your file');
              }

              if(uploaded.length === 0)
                return next('No file was uploaded.');

              var tempName = uploaded[0].fd;
              var index = tempName.lastIndexOf('\\') + 1;
              tempName = tempName.substr(index);
              var avatarURL = '/images/avatars/' + tempName;
              // all ok, update in the db
              return sails.models.player.update({playerID: req.user.id}, {photoURL: avatarURL}, (err, player) => {

                  if(err){
                      return next(err.message);
                  }

                  player = player[0];

                  // update file on client to
                  var fs = require('fs');
                  var path1 = require('path').resolve(sails.config.appPath, 'assets' + avatarURL);
                  var path2 = require('path').resolve(sails.config.appPath, '.tmp/public' + avatarURL);
                  fs.createReadStream(path1).pipe(fs.createWriteStream(path2));
                  return next();
              });

          });
  }

};
