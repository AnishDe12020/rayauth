import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/db";
import store from "store";
import { TESTP } from "../constant";
export function setQuery() {
  return async (req: Request, _: Response, next: NextFunction) => {
    var { id, cb } = req.query;
    console.log(id, cb);
    if (id?.toString().toUpperCase() == "TEST") id = TESTP;
    if (!cb) {
      next();
      return;
    }
    const project = await prisma.project.findUnique({
      where: {
        id: id?.toString(),
      },
    });

    if (!project) {
      cb = "https://localhost:3000/error";
    }

    console.log(project?.callbackUrls);
    store.set("data", {
      callback: cb.toString(),
      clientId: id?.toString(),
    });

    console.log(store.get("data"));
    next();
  };
}
