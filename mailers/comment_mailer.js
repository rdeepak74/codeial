const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment)=>{
    // console.log('inside comment mailer');
    let htmlString  = nodeMailer.renderTemplate({comment:comment},'comments/comment_mailer.ejs');

    nodeMailer.transporter.sendMail({
        from:'deepakmegtech.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
    }, (err,info)=>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}