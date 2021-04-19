var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var secret = require('../secret/secret');


//create user variable to give access to schema as we used module.export
var User = require('../models/user');

//takes user ID and save it in the sesssion
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new FacebookStrategy(secret.facebook, (req, token, refreshToken, profile, done) => {
    User.findOne({facebook: profile.id}, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, user);
        }
        else {
            var newUser = new User();
            newUser.facebook = profile.id;
            newUser.fullname = profile.displayName;
            newUser.email = profile._json.email;
            newUser.tokens.push({token: token});

            newUser.save((err) => {
                return done(null, newUser);
            });

        }
    });
}));