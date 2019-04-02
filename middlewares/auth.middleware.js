const db = require('../db');
module.exports.requireAuth = function (req, res, next) {
	if(!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;
	}
	let existedUser = db.get('users').find({ 
		id: req.signedCookies.userId 
	}).value();
	if(!existedUser) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.currentUser = existedUser;
	
	next();
};