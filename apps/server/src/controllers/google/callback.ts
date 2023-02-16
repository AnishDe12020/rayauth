import passport from "passport";
import { Router } from "express";
import base58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { sliceKey } from "../../helpers";
import { prisma } from "../../../../../packages/shared/db";
import { sendMail } from "../../helpers/email";
const gcallback: Router = Router();

gcallback.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async function (req, res) {
    const rawUser = req.user as any;

    const user = await prisma.user.findUnique({
      where: {
        email: rawUser.emails[0].value,
      },
    });

    if (user) {
      console.log("exists");
      res.redirect(`http://localhost:3000/callback`);

      return;
    }

    const { secretKey, publicKey } = Keypair.generate();
    const key = base58.encode(secretKey);

    const [deviceShare, emailShare, authShare] = sliceKey(key);
    console.log(deviceShare);
    sliceKey(authShare);
    sendMail(rawUser.emails[0].value, emailShare);
    const newUser = await prisma.user.create({
      data: {
        email: rawUser.emails[0].value,
        address: String(publicKey),
        name: rawUser.displayName,
        avatar: rawUser.photos[0].value,
      },
    });
    console.log(newUser);
    res.redirect(`http://localhost:3000/callback?share=${deviceShare}`);
  }
);

export default gcallback as Router;
