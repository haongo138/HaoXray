const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    city: String,
    age: String,
    profileAvatar: String
});

const User = new mongoose.model('User', userSchema, 'users');

module.exports = User;