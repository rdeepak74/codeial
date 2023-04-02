const nodeMailer= require('../config/nodemailer');

module.exports.forgotPasswordMail = (user, req,res)=>{
    // console.log(req.protocal);
    const resetLink = `http://localhost:8000/users/reset-password-token/${user.resetToken}`;

    nodeMailer.transporter.sendMail({
        from:'deepakmegtech.com',
        to: user.email,
        subject: 'Reset your password',
        text: `Please click on the following link to reset your password: ${resetLink}`
    }, (err,info)=>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}