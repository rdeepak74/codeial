const passport= require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for  google login 
passport.use(new googleStrategy({
            clientID:"343735384547-r7bnrvfjdt8scuu60oath9abm04145nj.apps.googleusercontent.com",
            clientSecret: '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',
            callbackURL: 'http://localhost:8000/users/auth/google/callback'
        },
        function(accessToken, refreshToken,profile,done){

            //find a user
            User.findOne({email:profile.emails[0].value}).exec(function(err,user){
                if(err){
                    console.log('error in google strategy-passport',err);
                    return;
                }

                console.log(profile);

                if(user){
                    // if found user, set this user as req.user
                    return done(null,user);
                }else{

                    // if not found create a user and then set it a req.user
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    }, function(err,user){
                        if(err){
                            console.log('error in google strategy-passport',err);
                            return;
                        }

                        return done(null,user);
                    });
                }
            });
        }

));


module.exports=passport;