import { NextFunction, Request, Response } from "express";
import { prisma } from "./../../../../packages/shared/db";

export function setQuery() {
  return async (req: Request, res: Response, next: NextFunction) => {
    var { id, cb } = req.query;
    if (!id) {
      res.redirect(`${cb}?error=project_not_found`);
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
      res.redirect(`${cb}?error=project_not_found`);
      next();
      return;
    }

    const callbacks = project.callbackUrls;
    if (callbacks.length == 0) {
      res.redirect(`${cb}?error=callback_not_found`);
      next();
      return;
    }
    if (cb == undefined && callbacks.length != 0) cb = callbacks[0];

    if (cb != undefined && !callbacks.includes(cb)) {
      res.redirect(`${cb}?error=not_authorized`);
      next();
      return;
    }

    req.body.callback = cb;
    req.body.clientId = id;

    next();
  };
}
