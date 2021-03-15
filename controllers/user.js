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
};