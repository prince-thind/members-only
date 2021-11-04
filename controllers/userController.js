const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.user_create_get = function (req, res, next) {
  res.render('sign_in', { title: 'Sign In' });
};

exports.user_create_post = [
  customSanitize('firstName'),
  customSanitize('lastName'),
  customSanitize('username'),
  body('password')
    .isAscii()
    .withMessage('Do not use special characters in password')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password length must be between 8 and 20'),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('sign_in', { title: 'Sign In', errors: errors.array() });
      return;
    }
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) return next(err);
      const user = new User({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.username,
        password: hashedPassword,
      });
      user.save((err) => {
        if (err) return next(err);
        res.redirect('/');
      });
    });
  },
];

exports.user_login_get = function (req, res, next) {
  res.render('log_in', { title: 'log in' });
};


exports.user_login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
});

exports.user_logout_get = function (req, res, next) {
  req.logout();
  res.redirect('/');
};

function customSanitize(fieldName) {
  return body(fieldName)
    .trim()
    .escape()
    .isAlpha()
    .withMessage(fieldName + ' must contain only Alphabetical Characters')
    .isLength({ min: 2, max: 20 })
    .withMessage('Length of ' + fieldName + ' must be between 2 to 20');
}
