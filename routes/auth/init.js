var passport = require('passport');
var knex = require('../../db/knex');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  if (!user) { return done(null, false); }
  if (user) { return done(null, user); }
});
