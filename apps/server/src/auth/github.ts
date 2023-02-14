import passport from "passport";
import Github from "passport-github2";
import { GITID, GITSECRET } from "../constant";

export function initGithub() {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    return done(null, user as any);
  });
  console.log(GITID, GITSECRET);
  passport.use(
    new Github.Strategy(
      {
        clientID: GITID,
        clientSecret: GITSECRET,
        callbackURL: "http://localhost:4000/auth/github/callback",
        scope: ["user:email"],
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
