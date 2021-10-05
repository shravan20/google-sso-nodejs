const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const passport = require('passport');
const config = require('./config/envConfig');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const logger = require('./config/logger');
const authRouter = require('./api/routes/auth.route.js');
const googleAuthRouter = require('./api/routes/googleAuth.route.js');

var userProfile;

app.set('view engine', 'ejs');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
}));  

app.use(passport.initialize());
app.use(passport.session());


app.use('/', authRouter);
app.use('/auth/google', googleAuthRouter);


passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/**
 * OAuth Business Logic
 */
const GOOGLE_CLIENT_ID = config.clientId;
const GOOGLE_CLIENT_SECRET = config.secret;
const GOOGLE_CALLBACK_URL = config.callbackUrl;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
// app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
 
// app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/error' }),
//   function(req, res) {
//     // Successful authentication, redirect success.
//     res.redirect('/success');
//   });
  

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.get('/health-check', (request, response) => response.json({'health-indicator':'up'}));

// enable cors
app.use(cors());
app.options('*', cors());

module.exports = app;