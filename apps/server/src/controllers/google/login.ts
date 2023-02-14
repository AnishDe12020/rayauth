import passport from "passport";
import { Router } from "express";

const glogin: Router = Router();

glogin.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

export default glogin as Router;
