const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const authController = require('../controllers/auth.controller');

router.get('/',authController.getAuthScreenView);

router.get('/success', authController.getLoginSuccess);

router.get('/error', authController.getLoginFailure);

module.exports = router;