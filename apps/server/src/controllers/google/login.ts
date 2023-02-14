import passport from "passport";
import { Router } from "express";

const glogin: Router = Router();

glogin.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

export default glogin as Router;
