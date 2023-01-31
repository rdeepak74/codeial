const express= require('express');

const router = express.Router();
// console.log('router loaded');
const homeConstroller = require('../controllers/home_controller');

router.get('/',homeConstroller.home);
module.exports=router;