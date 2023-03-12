const User = require('../models/user');

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
            const userupdate = await User.findByIdAndUpdate(req.params.id, req.body);
            return res.redirect('/');
        }catch(err){
            console.log(err+"Error occur");
            return;
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