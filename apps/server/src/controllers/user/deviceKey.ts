import { SECERET } from "../../constant";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { prisma } from "../../../lib/db";
import { jwtInterface } from "src/interfaces/jwt";
import { getCombinedKey } from "src/helpers/getAuthKey";
import { combineKey, sliceKey } from "src/helpers";
export function deviceShare() {
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
        id: data.email,
      },
    });
    if (!user) {
      res.status(404).json("No user was found through this token");
      res.end();
      return;
    }
    const key = req.body.key
    if(!key) {
      res.status(404).json("No key provided for a new device share");
      res.end();
      return;
    }
    const key2 = await getCombinedKey(user.email);
    const construct = combineKey([key,key])
    const newShares = sliceKey(construct)
    if(newShares[1] != key || newShares[2] != key2) {
      res.status(404).json("There was an error while recovering a new device share")
      res.end();
      return
    }
    res.status(200).json({
      key: newShares[0],
      msg: "New Device key reconstructed and recovered"
    }).end();
  };
}
