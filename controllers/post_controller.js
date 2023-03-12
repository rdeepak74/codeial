const Postdb = require('../models/post');
const Comment = require('../models/comment');
module.exports.create =async function(req,res){
    
    try{
        const Post = await Postdb.create({
            content:req.body.content,
            user: req.user._id
        });
        req.flash('success','Post Pulblished');
        res.redirect('/');
    }catch(err){
        req.flash('error',err);
      return res.redirect('/');
    }
}

module.exports.destroy = async function(req,res){
    try{
        const postremove = await Postdb.findById(req.params.id);
        //.id means converting the object id into string
        if(postremove.user==req.user.id){
            postremove.remove();

            const Commentdelete = await Comment.deleteMany({
                postremove:req.params.id
            });
            req.flash('success','Post and associated comments deleted');
            return res.redirect('/');
        }else{
            req.flash('error','You cannot deleted this post');
            return res.redirect('/');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('/');
    }
}