import passport from "passport";
import { Router } from "express";
import base58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { sliceKey } from "../../helpers";
import {prisma} from "../../lib/db"
const gcallback: Router = Router();

gcallback.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
 async function (req, res) {
    await prisma.$connect();
    const rawUser = req.user as any
    const user = await prisma.user.findUnique({
      where: {
        email:  rawUser.emails[0].value,
      },
    })
    if(req.user && user) return res.redirect("/")
    const {secretKey, publicKey} = Keypair.generate()
    const key = base58.encode(secretKey)
    console.log("secret key: " , key)
    console.log(publicKey)

     const [deviceShare, emailShare, authShare] = sliceKey(key)
     const [shareOne, shareTwo, shareThree] = sliceKey(authShare);
     console.log(deviceShare,emailShare,shareOne,shareTwo,shareThree)
    
    res.redirect("/");
  }
);

export default gcallback as Router;
