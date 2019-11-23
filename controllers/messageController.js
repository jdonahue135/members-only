const User = require('../models/user');
const Message = require('../models/message');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display create message form on GET
exports.create_get = function(req, res) {
    res.render('message_form', { title: 'Create message' });
};

// Handle create message form on POST
exports.create_post = function(req, res) {
    // TODO
};