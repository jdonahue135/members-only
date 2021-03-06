const User = require('../models/user');
const Message = require('../models/message')

const passport = require('passport');
const bcrypt = require('bcrypt');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display index page on GET
exports.index = (req, res, next) => {
    // Get list of messages
    if (req.user) {
        Message.find({})
        .populate('user')
        .exec(function(err, list_messages) {
            if (err) return next(err)
            res.render('index', { title: 'Members-Only', message_list: list_messages, user: req.user })
        });
    }
    else {
        res.render('index', { title: 'Members-Only', user: req.user })
    }
}

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
              admin_status: false,
              membership_status: false
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
exports.user_logout = function(req, res) {
    req.logout();
    res.redirect('/');
}

// Display join form on GET
exports.join_get = function(req, res) {
    if (!req.user) {
        res.redirect('/')
    }
    res.render('join_form', { title: 'Join the Club!' });
};

// Handle join on POST
exports.join_post = function(req, res, next) {
    
    // Validate field.
    body('code').trim().isLength({ min: 1 }).withMessage('Secret Code must be specified.')
        .isAlphanumeric().withMessage('Secret Code has non-alphanumeric characters.')

    // Sanitize field.
    sanitizeBody('code').escape()

    // Verify secret code.
    if (req.body.code !== 'guest') {
        res.redirect("/join");
    }
    else {
        const user = new User({
            username: req.user.username,
            password: req.user.password,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            membership_status: true,
            admin_status: req.user.admin_status,
            _id:req.user.id //This is required, or a new ID will be assigned!
        })
        User.findByIdAndUpdate(req.user.id, user, {}, function(err, theuser) {
                if (err) { return next(err); }
                // Successful
                res.redirect('/');
            })
    }
};

// Display admin form on GET
exports.admin_get = function(req, res) {
    if (!req.user || req.user.membership_status == false) {
        res.redirect('/')
    }
    res.render('admin_form', { title: 'Become an admin!' });
};

// Handle admin on POST
exports.admin_post = function(req, res, next) {
    
    // Validate field.
    body('code').trim().isLength({ min: 1 }).withMessage('Secret Code must be specified.')
        .isAlphanumeric().withMessage('Secret Code has non-alphanumeric characters.')

    // Sanitize field.
    sanitizeBody('code').escape()

    // Verify secret code.
    if (req.body.code !== 'guest') {
        res.redirect("/admin");
    }
    else {
        const user = new User({
            username: req.user.username,
            password: req.user.password,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            membership_status: req.user.membership_status,
            admin_status: true,
            _id:req.user.id //This is required, or a new ID will be assigned!
        })
        User.findByIdAndUpdate(req.user.id, user, {}, function(err, theuser) {
                if (err) { return next(err); }
                // Successful
                res.redirect('/');
            })
    }
};