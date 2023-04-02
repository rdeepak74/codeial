const express= require('express');
const router= express.Router();
const passport = require('passport');

const userController=require('../controllers/users_controller');
// const postController=require('../controllers/post_controller');
router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
// router.get('/forgot-password',userController.forgotPassword);
// router.post('/reset-password',userController.resetPasswordMail);
// router.get('/reset-password-token/:token',userController.resetPasswordTokken);
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userController.crateSession);


// router.get('/post',postController.post);
router.get('/sign-out',userController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureFlash:'/users/sign-in'}),userController.crateSession);
module.exports=router;