import passport from "passport";
import { Router } from "express";

const callback: Router = Router();

import { handleProviderCallback } from "../../helpers/handleProviderCallback";

callback.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async function (req, res) {
    const rawUser = req.user as any;

    handleProviderCallback(
      res,
      rawUser.emails[0].value,
      rawUser.displayName,
      rawUser.photos[0].value
    );
  }
);

export default callback as Router;
