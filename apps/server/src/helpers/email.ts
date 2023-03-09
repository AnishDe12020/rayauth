// import mail from "@sendgrid/mail";

// export function sendMail(email: string, key: string) {
//   mail.setApiKey(process.env.SENDGRID || "");

//   const msg = {
//     to: email,
//     from: "rayauthhq@gmail.com",
//     subject: "Rayauth 2fa key",
//     text: `This is your private key keep it safe lol \n ${key}`,
//   };

//   mail.send(msg, false, (err, res) => {
//     if (err) {
//       console.log(err);
//       console.log(err);
//       return;
//     }
//     console.log(res);
//     console.log("sent mail");
//   });
// }

import {
  Configuration,
  EmailsApi,
} from "@elasticemail/elasticemail-client-ts-axios";

const config = new Configuration({
  apiKey: process.env.ELASTIC_EMAIL,
});

const emailsApi = new EmailsApi(config);

export const sendMail = (email: string, key: string) => {
  emailsApi
    .emailsPost({
      Recipients: [{ Email: email }],
      Content: {
        Body: [
          {
            ContentType: "PlainText",
            Charset: "utf-8",
            Content: `This is your recovery key keep it safe \n ${key}`,
          },
        ],
        From: "RayAuth <contact@rayauth.com>",
        Subject: "Your RayAuth recovery key",
      },
    })
    .then((response: any) => {
      console.log("email sent", response.data);
    })
    .catch((error: any) => {
      console.error("failed to send email", error);
    });
};
