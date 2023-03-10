import { SECERET } from "../../constant";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { prisma } from "../../../lib/db";
import { jwtInterface } from "src/interfaces/jwt";
import { getCombinedKey } from "../../helpers/getAuthKey";
import { combine } from "secrets.js-grempe";

export function getPrivateKey() {
  return async (req: Request, res: Response) => {
    const auth = req.headers.authorization?.replace("Bearer ", "");

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

    const socialKey = await getCombinedKey(user.email);

    const deviceKey = req.query.deviceKey;

    if (!deviceKey || deviceKey == undefined) {
      res.status(400).json("No device key was provided");
      res.end();
      return;
    }

    const privKey = combine([socialKey, deviceKey as string]);

    res
      .status(200)
      .json({
        key: privKey,
        msg: "The private key has been combined",
      })
      .end();
  };
}
