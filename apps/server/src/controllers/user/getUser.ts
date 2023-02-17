
import {SECERET} from "../../constant";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { prisma } from "../../../../../packages/shared/db";
import { jwtInterface } from "src/interfaces/jwt";
export function userController() {
  return async (req: Request, res: Response) => {
       const auth = req.headers.authorization?.replace("Bearer ", "")

       if (!auth || auth == undefined) {
        res.status(401).json("Unauthorized")
        res.end();
        return
       }
       var data = jwt.verify(auth || "", SECERET) as jwtInterface;
         if (!data) {
              res.status(401).json("Unauthorized")
              res.end();
              return

        }
        const user = await prisma.user.findUnique({
            where: {
                id: data.email
            }
        })
        if (!user) {
            res.status(404).json("No user was found through this token")
            res.end();
            return
        }
        res.status(200).json(user)
       res.send("Hello")
  };
}
