var express = require('express');
var router = express.Router();
var passport = require('passport');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

/* GET users listing. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('user')
});

module.exports = router;
