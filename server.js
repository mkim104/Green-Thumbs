//setting up modules and variables
var express = require('express');
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('connect-flash');

var app = express();

//creating database
mongoose.connect('mongodb://localhost:27017/Green-Thumbs', { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.log(error));

require('./config/passport');

//setting up middleware
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));

//cookies, saving session id
app.use(session({
    secret: 'testkey',
    //save back to session store
    resave: false,
    saveUninitialized: false,
    //data saves in database even if page is refreshed
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//add passport middleware after 
app.use(flash());

//set up passport
app.use(passport.initialize());
app.use(passport.session());

require('./controllers/user')(app, passport);
require('./controllers/organization')(app);
require('./controllers/review')(app);



app.listen(8000, function () {
    console.log('App running on port 8000');
});