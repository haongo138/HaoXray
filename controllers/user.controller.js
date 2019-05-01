const md5 = require('md5');
const User = require('../models/user.model');



//GET controllers
module.exports.index = async function (req, res) {
  const users = await User.find();
  res.render('users/index', {
    users: users
  });
};

module.exports.search = async function (req, res) {
  const users = await User.find();
  let q = req.query.q;
  matchedUsers = users.filter(function(user){
    return user.username.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index', {
    users: matchedUsers
  });
};
module.exports.register = (req, res) => res.render('users/register');

module.exports.getUserInfo = async function (req, res) {
  const _id = req.params.id;
  user = await User.findOne({ _id: _id });
  return res.render('users/viewInfo', {
    user: user
  });
};

// POST controllers
module.exports.postRegister = (req, res) => {
  req.body.password = md5(req.body.password);
  if(req.file) {
      req.body.profileAvatar = req.file.path.replace(/\\/g, "/").substring("public".length).split('/').slice(1).join('/');
  }
  else {
    req.body.profileAvatar = "images/no_profile_image.png";
  }
  user = new User(req.body);
  user.save(function(err) {
    if (err) throw err;
})
  res.redirect('/users');
}; 
