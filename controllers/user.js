var passport = require('passport');

module.exports = (app) => {

    app.get('/', function(req, res, next) {
        res.render('index');
    });

    app.get('/signup', (req, res) => {
        res.render('user/signup');
    });

    app.get('/login', (req, res) => {
        res.render('user/login');
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
};