

var swig = require('swig');

module.exports = {

	render: function(req, res) {
		if(req.session.authenticated){
			var rendered = swig.renderFile('./views/game/game.swig');
			return res.ok(rendered);
		}
		else
			return res.redirect("/signin");
	},

	renderArena: function(req, res) {
		var swig = require('swig');
		var rendered = swig.renderFile('./views/multiplayer/arena.swig');
		return res.ok(rendered);
	}

};
