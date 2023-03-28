const Comment = require('../models/comment')
const Post = require('../models/post');
const commentMailer = require('../mailers/comment_mailer');
module.exports.create =async function(req,res){
    try{

        const PostId = await Post.findById(req.body.post);
        if(PostId){
            let CommentSubmit = await Comment.create({
                content:req.body.content,
                post: req.body.post,
                user:req.user._id
            })
            PostId.comment.push(CommentSubmit);
            PostId.save();  

            CommentSubmit= await CommentSubmit.populate('user','name email');
            console.log(CommentSubmit);
            commentMailer.newComment(CommentSubmit);

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:CommentSubmit
                    },
                    message:"Comment Created"
                })
            }
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

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message:"Comment deleted"
                })
            }
            return res.redirect('/');
        }else{
            return res.redirect('/');
        }
    }catch(err){
        console.log(err+"Error gets");
        res.redirect('/');
    }

}