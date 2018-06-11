const express = require('express');
const passport = require("passport");
const ensureAuthenticated = require('../config/ensureAuthenticated');

const router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
	res.render('index', {
		title: 'Home :: Softek - SGI'
	});
});

/* Logout user */
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;