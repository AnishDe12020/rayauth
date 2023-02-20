import passport from "passport";
import { Router } from "express";

const dcallback: Router = Router();

import { handleProviderCallback } from "../../helpers/handleProviderCallback";

dcallback.get(
  "/auth/discord/callback",
  passport.authenticate("discord", { failureRedirect: "/login" }),
  async function (req, res) {
    const rawUser = req.user as any;

    handleProviderCallback(
      res,
      rawUser.email,
      rawUser.username,
      rawUser.avatar
    );
  }
);

export default dcallback as Router;
