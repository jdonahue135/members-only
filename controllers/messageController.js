const User = require('../models/user');
const Message = require('../models/message');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display create message form on GET
exports.create_get = function(req, res) {
    if (!req.user) {
        res.redirect('/');
    }
    res.render('message_form', { title: 'Create message' });
};

// Handle create message form on POST
exports.create_post = function(req, res, next) {
    
    // Validate field
    body('title').trim().isLength({ min: 1 }).withMessage('Title must be specified.'),
    body('message').trim().isLength({ min: 1 }).withMessage('Message must be specified.')

    // Sanitize field.
    sanitizeBody('title').escape(),
    sanitizeBody('message').escape()

    //Save message to DB
    const message = new Message({
        title: req.body.title,
        text: req.body.message,
        user: req.user.id
    }).save(err => {
        if (err) return next(err);
        res.redirect("/");
    });
};

// Display delete message form on GET
exports.delete_get = function(req, res, next) {
    if (!req.user || req.user.admin_status == false) {
        res.redirect('/');
    }
    Message.findById(req.params.id)
    .exec(function (err, the_message) {
        if (err) return next(err);
        //successful, so render.
        res.render('message_delete', { message: the_message, title: 'Delete Message' });
    })
}

// Handle message delete on POST
exports.delete_post = function(req, res, next) {
    if (!req.user || req.user.admin_status == false) {
        res.redirect('/');
    }
    Message.findByIdAndDelete(req.params.id)
    .exec(function (err) {
        if (err) return next(err);
        //successful, redirect.
        res.redirect('/');
    })
}
