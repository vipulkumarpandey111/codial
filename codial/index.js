const express=require('express');
//setup cookie 
const cookieParser = require('cookie-parser');
const app=express();
const port = 8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie and authentication
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
//to continue sign in session even after restarting server
const MongoStore = require('connect-mongodb-session')(session);
const sassMiddleware = require('node-sass-middleware');
const flash=require('connect-flash');
const custoMware = require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());
//use cookie parser
app.use(cookieParser());

app.use(express.static('./assets'));
//make the uploads path available to browser
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);
//extract style and scripts from subpages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//use express router which by default fetches index

//set up view engine and views folder respectively
app.set('view engine','ejs'); 
app.set('views','./views');

//middleware to encrypt session cookie
//mongo store is used to store session cookie in the db
app.use(session({
    name:'codial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
        //to keep signed in even on restarting the server
       {
           mongooseConnection:db,
           autoRemove:'disabled'
       },
       function(err){
           console.log(err||'connect-mongodb setup ok');
       }

    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(custoMware.setFlash);
//it by default fetches index.js in routers folder
app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    } 
    console.log(`Server is running on port: ${port}`);
});