const createError = require('http-errors');
const express = require('express');
const hbs = require('express-handlebars');
const helpers = require("./core/helpers.js")
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

// Passport Config
require('./passport')(passport);

const indexRouter = require('./routes/index');
const authRouter = require("./routes/auth");
const products = require('./routes/products');
const clients = require('./routes/clients');
const sales = require('./routes/sales');
const users = require('./routes/users');
const templates = require('./routes/templates');
const api = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
	extname: 'hbs',
	defaultLayout: 'main',
	helpers: helpers,
	layoutsDir: path.join(__dirname, '/views/layouts/'),
	partialsDir: path.join(__dirname, '/views/partials/')
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
	secret: 'jabuticaba',
	resave: true,
	saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/login', authRouter);
app.use('/produtos', products);
app.use('/clientes', clients);
app.use('/davs', sales);
app.use('/users', users);
app.use('/templates', templates);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;