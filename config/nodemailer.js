const nodemailer = require('nodemailer');
const ejs= require('ejs');
const path = require('path');



let transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth:{
        user:'deepakmegtech',
        pass:'mzhzhvoqnkgoiexi'
    }
});

let rendertemplate = (data, relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers', relativePath),
        data,
        function(err, templete){
            if(err){
                console.log('error in rendering templete');
                return;
            }
            mailHTML=templete;
        }
    )

    return mailHTML;
}

module.exports={
    transporter:transporter,
    rendertemplate:rendertemplate
}