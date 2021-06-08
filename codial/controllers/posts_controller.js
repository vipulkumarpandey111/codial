const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

/*module.exports.create = function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log('error in creating a post');
            return;
        }
        return res.redirect('back');
    });
} */
//above function using async await
module.exports.create =async function(req,res){
    try{
       let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created!"
            });
        }

        req.flash('success','Post published!');
        return res.redirect('back');
    }
    catch(err){
        console.log('Error',err);
        req.flash('error',err);
        return res.redirect('back');
    }
}
//delete post and it's comments
/*module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        //.id converts object id into string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}*/

//above function using async await
module.exports.destroy =async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        if(post.user == req.user.id){

            //delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable:post,onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.comments}})

            post.remove();
         await Comment.deleteMany({post:req.params.id});
         
         if(req.xhr){
             return res.status(200).json({
                 data:{
                     post_id:req.params.id
                 },
                 message:"Post deleted"
             });
         }
         
         req.flash('success','Post deleted!');
         return res.redirect('back');
        }else{
            req.flash('error','This post cannot be deleted!');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('Error',err);
        req.flash('error',err);
        return res.redirect('back');
    }
} 