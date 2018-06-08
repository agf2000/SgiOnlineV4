module.exports = function (req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        next();
        return;
    }

    // if they aren't redirect them to the login page
    res.redirect('/login');
};