import passport from "passport";
import { Router } from "express";
import { setupKey } from "../../helpers/setupKey";

import { prisma } from "../../../lib/db";
const gcallback: Router = Router();

import store from "store";
import { createToken } from "../../helpers/token";
gcallback.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async function (req, res) {
    const rawUser = req.user as any;
    const callback = store.get("data").callback;
    store.clearAll()
    const user = await prisma.user.findUnique({
      where: {
        email: rawUser.emails[0].value,
      },
    });

    if (user) {
      const token = createToken(user.id, user.email);
      res.redirect(
        `http://localhost:3000/callback?callback=${encodeURIComponent(
          callback
        )}&jwt=${encodeURIComponent(token)}}`
      );
    }
    const [deviceShare, publicKey] = await setupKey(rawUser.emails[0].value);

    const newUser = await prisma.user.create({
      data: {
        email: rawUser.emails[0].value,
        address: publicKey,
        name: rawUser.displayName,
        avatar: rawUser.photos[0].value,
      },
    });
    const token = createToken(newUser.id, newUser.email);
    
    res.redirect(
      `http://localhost:3000/callback?share=${deviceShare}&callback=${encodeURIComponent(
        callback
      )}&jwt=${encodeURIComponent(token)}}`
    );
  }
);

export default gcallback as Router;
