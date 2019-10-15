var express = require('express');
var router = express.Router();

// Require controller modules
var user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET request to login
router.get('/login',  user_controller.user_login_get);

// POST request to login
router.post('/login',  user_controller.user_login_post);

// GET request to sign up
router.get('/signup',  user_controller.user_signup_get);

// POST request to sign up
router.post('/signup',  user_controller.user_signup_post);


module.exports = router;
