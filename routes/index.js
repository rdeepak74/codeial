const express= require('express');

const router = express.Router();
// console.log('router loaded');
const homeConstroller = require('../controllers/home_controller');

router.get('/',homeConstroller.home);
router.use('/users',require('./users'));
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));
// router.use('/user',require('./user'));
router.use('/likes', require('./likes'));
router.use('/api', require('./api'));
module.exports=router;
