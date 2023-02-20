import env from "dotenv";
env.config();
import express, { Express, Request, Response } from "express";
import session from "express-session";
import { DB1, DB2, DB3, HOST, PORT } from "./constant";
import cors from "cors";
import { initGithub } from "./auth/github";
import callback from "./controllers/github/callback";
import login from "./controllers/github/login";
import { initdiscord } from "./auth/discord";
import dlogin from "./controllers/discord/login";
import dcallback from "./controllers/discord/callback";
import { initgoogle } from "./auth/google";
import glogin from "./controllers/google/login";
import gcallback from "./controllers/google/callback";
import proejcts from "./controllers/projects";
import cookieParser from "cookie-parser";
import { setQuery } from "./middleware/query";
import { userController } from "./controllers/user/getUser";
import { prisma } from "../lib/db";
import { connect } from "mongoose";
import { KeyModel } from "./interfaces/key";

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
app.use("/projects", proejcts);

app.get("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Hello");
});

app.post("/delete-user", async (req: Request, res: Response) => {
  const emailId = req.body.email;

  console.log(emailId);

  await prisma.user.delete({
    where: {
      email: emailId,
    },
  });

  const mongo1 = await connect(DB1);
  const key1 = new KeyModel({ email: emailId });
  await key1.deleteOne();
  await mongo1.disconnect();

  const mongo2 = await connect(DB2);
  const key2 = new KeyModel({ email: emailId });
  await key2.deleteOne();
  await mongo2.disconnect();

  const mongo3 = await connect(DB3);
  const key3 = new KeyModel({ email: emailId });
  await key3.deleteOne();
  await mongo3.disconnect();

  res.send("User deleted");
});

app.listen(Number(PORT), HOST, () => {
  console.log("Server up and running;");
  console.log(process.env.PORT);
});

module.exports = app;
