import passport from "passport";
import google from "passport-google-oauth20";
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
      (accessToken: any, refreshToken: any, profile: any, done: any) => {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        done(null, profile);
      }
    )
  );
}
