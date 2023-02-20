const express= require('express');
const router= express.Router();

const userController=require('../controllers/users_controller');
const postController=require('../controllers/post_controller');
router.get('/profile',userController.profile);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);
router.get('/post',postController.post);
module.exports=router;