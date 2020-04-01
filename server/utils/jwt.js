const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.services');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret }).unless({
        path: [
            // No auth required for these APIs
            '/login',
            '/register'
        ]
    });
}