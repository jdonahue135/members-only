const User = require('../models/user');

const passport = require('passport');
const bcrypt = require('bcrypt');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display sign up form on GET
exports.user_signup_get = function(req, res) {
    res.render('signup_form', { title: 'Sign up' });
};

// Handle sign up on POST
exports.user_signup_post = (req, res, next) => {
    
    // Validate fields.
    body('first_name').trim().isLength({ min: 1 }).withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('last_name').trim().isLength({ min: 1 }).withMessage('Last name must be specified.')
        .isAlphanumeric().withMessage('Last name has non-alphanumeric characters.'),
    body('username').trim().isLength({ min: 1 }).withMessage('Username must be specified.')
        .isAlphanumeric().withMessage('Username has non-alphanumeric characters.'),
    body('password').trim().isLength({ min: 1 }).withMessage('Password must be specified.')
        .isAlphanumeric().withMessage('Password has non-alphanumeric characters.'),
    body('confirm_password').trim().isLength({ min: 1 }).withMessage('Password must be confirmed.')

    // Sanitize fields.
    sanitizeBody('first_name').escape(),
    sanitizeBody('last_name').escape(),
    sanitizeBody('username').escape(),
    sanitizeBody('password').escape(),
    sanitizeBody('confirm_password').escape(),

    //Verify that username does not already exist
    User.findOne( { username: req.body.username }, (err, user) => {
        if (err) return next(err);
        if (user) {
            res.redirect("/signup", {message: 'usernamer already exists'});
        }
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) return next(err);
            const user = new User({
              username: req.body.username,
              password: hashedPassword,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
            }).save(err => {
              if (err) return next(err);
              res.redirect("/");
            });
        });
    });
}

// Display login form on GET
exports.user_login_get = function(req, res) {
    res.render('login_form', { title: 'Log In' });
};

// Handle login on POST
exports.user_login_post = function(req, res, next) {
    passport.authenticate('local', { 
        failureRedirect: '/login',
        successRedirect: '/' 
    })(req, res, next)
}

//Handle logout on post
exports.user_logout_post = function(req, res) {
    req.logout();
    res.redirect('/');
}