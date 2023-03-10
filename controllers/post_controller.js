const Postdb = require('../models/post');

module.exports.create =async function(req,res){
    
    try{
        const Post = await Postdb.create({
            content:req.body.content,
            user: req.user._id
        })
        res.redirect('/');
    }catch(err){
        console.log(err+"Error occured");
      return res.redirect('/');
    }
}