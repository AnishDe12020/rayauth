import { SECERET } from "../../constant";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { prisma } from "../../../lib/db";
import { jwtInterface } from "src/interfaces/jwt";
import { getCombinedKey } from "../../helpers/getAuthKey";

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
    res
      .status(200)
      .json({
        key: socialKey,
        msg: "The private key has been combined",
      })
      .end();
  };
}
