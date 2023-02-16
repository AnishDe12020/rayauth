import mail from "nodemailer"
import { EMAIL, PASS } from "../../src/constant";

export function sendMail(email: string, key: string) {
    console.log(EMAIL, PASS)
    const transporter = mail.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL,
          pass: PASS,
        }
      });
      
      const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'RayAuth secret key split',
        text: `Here is your rayauth secret key don't share it lol \n ${key}`
      };
      
      transporter.sendMail(mailOptions, function(error:any, info:any){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}