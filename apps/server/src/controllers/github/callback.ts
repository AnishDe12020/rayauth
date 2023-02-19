import passport from "passport";
import { Router } from "express";
import base58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { sliceKey } from "../../helpers";
import { prisma } from "../../../lib/db";
import { sendMail } from "../../helpers/email";
import jwt from "jsonwebtoken";
import { SECERET } from "../../constant";

const callback: Router = Router();

callback.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async function (req, res) {
    const rawUser = req.user as any;

    const user = await prisma.user.findUnique({
      where: {
        email: rawUser.emails[0].value,
      },
    });

    if (user) {
      res.clearCookie("jwt-rayauth");
      const token = jwt.sign(
        {
          email: rawUser.emails[0].value,
          id: user.id,
          time: Date(),
        },
        SECERET
      );
      res.cookie("jwt-rayauth", token, {
        maxAge: 60000, // Lifetime
        httpOnly: true,
        secure: false,
      });
      console.log("cookie updated");
      console.log("exists");
      res.redirect(
        `http://localhost:3000/callback?cb=${encodeURIComponent(
          req.body.callback
        )}`
      );

      return;
    }

    const { secretKey, publicKey } = Keypair.generate();
    const key = base58.encode(secretKey);

    const [deviceShare, emailShare, authShare] = sliceKey(key);
    // const keys = sliceKey(deviceShare);
    sliceKey(authShare);
    sendMail(rawUser.emails[0].value, emailShare);

    const newUser = await prisma.user.create({
      data: {
        email: rawUser.emails[0].value,
        address: publicKey.toString(),
        name: rawUser.displayName,
        avatar: rawUser.photos[0].value,
      },
    });
    const token = jwt.sign(
      {
        email: rawUser.emails[0].value,
        id: newUser.id,
        time: Date(),
      },
      SECERET
    );
    res.cookie("jwt-rayauth", token, {
      maxAge: 60000, // Lifetime
      httpOnly: true,
      secure: false,
    });
    console.log(newUser);
    res.redirect(
      `http://localhost:3000/callback?share=${deviceShare}&cb=${encodeURIComponent(
        req.body.callback
      )}&jwt=${encodeURIComponent(token)}`
    );
  }
);

export default callback as Router;
