const LocalStrategy = require('passport-local').Strategy;
const db = require("./core/db");

module.exports = function (passport) {
    // Local Strategy
    passport.use(
        'local-login',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, username, password, done) { // callback with email and password from our form
                const strategyQuery = "select *, pwdcompare('" + password + "', senha, 0) as comparedPassword from usuario where codigo = '" + username + "'";

                db.querySql(strategyQuery, function (data, err) {
                    if (err)
                        return done(err);

                    if (!data.recordset.length) {
                        return done(null, false, {
                            message: 'No user found.'
                        });
                    }

                    var user = data.recordset[0];

                    if (!user || user.comparedPassword !== 1) {
                        done(null, false, {
                            message: 'Oh não! Senha incorreta.'
                        });
                        return;
                    }

                    done(null, user);
                });
            }
        )
    );

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

};