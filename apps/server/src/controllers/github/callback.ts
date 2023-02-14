import passport from "passport";
import { Router } from "express";

const callback: Router = Router();

callback.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (_, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

export default callback as Router;
