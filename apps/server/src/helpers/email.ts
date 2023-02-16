import mail from "nodemailer";
import { EMAIL, PASS } from "../../src/constant";

export function sendMail(email: string, key: string) {
  console.log(EMAIL, PASS);
  console.log(email);
  var transporter = mail.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5738767ef00673",
      pass: "529701e3537953",
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "RayAuth secret key split",
    text: `Here is your rayauth secret key don't share it lol \n ${key}`,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
