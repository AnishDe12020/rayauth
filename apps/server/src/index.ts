import env from "dotenv";
env.config();
import express, { Express, Request, Response } from "express";
import session from "express-session";
import { DB1, DB2, DB3, HOST, PORT } from "./constant";
import cors from "cors";
import { initGithub } from "./auth/github";
import callback from "./controllers/github/callback";
import * as secrets from 'secrets.js-grempe';
import login from "./controllers/github/login";
import { initdiscord } from "./auth/discord";
import dlogin from "./controllers/discord/login";
import arr from "hex-array"
import { Keypair } from "@solana/web3.js";
import dcallback from "./controllers/discord/callback";
import { initgoogle } from "./auth/google";
import glogin from "./controllers/google/login";
import gcallback from "./controllers/google/callback";
import proejcts from "./controllers/projects";
import gasless from "./controllers/gasless";
import cookieParser from "cookie-parser";
import { setQuery } from "./middleware/query";
import { userController } from "./controllers/user/getUser";
import { prisma } from "../lib/db";
import { connect } from "mongoose";
import { KeyModel } from "./interfaces/key";
import { deviceShare } from "./controllers/user/deviceKey";
import { getPrivateKey } from "./controllers/user/constructKey";
import { getSessionKey } from "./controllers/keys";
import { createSessionKey,updateSessionKey } from "./controllers/keys";
const app: Express = express();

initGithub();
initdiscord();
initgoogle();
app.use(cors());
app.use(setQuery());
app.use(
  session({
    secret: "xyz",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 600000 },
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(login);
app.use(callback);

app.use(dlogin);
app.use(dcallback);

app.use(glogin);
app.use(gcallback);

app.get("/user", userController());
app.get("/user/session-key", getSessionKey())
app.post("user/session-key", createSessionKey())
app.patch("/user/session-key/revoke", updateSessionKey())
app.use("/projects", proejcts);
app.use("/gasless", gasless);
app.post("/user/device-share", deviceShare());
app.get("/", (req: Request, res: Response) => {
  console.log(req.body);
  console.log("req sent");
  res.send("Hello");
});
app.get("/key", (req, res) => {

 const key = Keypair.generate()
 const hex = arr.toString(key.secretKey)
 const share = secrets.share(hex, 3, 2)
 console.log(share)

 const combine = secrets.combine([share[0], share[1]])
 const newkey = arr.fromString(combine)
 console.log("old",key.secretKey)


 console.log("new", newkey)
 const secret = Keypair.fromSecretKey(newkey)
 console.log(secret)
  console.log(req.url)
  res.send(
  "ok"
  )
})
app.get("/delete-user/:email", async (req: Request, res: Response) => {
  const emailId = req.params.email;

  const mongo1 = await connect(DB1);
  await KeyModel.deleteOne({ email: emailId });
  await mongo1.disconnect();

  const mongo2 = await connect(DB2);
  await KeyModel.deleteOne({ email: emailId });
  await mongo2.disconnect();

  const mongo3 = await connect(DB3);
  await KeyModel.deleteOne({ email: emailId });
  await mongo3.disconnect();

  const user = await prisma.user.findUnique({
    where: {
      email: emailId,
    },
  });

  if (user) {
    await prisma.user.delete({
      where: {
        email: emailId,
      },
    });
  }

  res.json("User deleted");
});
app.get("/private-key", getPrivateKey());
app.listen(Number(PORT), HOST, () => {
  console.log("Server up and running;");
  console.log(process.env.PORT);
  console.log(process.env.ELASTIC_EMAIL);
});

module.exports = app;
