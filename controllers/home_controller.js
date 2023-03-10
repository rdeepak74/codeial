const Post= require('../models/post');
module.exports.home= async function(req,res){
    // console.log(req.cookies);
    // Populate the each post
    try{
        const postview = await Post.find().populate('user');

        return res.render('home',{
            title:"Home",
            posts: postview
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