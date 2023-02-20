import passport from "passport";
import { Router } from "express";
import { setupKey } from "../../helpers/setupKey";

import { prisma } from "../../../lib/db";

import store from "store";
import { createToken } from "../../helpers/token";
const dcallback: Router = Router();

dcallback.get(
  "/auth/discord/callback",
  passport.authenticate("discord", { failureRedirect: "/login" }),
  async function (req, res) {
    const rawUser = req.user as any;
    const callback = store.get("data").callback;
    store.clearAll();
    const user = await prisma.user.findUnique({
      where: {
        email: rawUser.email,
      },
    });

    if (user) {
      console.log("user already exists");
      const token = createToken(user.id, user.email);

      res.cookie("jwt-rayauth", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
      });

      res.redirect(
        `http://localhost:3000/callback?callback=${encodeURIComponent(
          callback
        )}&jwt=${encodeURIComponent(token)}}`
      );
      return;
    }
    const [deviceShare, publicKey] = await setupKey(rawUser.email);

    const newUser = await prisma.user.create({
      data: {
        email: rawUser.email,
        address: publicKey.toString(),
        name: rawUser.username,
        avatar: rawUser.avatar,
      },
    });

    const token = createToken(newUser.id, newUser.email);

    res.cookie("jwt-rayauth", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
    });

    res.redirect(
      `http://localhost:3000/callback?share=${deviceShare}&callback=${encodeURIComponent(
        callback
      )}&jwt=${encodeURIComponent(token)}}`
    );
  }
);

export default dcallback as Router;
