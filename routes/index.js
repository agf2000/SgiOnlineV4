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

/* GET login page. */
router.get('/login', function (req, res, next) {
	res.render('login', {
		title: 'Login :: Softek - SGI',
		layout: false,
		script: [
			'/plugins/amplify-store/amplify.min.js',
			'/dist/js/pages/login.js'
		]
	});
});

/* Login user */
router.post('/login', function (req, res, next) {
	passport.authenticate('local-login', function (error, user, info) {
		if (error) {
			return res.status(500).json(`${error}`);
		}
		if (!user) {
			return res.status(401).json(`${info.message}`);
		}
		// res.json(user);
		req.login(user, function (err) {
			if (err) {
				next();
				return res.status(500).json(err);
			}
			return res.json({
				message: 'authenticated',
			});
		});
	})(req, res, next);
});

/* Logout user */
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;