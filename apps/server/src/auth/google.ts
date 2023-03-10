import passport from "passport";
import google from "passport-google-oauth20";
import { BASE_URL, GID, GSECRET } from "../constant";

export function initgoogle() {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    return done(null, user as any);
  });
  passport.use(
    new google.Strategy(
      {
        clientID: GID,
        clientSecret: GSECRET,
        callbackURL: `${BASE_URL}/auth/google/callback`,
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
      },
      async (_: any, __: any, profile: any, done: any) => {
        done(null, profile);
      }
    )
  );
}
