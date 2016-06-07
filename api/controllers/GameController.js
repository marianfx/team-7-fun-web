

module.exports = {

	render: function(req, res) {

		// if (!req.user) {
		// 	return res.redirect('/signin');
		// }

		var swig = require('swig');
		var rendered = swig.renderFile('./views/game/game.swig');
		return res.ok(rendered);
	}


};
