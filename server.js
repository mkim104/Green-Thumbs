//setting up modules and variables
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);


var app = express();

//creating database
mongoose.connect('mongodb://localhost:27017/Green-Thumbs', {useNewUrlParser: true, useUnifiedTopology: true});

//setting up middleware
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

//cookies, saving session id
app.use(session({
    secret: 'testkey', 
    //save back to session store
    resave: false,
    saveUninitialized: false,
    //data saves in database even if page is refreshed
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

require('./controllers/user')(app);

app.listen(8000, function() {
    console.log('App running on port 8000');
});