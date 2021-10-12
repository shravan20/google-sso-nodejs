let passport = require('passport');
let Promise = require('bluebird');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    db.User.findById(id).then(function(user) {
      done(null, user);
    }).catch(function(error) {
      done(error);
    });
});



/**
 * Sign in with Google.
 */
 passport.use(new GoogleStrategy(secrets.google, function(req, accessToken, refreshToken, profile, done) {
    try{
        done(null,user);
    } catch(err){
        done(err);
    }
  }));