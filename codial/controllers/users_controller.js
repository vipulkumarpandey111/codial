const User=require('../models/user');
const fs = require('fs');
const path = require('path');

//open profile page when signed in correctly
module.exports.profile = function(req,res){
    /*without passport
    if(req.cookies.user_id){
        //if user present..show its profile page(find by user id)
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title:"User Profile",
                    user:user
                })
            }
            else{//redirect to sign in page
                return res.redirect('/users/sign-in');
            }
        });
    }else{
        return res.redirect('/users/sign-in');
    }*/
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'User Profile',
            profile_user:user
        })
    });
 }

 //to update profile
 module.exports.update =async function(req,res){
    //  if(req.user.id == req.params.id){
    //      User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back'); 
    //      });
    //  }
    //  else{
    //      //if someone is trying to fiddle with other's profile
    //      return res.status(401).send('Unauthorized');
    //  }

    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('********Multer Error:',err)
                }
                //console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    //saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }catch{
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }
 }

 module.exports.signUp = function(req,res){
     if(req.isAuthenticated()){
        return res.redirect('/users/profile');
     }
    return res.render('user_sign_up',{
        title:"Codial | Sign Up"
    });
 }

 //render sign in page
 module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
      return  res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codial | Sign In"
    });
 }

 //get the sign up data
 module.exports.create = function(req,res){
     if(req.body.password!=req.body.confirm_password){
         return res.redirect('back');
     }
     User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing up');
    return}
    if(!user){
        User.create(req.body,function(err,user) {
            if(err){console.log('error in creating while signing up');
        return;}
        return res.redirect('/users/sign-in');

        })
    }else{
        return res.redirect('back');
    }
     });
 }

 //get the sign in data
 module.exports.createSession = function(req,res){
   //steps to authenticate
    //find the user
  //without using passport for authentication
  /* User.findOne({email:req.body.email},function(err,user){
       if(err){
           console.log('error in finding user while signing in'); 
           return
       }
        //handle user found
       if(user){
           //handle password which doesn't match
           if(user.password!=req.body.password){
               return res.redirect('back');
           }
           //handle session creation
           res.cookie('user_id',user.id);
           return res.redirect('/users/profile');
       }else{
            //handle user not found
           return res.redirect('back');
       }
   });*/
   req.flash('success','Logged in Successfully');
  return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','Logged out Successfully');
    return res.redirect('/');
}