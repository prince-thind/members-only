const {body,validatonResult}=require('express-validator')

exports.user_create_get = function (req, res, next) {
  res.render('sign_in',{title:'Sign In'})
};

exports.user_create_post = function (req, res, next) {
  res.send('Not Implemented: user create post');
};

exports.user_login_get = function (req, res, next) {
  res.send('Not Implemented: user login get');
};
exports.user_login_post = function (req, res, next) {
  res.send('Not Implemented: user login post');
};
