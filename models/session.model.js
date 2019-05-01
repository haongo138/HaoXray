const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    sessionId: String,
    cart: [Object]
});

const Session = new mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;