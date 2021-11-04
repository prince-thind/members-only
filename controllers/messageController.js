const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.message_list = function (req, res, next) {
  Message.find({}).exec(function (err, messages) {
    if (err) return next(err);
    res.render('index', { title: 'Members Only', messages });
  });
};

exports.message_create_get = function (req, res, next) {
  if (!req.user) {
    res.redirect('/login');
    return;
  }
  res.render('message_create', { title: 'create message' });
};

exports.message_create_post = [
  body('messageTitle')
    .trim()
    .escape()
    .isAlpha()
    .withMessage(' TItle must contain only Alphabetical Characters')
    .isLength({ min: 2, max: 20 })
    .withMessage('Length of message title must be between 2 to 20'),
  body('messageText')
    .trim()
    .escape()
    .isAlpha()
    .withMessage('Message  text must contain only Alphabetical Characters')
    .isLength({ min: 2, max: 20 })
    .withMessage('Length of message must be between 2 to 200'),
  function (req, res, next) {
    if (!req.user) {
      res.redirect('/login');
      return;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('message_create', {
        title: 'Create Message',
        errors: errors.array(),
      });
      return;
    }
    const message = new Message({
      title: req.body.messageTitle,
      text: req.body.messageText,
      user: req.user.id,
    });
    message.save((err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  },
];
