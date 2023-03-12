const Comment = require('../models/comment')
const Post = require('../models/post');

module.exports.create =async function(req,res){
    try{

        const PostId = await Post.findById(req.body.post);
        if(PostId){
            const CommentSubmit = await Comment.create({
                content:req.body.content,
                post: req.body.post,
                user:req.user._id
            })
            PostId.comment.push(CommentSubmit);
            PostId.save();  
            res.redirect('/');  
        }

    }catch(err){
        console.log(err+"Error gets");
        res.redirect('/');
    }

}

module.exports.delete= async function(req,res){
    try{
        const commentdelete = await Comment.findById(req.params.id);
        if(commentdelete.user==req.user.id){
            let postid = commentdelete.post;
            commentdelete.remove();
            const postdelete= await Post.findByIdAndUpdate(postid,{$pull:{comment:req.params.id}});
            return res.redirect('/');
        }else{
            return res.redirect('/');
        }
    }catch(err){
        console.log(err+"Error gets");
        res.redirect('/');
    }

}