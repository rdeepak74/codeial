const express= require('express');

const router = express.Router();
// console.log('router loaded');
const homeConstroller = require('../controllers/home_controller');

router.get('/',homeConstroller.home);
router.use('/users',require('./users'));
router.use('/post',require('./post'));
// router.use('/user',require('./user'));
module.exports=router;