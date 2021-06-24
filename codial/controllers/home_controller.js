 const Post=require('../models/post');
 const User = require('../models/user');
//trying to commit
 /*module.exports.home = function(req,res){
   ->commented inside comment
    //console.log(req.cookies);
    //res.cookie('user_id',25)
   /* Post.find({},function(err,posts){
    return res.render('home',{
        title:"Codial | Home",
        posts:posts
    });
    
    });<-
    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        //to fetch list of users(line 25,)
        User.find({},function(err,users){
            return res.render('home',{
                title:"Codial | Home",
                posts:posts,
                all_users:users
            });
        });
        
    })

    //return res.end('<h1>Express is up for Codial</h1>')
 }*/

 /*alternative function for above function using async await*/
module.exports.home = async function(req,res){
try{
   let posts=await Post.find({})
   .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        },
        populate:{
            path:'likes'
        }

    }).populate('likes'); 
    let users=await User.find({});
    return res.render('home',{
        title:"Webcon | Home",
        posts:posts,
        all_users:users
    });
}catch(err){
    console.log('Error',err);
    return;
}
}

 //module.exports.actionName = function(req,res){}