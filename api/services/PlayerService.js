

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
		var bindparams = {
			id : player_id
		};

		db.executeQuery(query, bindparams, function(err, data) {

			next(err, data);
		});
	},

	buyItem : function(player_id, item_id, next) {

		var query = sails.config.queries.buy_item;

		var bindparams = {
			playerID : player_id,
			itemID : item_id
		};

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
		var bindparams = {
			id : player_id,
			skillName : skill
		};

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

		var bindparams = {
			id : player_id,
			random1 : { dir : oracledb.BIND_OUT, type : oracledb.INT },
			random2 : { dir : oracledb.BIND_OUT, type : oracledb.INT },
			what : { dir : oracledb.BIND_OUT, type : oracledb.INT }
		};

		db.executeProcedure(query, bindparams, function(err, data) {

			db.parseError(err, function(error) {

				next(error, data);
			});
		});
	},


	// Dorin - for battle / game history
	updateExperience : function(_id, _round, _percent, next){

    var plsql = sails.config.queries.update_experience;
    var bindvars = {
      playerid: _id,
      roundid: _round,
      precent: _percent
    };

		var db = new sails.services.databaseservice();
    db.procedureSimple(plsql, bindvars, (error) => {
        return next(error);
    });

  },

  updateEndBattle : function(req,res){

    var plsql = "BEGIN player_package.update_battle_end  (:p_playerid , :p_flag); END;";
    var bindvars = {
      p_playerid : req.user.id,
      p_flag : req.body.flag
    };

		var db = new sails.services.databaseservice();
    db.procedureSimple(plsql, bindvars, (error) => {
        if(error){
          return res.json({message: 'Error to dataBase!'});
        }
        return res.ok();
    });

  },

  saveGameHistory: function(req,res){
    // cand va fi apelata trebuie modificat parametrul al doilea => serverul stie jucatorii
    var plsql = "BEGIN Game_Managament.saveGameHistory  (:p_playerID1 , :p_playerID2,:p_winnerID); END;";
    var bindvars = {
      p_playerID1 : req.user.id,
      p_playerID2 : req.body.p_playerID2,
      p_winnerID : req.user.id
    };

		var db = new sails.services.databaseservice();
    db.procedureSimple(plsql, bindvars, (error) => {
        if(error){
          return res.json({message: 'Error to dataBase!'});
        }
        return res.ok();
    });

  }

};
