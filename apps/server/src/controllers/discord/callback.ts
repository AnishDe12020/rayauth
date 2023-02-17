import passport from "passport";
import { Router } from "express";

const dcallback: Router = Router();

dcallback.get(
  "/auth/discord/callback",
  passport.authenticate("discord", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    res.redirect("/");
  }
);

export default dcallback as Router;
