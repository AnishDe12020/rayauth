import { SECERET } from "../../constant";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { prisma } from "../../../lib/db";
import { jwtInterface } from "src/interfaces/jwt";
import { getCombinedKey } from "../../helpers/getAuthKey";
import secrets from "secrets.js-grempe";
import arr from "hex-array"
import { Keypair } from "@solana/web3.js";
export function getPrivateKey() {
  return async (req: Request, res: Response) => {
    const auth = req.headers.authorization?.replace("Bearer ", "");
    console.log("running")
    const deviceKey = req.query.deviceKey?.toString();
    console.log("devicekey", deviceKey?.toString())
    if (!auth || auth == undefined) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    var data = jwt.verify(auth || "", SECERET) as jwtInterface;
    if (!data) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      res.status(404).json("No user was found through this token");
      res.end();
      return;
    }

    

    if (!deviceKey || deviceKey == undefined) {
      res.status(400).json("No device key was provided");
      res.end();
      return;
    }
   console.log(user.email)
    const shareTwo = await getCombinedKey(user.email)
 const combine = secrets.combine([deviceKey, shareTwo])
 const newkey = arr.fromString(combine)



 console.log("new", newkey)
 const secret = Keypair.fromSecretKey(newkey)
 console.log(secret)

    res
      .status(200)
      .json({
        key: combine,
        msg: "The private key has been combined",
      })
      .end();
  };
}
