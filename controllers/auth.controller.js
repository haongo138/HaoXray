const md5 = require('md5');

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
	let hashedPassword = md5(password);
	if(existedUser.password !== hashedPassword){
		res.render('auth/login', {
			errors: [
				"Wrong password !"
			]
		});
		return;
	}
	res.cookie('userId', existedUser.id, {
		signed: true
	});
	res.redirect('/users');
};