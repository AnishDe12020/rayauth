import passport from "passport";
import google from "passport-google-oauth20";
import { prisma } from "../lib/db";
import { Keypair } from "@solana/web3.js";
import secrets from "secrets.js-grempe";
import base58 from "bs58";
import { GID, GSECRET } from "../constant";

export function initgoogle() {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    return done(null, user as any);
  });
  console.log(GID, GSECRET);
  passport.use(
    new google.Strategy(
      {
        clientID: GID,
        clientSecret: GSECRET,
        callbackURL: "http://localhost:4000/auth/google/callback",
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);

        const existingUser = await prisma.user.findUnique({
          where: {
            email: profile.emails[0].value,
          },
        });

        if (!existingUser) {
          const { publicKey, secretKey } = Keypair.generate();

          console.log(base58.encode(secretKey));

          const shares = secrets.share(base58.encode(secretKey), 3, 2);

          console.log(shares);

          // console.log(
          //   "can combine from 2 shares: ",
          //   secrets.combine(shares.slice(1, 3))
          // );

          // console.log(
          //   "can create new share from 2 shares and combine: ",
          //   secrets.combine(
          //     shares
          //       .slice(1, 2)
          //       .concat(secrets.newShare(Math.random(), shares.slice(0, 2)))
          //   )
          // );

          const newUser = await prisma.user.create({
            data: {
              email: profile.emails[0].value,
              name: profile.displayName,
              pubkey: publicKey.toBase58(),
            },
          });

          console.log("newUser", newUser);
        }

        done(null, profile);
      }
    )
  );
}
