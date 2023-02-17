
// import {SECERET} from "../../constant";
import { Request, Response } from "express";
// import { prisma } from "../../../../../packages/shared/db";

export function userController() {
  return async (req: Request, res: Response) => {
       console.log(req.headers.authorization);
       res.send("Hello")
  };
}
