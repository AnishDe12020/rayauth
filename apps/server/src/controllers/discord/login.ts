import passport from "passport";
import { Router } from "express";

const dlogin: Router = Router();

dlogin.get(
  "/auth/discord",
  passport.authenticate("discord", { scope: ["email", "identify"] })
);

export default dlogin as Router;
