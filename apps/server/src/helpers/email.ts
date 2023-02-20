
import mail from "@sendgrid/mail"

export function sendMail(email: string, key: string) {
  mail.setApiKey(process.env.SENDGRID || "");

  const msg = {
    to: email,
    from: 'rayauthhq@gmail.com',
    subject: 'Rayauth 2fa key',
    text: `This is your private key keep it safe lol \n ${key}`
  };

  mail.send(msg, false ,() => {
    console.log("sent mail")
  });

}
