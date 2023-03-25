const Post= require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index= async function(req,res){

    const postview = await Post.find()
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comment',
            populate:{
                path:'user'
            }
        });

    return res.json(200,{
        message:"List of Posts",
        post:postview
    })
}


module.exports.destroy = async function(req,res){
    try{
        const postremove = await Post.findById(req.params.id);
        //.id means converting the object id into string
        if(postremove.user==req.user.id){
            postremove.remove();

            const Commentdelete = await Comment.deleteMany({
                postremove:req.params.id
            });

            // if(req.xhr){
            //     return res.status(200).json({
            //         data:{
            //             post_id:req.params.id
            //         },
            //         message:"Post deleted"
            //     })
            // }

            // req.flash('success','Post and associated comments deleted');
            return res.json(200, {
                message:"Post and associated comments deleted"
            });
        }else{
            // req.flash('error','You cannot deleted this post');
            // return res.redirect('/');

            return res.json(401, {
                message: 'You cannot delete this post'
            });
        }
    }catch(err){
        // req.flash('error',err);
        return res.json(500,{
            message:"Internal server error"
        });
    }
}