import passport from "passport";
import { Router } from "express";
import base58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { sliceKey } from "../../helpers";
import { prisma } from "../../../../../packages/shared/db";
import { sendMail } from "../../helpers/email";
import jwt from "jsonwebtoken";
import { SECERET } from "../../constant";
import {
  saveToMongoKeyOne,
  saveToMongoKeyThree,
  saveToMongoKeyTwo,
} from "../../helpers/save3keys";

const dcallback: Router = Router();

dcallback.get(
  "/auth/discord/callback",
  passport.authenticate("discord", { failureRedirect: "/login" }),
  async function (req, res) {
    const rawUser = req.user as any;

    const user = await prisma.user.findUnique({
      where: {
        email: rawUser.email,
      },
    });

    if (user) {
      res.clearCookie("jwt-rayauth");
      const token = jwt.sign(
        {
          email: rawUser.email,
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
    const [keyOne, keyTwo, keyThree] = sliceKey(deviceShare);
    saveToMongoKeyOne(keyOne, rawUser.email);
    saveToMongoKeyTwo(keyTwo, rawUser.email);
    saveToMongoKeyThree(keyThree, rawUser.email);
    sliceKey(authShare);
    sendMail(rawUser.email, emailShare);

    const newUser = await prisma.user.create({
      data: {
        email: rawUser.email,
        address: publicKey.toString(),
        name: rawUser.username,
        avatar: rawUser.avatar,
      },
    });
    const token = jwt.sign(
      {
        email: rawUser.email,
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

export default dcallback as Router;
