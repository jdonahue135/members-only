var express = require('express');
var router = express.Router();

// Require controller modules
var index_controller = require('../controllers/indexController');
var message_controller = require('../controllers/messageController');


/* GET home page. */
router.get('/', index_controller.index);

// GET sign up form
router.get('/signup',  index_controller.user_signup_get);

// POST request to sign up
router.post('/signup',  index_controller.user_signup_post);

// GET request to login
router.get('/login',  index_controller.user_login_get);

// POST request to login
router.post('/login',  index_controller.user_login_post);

// POST request to logout
router.get('/logout', index_controller.user_logout);

// GET request to join club
router.get('/join',  index_controller.join_get);

// POST request to join club
router.post('/join',  index_controller.join_post);

// GET request to become admin
router.get('/admin',  index_controller.admin_get);

// POST request to become admin
router.post('/admin',  index_controller.admin_post);

// GET message create form
router.get('/message/create',  message_controller.create_get);

// POST request to create message
router.post('/message/create',  message_controller.create_post);

//GET message delete page
router.get('/message/:id/delete', message_controller.delete_get);

//POST message delete page
router.post('/message/:id/delete', message_controller.delete_post);


module.exports = router;
