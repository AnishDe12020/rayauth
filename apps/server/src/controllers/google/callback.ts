import passport from "passport";
import { Router } from "express";
import base58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { sliceKey } from "../../helpers";
import { prisma } from "../../lib/db";
import { sendMail } from "../../helpers/email";
const gcallback: Router = Router();

gcallback.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async function (req, res) {
    
    await prisma.$connect();
    const rawUser = req.user as any;
    const user = await prisma.authUser.findUnique({
      where: {
        email: rawUser.emails[0].value,
      },
    });
    if (user && user.provider === "GOOGLE") {
      console.log("exists");
      return res.redirect("/");
    }
    const { secretKey, publicKey } = Keypair.generate();
    const key = base58.encode(secretKey);

    const [deviceShare, emailShare, authShare] = sliceKey(key);
    console.log(deviceShare)
    sliceKey(authShare);
    sendMail(rawUser.emails[0].value, emailShare);
    const newUser = await prisma.authUser.create({
      data: {
        email: rawUser.emails[0].value,
        pubkey: String(publicKey),
        name: rawUser.displayName,
        avatar: rawUser.photos[0].value,
        provider: "GOOGLE",
      },
    });
    console.log(newUser);
    res.redirect(`https://localhost:3000/callback`);
  }
);

export default gcallback as Router;
