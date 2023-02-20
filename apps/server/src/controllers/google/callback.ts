import passport from "passport";
import { Router } from "express";

const gcallback: Router = Router();

import { handleProviderCallback } from "../../helpers/handleProviderCallback";

gcallback.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
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

export default gcallback as Router;
