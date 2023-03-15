const Post= require('../models/post');
const User = require('../models/user');
module.exports.home= async function(req,res){
    // console.log(req.cookies);
    // Populate the each post
    try{
        const postview = await Post.find()
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comment',
            populate:{
                path:'user'
            }
        });
        const userview = await User.find();
        return res.render('home',{
            title:"Home",
            posts: postview,
            all_users:userview
        });
    }catch(err){
        console.log(err+"Error gets")
    }
    
    // Post.find({}).populate('user').exec(function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // })

}