module.exports = {

	loadShop : function(player_id, last, limit, next) {

		var query = sails.config.queries.get_shop;

		var bindparams = [player_id, last, limit];

		var db = new sails.services.databaseservice();

		db.executeQuery(query, bindparams, function(err, data) {


			if(err) {

				next(err, null);
			}

			var itemsIDs = data.map(function(item) { return item.ITEMID;});
			var maxID = Math.max.apply(null, itemsIDs);

			var enhancedData = {
				items : data,
				lastID : maxID
			};

			next(err, enhancedData);
		});
	},

	reloadShop : function(player_id, last, next) {

		var query = sails.config.queries.reload_shop;

		var bindparams = [player_id, last];

		var db = new sails.services.databaseservice();

		db.executeQuery(query, bindparams, function(err, data) {

			next(err, data);			
		});
	}
};