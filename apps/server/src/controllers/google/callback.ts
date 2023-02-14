import passport from "passport";
import { Router } from "express";

const gcallback: Router = Router();

gcallback.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (_, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

export default gcallback as Router;
