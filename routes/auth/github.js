var express = require('express');
var router = express.Router();
var GitHubStrategy = require('passport-github').Strategy;
var passport = require('passport');
var knex = require('../../db/knex');
var User = require('./auth_helper');

router.get('/github',
  passport.authenticate('github', { scope: ['profile'] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate('github', profile.id, cb);
    }
  ));


module.exports = router;
