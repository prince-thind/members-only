const Message = require('../models/message');

exports.message_list = function (req, res, next) {
  Message.find({}).exec(function (err, messages) {
    if (err) return next(err);
    res.render('index', { title: 'Members Only', messages });
  });
};

exports.message_create_get = function (req, res, next) {
  res.send('Not Implemented: message create get');
};

exports.message_create_post = function (req, res, next) {
  res.send('Not Implemented: message create post');
};
