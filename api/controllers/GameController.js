module.exports = {

	render: function(req, res) {
		
		if (!req.user) {
			res.redirect('/signin');
		} else {
			res.redirect('/game');
		}
	}
};
