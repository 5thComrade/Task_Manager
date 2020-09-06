const jwt = require('jsonwebtoken');
const User = require('../models/user');
const keys = require('../../config/keys');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, keys.signature);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token});

        if(!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch(err) {
        res.redirect('/');
    }
};

module.exports = auth;