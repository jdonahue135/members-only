var express = require('express');
var router = express.Router();

// Require controller modules
var index_controller = require('../controllers/indexController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members-Only', user: req.user });
});

// GET sign up form
router.get('/signup',  index_controller.user_signup_get);

// POST request to sign up
router.post('/signup',  index_controller.user_signup_post);

// GET request to login
router.get('/login',  index_controller.user_login_get);

// POST request to login
router.post('/login',  index_controller.user_login_post);

// POST request to logout
router.post('/logout', index_controller.user_logout_post);

module.exports = router;
