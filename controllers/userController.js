var User = require('../models/user');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display login form on GET
exports.user_login_get = function(req, res) {
    //TODO
};

// Handle login on POST
exports.user_login_post = function(req, res) {
    //TODO
};