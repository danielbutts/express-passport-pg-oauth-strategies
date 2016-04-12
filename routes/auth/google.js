var express = require('express');
var router = express.Router();
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require('passport');
var knex = require('../../db/knex');
var User = require('./auth_helper');

router.get('/google',
  passport.authenticate('google', { scope: [
    'profile',
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile.emails);
    User.findOrCreate('google', profile.id, cb, {
      email: profile.emails[0].value
    });
  }
));


module.exports = router;
