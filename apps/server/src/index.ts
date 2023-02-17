import env from "dotenv";
env.config();
import express, { Express, Request, Response } from "express";
import session from "express-session";
import { HOST, PORT } from "./constant";
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
const app: Express = express();

initGithub();
initdiscord();
initgoogle();
app.use(cors());
app.use(
  session({
    secret: "xyz",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 600000 },
  })
);
app.use(cookieParser());
app.use(setQuery());
app.use(express.json());
app.use(login);
app.use(callback);

app.use(dlogin);
app.use(dcallback);

app.use(glogin);
app.use(gcallback);

app.use("/projects", proejcts);

app.get("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Hello");
});

app.listen(Number(PORT), HOST, () => {
  console.log("Server up and running;");
  console.log(process.env.PORT);
});

export default app;
