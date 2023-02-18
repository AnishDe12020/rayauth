import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/db";

export function setQuery() {
  return async (req: Request, _: Response, next: NextFunction) => {
    var { id, cb } = req.query;
    if (!id) {
      next();
      return;
    }
    if (!cb) {
      cb = undefined;
    }
    const project = await prisma.project.findUnique({
      where: {
        id: id.toString(),
      },
    });

    if (!project) {
      next();
      return;
    }

    const callbacks = project.callbackUrls;
    if (callbacks.length == 0) {
      next();
      return;
    }
    if (cb == undefined && callbacks.length != 0) cb = callbacks[0];

    if (cb != undefined && !callbacks.includes(cb.toString())) {
      next();
      return;
    }

    req.body.callback = cb;
    req.body.clientId = id;

    next();
  };
}
