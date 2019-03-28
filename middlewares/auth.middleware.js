const db = require('../db');
module.exports.requireAuth = function (req, res, next) {
	if(!req.cookies.userId) {
		res.redirect('/auth/login');
		return;
	}
	let existedUser = db.get('users').find({ id: req.cookies.userId }).value();
	if(!existedUser) {
		res.redirect('/auth/login');
		return;
	}
	next();
};