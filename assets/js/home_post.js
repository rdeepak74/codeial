{
    // Method to submit the form data for new post using AJAX
   let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    // console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost(' .delete-post-button', newPost);

                    // CHANGE :: enable the functionality of the toggle like button on the new comment
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post Pulblished",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function(err){
                    console.log(err.responseText);
                }
            })
        });
   }

   // method to create a post in DOM
   let newPostDom = function(post){
    console.log(post.user);
        return $(`<li id="post-${ post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button" href="/post/delete/${ post._id}">X</a>
                        </small>
                       
                        ${post.content}
                        <br>
                         ${post.user.name}
                         <br>
                        <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes
                                </a>
                            
                        </small>
                    </p>
                    <div id="comment-div">
                        
                        <form action="/comment/create" method="POST">
                            <input type="text" name="content" placeholder="Type here comment..." required>
                            <input type="hidden" name="post" value="${ post._id }">
                            <input type="submit" value="Comment">
                        </form>
                        
                
                        <div id="post-comment-list">
                            <ul id="post-comment-${post._id}">
                               
                            </ul>
                
                        </div>
                    </div>
                </li>`)
   }

   let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                // alert(1);
                $(`#post-${data.data.post_id}`).remove();
                new Noty({
                    theme: 'relax',
                    text: "Post and associated comments deleted",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },error: function(err){
                console.log(err.responseText);
            }


        });
    });
   }

   let createComment = function(){
        let newCommentFrom = $('#new-comment');
        newCommentFrom.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url: '/comment/create',
                data:newCommentFrom.serialize(),
                success: function(data){
                    console.log(data);
                    let newComment = newCommentDom(data.data.comment);
                    $('#post-comment-list>ul').prepend(newComment);
                    deleteComment(' .delete-comment-button', newComment);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment Pulblished",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function(err){
                    console.log(err.responseText);
                }
            })
        })
   }

   let newCommentDom = function(comment){
        return $(`<li id="comment-${comment._id}">
        <p>
            
                <small>
                    <a class="delete-comment-button" href="/comment/delete/${comment._id}">X</a>
                </small>
               
            ${ comment.content}<br>
            ${ comment.user.name}<br>
            <small>
                            
            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                0 Likes
            </a>
        
        </small>
        </p>
    </li>`)
   }
   
   let deleteComment = function(deletelink){
        $(deletelink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deletelink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Comments deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function(err){
                    console.log(err.responseText);
                }
            });
        });
   }
   createPost();
   deletePost(' .delete-post-button');
   createComment();
   deleteComment(' .delete-comment-button');
}