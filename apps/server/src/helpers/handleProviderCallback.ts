import { prisma } from "../../lib/db";
import { Response } from "express";
import { createToken } from "./token";
import { setupKey } from "./setupKey";

import store from "store";
import { FRONTEND_URL } from "../constant";

export const handleProviderCallback = async (
  res: Response,
  email: string,
  name?: string,
  avatarUrl?: string
) => {
  const callback = store.get("data")?.callback;
  store.clearAll();

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const redirectUrl = new URL(`${FRONTEND_URL}/callback`);

  if (callback) {
    redirectUrl.searchParams.append("callback", callback);
  }

  if (user) {
    console.log("user already exists");
    const token = createToken(user.id, user.email, user.address);

    res.cookie("jwt-rayauth", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: true,
      domain: "rayauth.com",
      sameSite: "none"
    });

    redirectUrl.searchParams.append("jwt", token);

    res.redirect(redirectUrl.toString());

    return;
  }
  const [deviceShare, publicKey] = await setupKey(email);

  const newUser = await prisma.user.create({
    data: {
      email,
      address: publicKey,
      name,
      avatar: avatarUrl,
    },
  });

  const token = createToken(newUser.id, newUser.email, newUser.address);

  res.cookie("jwt-rayauth", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: true,
      domain: "rayauth.com",
      sameSite: "none"
  });

  redirectUrl.searchParams.append("jwt", token);
  redirectUrl.searchParams.append("share", deviceShare);

  res.redirect(redirectUrl.toString());
};
