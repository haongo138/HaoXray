const db = require('../db');

let users = db.get('users').value();

module.exports.postRegister = (req, res, next) => {
  let errors = [];
  if(!req.body.username) {
    errors.push("An username is required !");
  }
  if(users.some((user) => user.username === req.body.username)) {
    errors.push("Existed username, please choose another one !!");
  }
  if(!req.body.password) {
    errors.push("A password is required !");
  }
  if(!req.body.age) {
    errors.push("Age is required !");
  }
  if(!req.body.city) {
    errors.push("City is required !");
  }
  if(errors.length) {
    res.render('users/register', {
      errors: errors,
      value: req.body
    });
    return;
  }
  next();
}