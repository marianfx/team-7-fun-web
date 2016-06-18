

var swig = require('swig');

module.exports = {

	render: function(req, res) {

		// if (!req.user) {
		// 	return res.redirect('/signin');
		// }

		var rendered = swig.renderFile('./views/game/game.swig');
		return res.ok(rendered);
	},

	renderArena: function(req, res) {
		var swig = require('swig');
		var rendered = swig.renderFile('./views/multiplayer/arena.swig');
		return res.ok(rendered);
	}

};
