const md5 = require('md5');

const User = require('../models/user.model');		

module.exports.login = function(req, res) {
	res.render('auth/login');
};

module.exports.postLogin = async function(req, res) {
	let username = req.body.username;
	let password = req.body.password;
	const existedUser = await User.findOne({ username: username });
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