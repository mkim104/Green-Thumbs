var passport = require('passport');

module.exports = (app) => {

    app.get('/', function (req, res, next) {
        res.render('index');
    });

    app.get('/signup', (req, res) => {
        res.render('user/signup');
    });

    app.get('/login', (req, res) => {
        res.render('user/login');
    });

    app.get('/home', (req, res) => {
        res.render('user/home', { user: req.user });
    });

    var Organization = require('../models/organization');

    app.get('/reviews', (req, res) => {
        Organization.find({}, (err, result) => {
            console.log(result)
            res.render('user/organizations', { title: 'All Organizations', user: req.user, data: result });
        });
    });

    var { arrayAverage } = require('../functions');

    app.get('/organizationprofile/:id', (req, res) => {
        Organization.findOne({ '_id': req.params.id }, (err, data) => {
            var average = arrayAverage(data.ratingNumber);
            res.render('user/organizationprofile', { title: 'Organization Profile', user: req.user, id: req.params.id, data: data, average: average });
        });
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/logout', (req, res) => {
        req.logout();
        req.session.destroy((err) => {
            res.redirect('/');
        });
    });
};