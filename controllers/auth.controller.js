const db = require('../db');		

module.exports.login = function(req, res) {
	res.render('auth/login');
};

module.exports.postLogin = function(req, res) {
	let username = req.body.username;
	let password = req.body.password;
	const existedUser = db.get('users').find({ username: username }).value();
	if(!existedUser) {
		res.render('auth/login', {
			errors: [
				"User doesn't exist. Please try again !"
			],
			value: req.body
		});
		return;
	}
	if(existedUser.password !== password){
		res.render('auth/login', {
			errors: [
				"Wrong password !"
			]
		});
		return;
	}
	res.cookie('userId', existedUser.id);
	res.redirect('/users');
};