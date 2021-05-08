const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');


//part which sends the emails and defines how the communication is going to take place
let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'vipulkumarpandey111',
        pass:'7378220532'
    }
});

//used to define an HTML email defined inside views
let renderTemplate = (data,relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('error in rendering template',err);return;}

            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}