

var swig = require('swig');

module.exports = {

	render: function(req, res) {

		if (!req.user) {
			res.redirect('/signin');
		} else {
			res.redirect('/game');
		}
	},


	renderCourse: function(req, res, next){

			var object = {};
			object.me = req.user;


	}
};
