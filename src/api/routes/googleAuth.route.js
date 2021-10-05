const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const authController = require('../controllers/auth.controller');


router.get('/',passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/callback',passport.authenticate('google', { failureRedirect: '/error' }),
);



module.exports = router;