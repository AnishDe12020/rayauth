import { SECERET } from "../../constant";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { prisma } from "../../../lib/db";
import { jwtInterface } from "src/interfaces/jwt";
import { getCombinedKey } from "../../helpers/getAuthKey";
import { combineKey, sliceKey } from "../../helpers";

export function deviceShare() {
  return async (req: Request, res: Response) => {
    const auth = req.headers.authorization?.replace("Bearer ", "");
    console.log("auth", auth);
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
    console.log("bodu", req.query);
    const key = req.query.key?.toString();
    console.log("key", key);
    if (!key) {
      res.status(404).json("No key provided for a new device share");
      res.end();
      return;
    }

    const key2 = await getCombinedKey(user.email);
    const construct = combineKey([key, key2]);
    const newShares = sliceKey(construct);

    res
      .status(200)
      .json({
        key: newShares[1],
        msg: "New Device key reconstructed and recovered",
      })
      .end();
  };
}
