const express = require('express');
const router = express.Router();
const user_controller=require('../controllers/userController');
const message_controller=require('../controllers/messageController');

/* GET home page. */
router.get('/',message_controller.message_list);

router.get('/create/message',message_controller.message_create_get);
router.post('/create/message',message_controller.message_create_post);

router.get('/create/user',user_controller.user_create_get);
router.post('/create/user',user_controller.user_create_post);

router.get('/login',user_controller.user_login_get);
router.post('/login',user_controller.user_login_post);

router.get('/logout',user_controller.user_logout_get);

router.get('/join',user_controller.user_join_get);
router.post('/join',user_controller.user_join_post);


module.exports = router;
