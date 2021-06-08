 const Comment = require('../models/comment');
const Post=require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');
const Like = require('../models/like');
/*
module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                //handle error
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}
*/
//above function using async await
module.exports.create=async function(req,res){
    try{
    let post =await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
                //handle error
                post.comments.push(comment);
                post.save();
                comment = await comment.populate('user','name email').execPopulate();
                //commentsMailer.newComment(comment);

                //creating a queue for worker
                let job=queue.create('emails',comment).save(function(err){
                    if(err){
                        console.log('error in sending to the queue',err);
                    }
                    console.log('job enqueued',job.id);
                });
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            comment:comment
                        },
                        message:"Post created"
                    });
                }
                req.flash('success','Comment published!');
                res.redirect('/');
        }
    }catch(err){
        console.log('Error',err);
        return;
    }
}

//delete a comment
/*module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();
            
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}*/

//above function using async await
module.exports.destroy =async function(req,res){
    try{
        let comment =await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();
            
            let post = Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});

            //destroy the associated likes for this comment
            await Like.deleteMany({likeable:comment._id,onModel:'Comment'});
                return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('Error',err);
        return;
    }
}