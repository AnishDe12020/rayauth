import env from "dotenv";
env.config();
import express, { Express, Request, Response } from "express";
import session from "express-session";
import { BASE_URL, DB1, DB2, DB3, FRONTEND_URL, HOST, PORT } from "./constant";
import cors from "cors";
import { initGithub } from "./auth/github";
import callback from "./controllers/github/callback";
import * as secrets from "secrets.js-grempe";
import login from "./controllers/github/login";
import { initdiscord } from "./auth/discord";
import dlogin from "./controllers/discord/login";
import arr from "hex-array";
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
import { createSessionKey, updateSessionKey } from "./controllers/keys";
import { getCombinedKey } from "./helpers/getAuthKey";
const app: Express = express();

console.log("base url: ", BASE_URL);
console.log("frontend url: ", FRONTEND_URL);

initGithub();
initdiscord();
initgoogle();
app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
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
app.get("/user/session-key", getSessionKey());
app.post("user/session-key", createSessionKey());
app.patch("/user/session-key/revoke", updateSessionKey());
app.use("/projects", proejcts);
app.use("/gasless", gasless);
app.get("/user/device-share", deviceShare());
app.get("/", (req: Request, res: Response) => {
  console.log(req.body);
  console.log("req sent");
  res.send("Hello");
});
app.get("/key", async (req, res) => {
  const shareOne =
    "802cd2da65a667eb916dbf9f2b367b074171b3710aee610a5dc8945dbea8e4fe934a5becae824a517a2da2ad71859fa39fa1555f26b280d2b74bf179c680f78f50c8d02f9324184f02bb5e3a402ee3aa989";
  const shareTwo = await getCombinedKey("apoorvcodes381@gmail.com");
  const combine = secrets.combine([shareOne, shareTwo]);
  const newkey = arr.fromString(combine);

  console.log("new", newkey);
  const secret = Keypair.fromSecretKey(newkey);
  console.log(secret);
  console.log(req.url);
  res.send("ok");
});
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
