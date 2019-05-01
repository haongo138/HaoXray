const User = require('../models/user.model');

module.exports.requireAuth = async function (req, res, next) {
	if(!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;
	}
	let existedUser = await User.findOne({ 
		_id: req.signedCookies.userId 
	});

	if(!existedUser) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.currentUser = existedUser;	
	next();
};