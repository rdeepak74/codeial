const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const jwt= require('jsonwebtoken');
const forgotMailer = require('../mailers/forgotpassword_mailer');
module.exports.profile = async function(req,res){
    try{
        const userview = await User.findById(req.params.id);
        return res.render('user_profile',{
            title:"User Profile",
            profile_user:userview
        });
    }catch(err){
        console.log(err+"Error occur");
        return;
    }
    
}

module.exports.update = async function(req,res){
    if(req.user.id== req.params.id){
        try{
            // const userupdate = await User.findByIdAndUpdate(req.params.id, req.body);
            const userupdate = await User.findById(req.params.id);
            User.uploadAvatar(req,res, function(err){
                    if(err){
                        console.log('****Multer error',err);
                    }
                    userupdate.name=req.body.name;
                    userupdate.email=req.body.email;

                    if(req.file){
                        // console.log('test');
                        
                        
                        // console.log('filepresent', filepresent);
                        if(userupdate.avatar){
                            const filepresent= path.join(__dirname,'..',userupdate.avatar);
                            // console.log('test2');
                            if(fs.existsSync(filepresent)){

                                fs.unlinkSync(filepresent);

                            }
                        userupdate.avatar=User.avatarPath + '/' + req.file.filename; 

                        }else{
                            // console.log('test3');
                        userupdate.avatar=User.avatarPath + '/' + req.file.filename; 

                        }

                    }
                    userupdate.save();
                    return res.redirect('/');

            });
        }catch(err){
            console.log(err+"Error occur");
            return res.redirect('/');
        }
       

    }else{
        return res.status(401).send('Unauthorized')
    }
}

//Rendering Sign In page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

//Rendering Sign Up page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

//get the sign in data

module.exports.create =function(req,res){
    // console.log(req.body);
    if(req.body.password!= req.body.confirm_password){
        // console.log('1');
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        // console.log('1');
        if(err){console.log('error in finding user in signing up'); return}

        if(!user)
        {
            User.create(req.body, function(err,user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}

//sign in and create session for the user
module.exports.crateSession = function(req, res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        
        if(err){
            return  res.redirect('/');
        }
        
    });
    // req.logout();
    req.flash('success','You have logged out');
    return res.redirect('/');
}


// Forgot password
module.exports.forgotPassword=function(req,res){
    return res.render('user_forgot_password',{
        title: "Forgot Password"
    });
}

module.exports.resetPasswordMail= async function(req,res){
    
    const emailbody = req.body.email;

    let userdata= await User.findOne({email:emailbody});

    if(!userdata){
        return res.status(400).send('Email not found');
    }

    const resetToken = jwt.sign({email:userdata.email},'codeial',{expiresIn:'1h'});
    userdata.resetToken=resetToken;
    userdata.resetTokenExpiration=Date.now() + 3600000;//Token will expires in 1 hour
   await userdata.save();
    try{
    userdata= await userdata.populate();
    forgotMailer.forgotPasswordMail(userdata);
    //    console.log("User Date :----",userdata)
       return res.redirect('/users/sign-in');
    }catch(err){
        console.log("Error.....", err);
        return res.redirect('/users/sign-in');
    }

//     
}

module.exports.resetPasswordTokken= function(req,res){
    return res.render('user_forgot_password_token',{
        title: "Reset Password"
    });
}