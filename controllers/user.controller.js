const shortid = require('shortid');
const md5 = require('md5');
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
  req.body.password = md5(req.body.password);
  if(req.file) {
      req.body.profileAvatar = req.file.path.replace(/\\/g, "/").substring("public".length).split('/').slice(1).join('/');
  }
  else {
    req.body.profileAvatar = "images/no_profile_image.png";
  }
  db.get('users').push(req.body).write();
  res.redirect('/users');
}; 
