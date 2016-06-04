

var swig = require('swig');

module.exports = {

	render: function(req, res) {

		if (!req.user) {
			res.redirect('/signin');
		} else {
			res.redirect('/game');
		}
	},


	renderPlayerInfo: function(req, res, next){
			var pid = req.user.id;

			sails.controllers.player.getPlayer(pid, (err, data) => {

			});
	}
};
