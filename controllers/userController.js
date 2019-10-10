var User = require('../models/user');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display login form on GET
exports.user_login_get = function(req, res) {
    res.render('login_form', { title: 'Log In' });
};

// Handle login on POST
exports.user_login_post = function(req, res) {
    //TODO
};