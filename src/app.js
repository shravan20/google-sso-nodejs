const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/envConfig');
var userProfile;

app.set('view engine', 'ejs');

morgan.token('timed', 'A new :method request for :url was received. It took :total-time[2] milliseconds to be resolved');
app.use(morgan('timed'));
app.use(morgan('dev'));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
}));  

app.get('/', function(req, res) {
    res.render('auth');
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
/**
 * OAuth Business Logic
 */
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const logger = require('./config/logger');

const GOOGLE_CLIENT_ID = config.clientId;
const GOOGLE_CLIENT_SECRET = config.secret;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });
  

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.get('/health-check', (request, response) => response.json({'health-indicator':'up'}));

// enable cors
app.use(cors());
app.options('*', cors());

module.exports = app;