import passport from "passport";
import discord from "passport-discord";
import { DSID, DSSECRET } from "../constant";

export function initdiscord() {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    return done(null, user as any);
  });
  passport.use(
    new discord.Strategy(
      {
        clientID: DSID,
        clientSecret: DSSECRET,
        // callbackURL: "ASA",
        scope: ["email", "identify"],
      },
      (__: any, _: any, profile: any, done: any) => {
        done(null, profile);
      }
    )
  );
}
