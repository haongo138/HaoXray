const Session = require('../models/session.model');
const shortid = require('shortid');
module.exports = (req, res, next) => {
    if(!req.signedCookies.sessionId) {
        let sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        });
        session = new Session({
            sessionId: sessionId,
            cart: []
        });
        session.save();
    }
    next();
}