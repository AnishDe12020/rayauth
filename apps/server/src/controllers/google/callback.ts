import passport from "passport";
import { Router } from "express";
import base58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { sliceKey } from "../../helpers";
import { prisma } from "../../lib/db";
import { sendMail } from "../../helpers/email";
import {LocalStorage} from "node-localstorage"
import jwt from "jsonwebtoken"
import { SECERET } from "../../constant";
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

    if (typeof localStorage === "undefined" || localStorage === null) {
      localStorage = new LocalStorage('./rayauth');
    }
    const newUser = await prisma.user.create({
      data: {
        email: rawUser.emails[0].value,
        address: publicKey.toString(),
        name: rawUser.displayName,
        avatar: rawUser.photos[0].value,
      },
    });
    const token = jwt.sign({
      email: rawUser.emails[0].value,
      id: newUser.id,
      address: publicKey.toString(),
      time: Date()
    }, SECERET);

    localStorage.setItem("rayauth-token", token);
    console.log(newUser);
    res.redirect(`http://localhost:3000/callback?share=${deviceShare}`);
  }
);

export default gcallback as Router;
