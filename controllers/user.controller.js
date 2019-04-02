const shortid = require('shortid');

const db = require('../db');

let users = db.get('users').value();

//GET controllers
module.exports.index = (req, res) => {
  res.render('users/index', {
    users: users
  });
};

module.exports.search = (req, res) => {
  let q = req.query.q;
  matchedUsers = users.filter(function(user){
    return user.username.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index', {
    users: matchedUsers
  });
};
module.exports.register = (req, res) => res.render('users/register');

module.exports.getUserInfo = (req, res) => {
  var id = req.params.id;
  user = db.get('users').find({ id: id }).value();
  return res.render('users/viewInfo', {
    user: user
  });
};

// POST controllers
module.exports.postRegister = (req, res) => {
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
};
