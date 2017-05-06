

module.exports = {

	getPlayer : function(player_id, next) {

		Player.find( { playerID : player_id }).populate('items').exec(function(err, data) {

			next(err, data);
		});
	},

	getTopPlayersBy : function(byWhat, next) {

		var db = new sails.services.databaseservice();
		var query = sails.config.queries.top_players.replace('@COLUMNNAME', byWhat);
		var finalQuery = query.replace('@COLUMNNAME', byWhat);

		db.executeQuery(finalQuery, [], function(err, data) {

			next(err, data);
		});
	},

	getSkills : function(player_id, next) {

		var db = new sails.services.databaseservice();

		var query = sails.config.queries.load_skills;
		var bindparams = [player_id];

		db.executeQuery(query, bindparams, function(err, data) {

			next(err, data);
		});
	},

	buyItem : function(player_id, item_id, next) {

		var query = sails.config.queries.buy_item;

		var bindparams = [player_id, item_id];

		var db = new sails.services.databaseservice();

		db.procedureSimple(query, bindparams, function(err) {

			db.parseError(err, function(error) {

					/*if a custom error from database should put a special property
					in the object send so you can test and act accordingly on front side*/
					/*something that the client must see or not*/

					next(error);
			});
		});
	},

	addSkill : function(player_id, skill, next) {

		var db = new sails.services.databaseservice();

		var query = sails.config.queries.add_skill;
		var bindparams = [player_id, skill];

		db.procedureSimple(query, bindparams, function(err) {

			db.parseError(err, function(error) {

					/*if a custom error from database should put a special property
					in the object send so you can test and act accordingly on front side*/
					/*something that the client must see or not*/

					next(error);
			});
		});
	},

	rollDice : function(player_id, next) {

		var db = new sails.services.databaseservice();

		var oracledb = db.oracledb;

		var query = sails.config.queries.use_luck;

		var bindparams = [player_id];

		db.executeProcedure(query, bindparams, function(err, data) {

			db.parseError(err, function(error) {

				next(error, data);
			});
		}, true);
	},


	getFriendsCount : function(player_id, next) {

		var db = new sails.services.databaseservice();

		var query = sails.config.queries.get_friends_count;
		var bindparams = [player_id];

		db.executeQuery(query, bindparams, function(err, data) {

			db.parseError(err, function(error) {
				next(error, data);
			});
		});
	},


	areFriends : function(player_id1, player_id2, next) {

		var db = new sails.services.databaseservice();

		var query = sails.config.queries.are_friends;
		var bindparams = [player_id1, player_id2];

		db.executeQuery(query, bindparams, function(err, data) {

			db.parseError(err, function(error) {
				next(error, data);
			});
		});
	},

	getProfile : function(player_id, profile_to_get_id, next) {

		var userdata = {};
		userdata.me = false;
		userdata.arefriends = false;

		if(player_id === profile_to_get_id) {
			userdata.me = true;
		}
		else {

			PlayerService.areFriends(player_id, profile_to_get_id, function(err, data) {

				if(err) {
					next(err, null);
				}
				else {

					if(data.length > 0) {
						userdata.arefriends = true;
					}
				}
			});
		}

		sails.controllers.player.getPlayer(profile_to_get_id, function(err, data) {

			if(err) {
				next(err, data);
			}
			else {

				userdata.details = data[0];

				var options = {
   					weekday: 'long',
   					year: 'numeric',
   					month: 'short',
    				day: 'numeric',
    				hour: '2-digit',
    				minute: '2-digit'
				};

				userdata.details.REGISTRATIONDATE = userdata.details.REGISTRATIONDATE.toLocaleTimeString('en-us', options);
				userdata.details.LASTLOGINDATE = userdata.details.LASTLOGINDATE.toLocaleTimeString('en-us', options);

				PlayerService.getFriendsCount(profile_to_get_id, function(err, data) {

					if(err) {
						next(err, null);
					}
					else {

						userdata.friendscount = data[0].FRIENDSCOUNT;
						next(err, userdata);
					}
				});
			}
		});
	},

	addFriend : function(player1_id, player2_id, next) {

		sails.controllers.friend.createHandler(player1_id, player2_id, function(err) {

			if(err) {
				next(err, null);
			}
			else {
				PlayerService.getPlayer(player2_id, function(err, data) {

					if(err) {
						next(err, null);
					}
					else {
						next(err, data[0].playerName);
					}
				});
			}
		});
	},

	// Dorin - for battle / game history
	updateExperience : function(_id, _round, _percent, next){

    var plsql = sails.config.queries.update_experience;
    var bindvars = [_id, _round, _percent];

	var db = new sails.services.databaseservice();
    db.procedureSimple(plsql, bindvars, (error) => {
        return next(error);
    });

  },

  updateEndBattle : function(req,res){

    var plsql = "CALL update_battle_end(?, ?)";
    var bindvars = [req.user.id, req.body.flag];

	var db = new sails.services.databaseservice();
    db.procedureSimple(plsql, bindvars, (error) => {
        if(error){
          return res.json({message: 'Error to dataBase!'});
        }
        return res.ok();
    });

  },

  saveGameHistory : function(req,res) {
    // cand va fi apelata trebuie modificat parametrul al doilea => serverul stie jucatorii
    var plsql = "CALL saveGameHistory(?, ?, ?)";
    var bindvars = [req.user.id, req.body.p_playerID2, req.user.id];

	var db = new sails.services.databaseservice();
    db.procedureSimple(plsql, bindvars, (error) => {
        if(error){
          return res.json({message: 'Error to dataBase!'});
        }
        return res.ok();
    });
  }
};
