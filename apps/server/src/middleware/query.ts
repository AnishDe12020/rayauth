import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/db";

export function setQuery() {
  return async (req: Request, _: Response, next: NextFunction) => {
    var { clientId, callbackUrl } = req.query;
    if (!clientId) {
      console.log("no client id");
      next();
      return;
    }
    if (!callbackUrl) {
      callbackUrl = undefined;
    }
    const project = await prisma.project.findUnique({
      where: {
        id: clientId.toString(),
      },
    });

    if (!project) {
      console.log("project not found");
      next();
      return;
    }

    const callbacks = project.callbackUrls;
    if (callbacks.length == 0) {
      console.log("no callbacks");
      next();
      return;
    }
    if (callbackUrl == undefined && callbacks.length != 0)
      callbackUrl = callbacks[0];

    if (
      callbackUrl != undefined &&
      !callbacks.includes(callbackUrl.toString())
    ) {
      console.log("callback not found");
      next();
      return;
    }

    req.body.callback = callbackUrl;
    req.body.clientId = clientId;

    next();
  };
}
