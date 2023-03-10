import passport from "passport";
import Github from "passport-github2";
import { BASE_URL, GITID, GITSECRET } from "../constant";

export function initGithub() {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    return done(null, user as any);
  });
  passport.use(
    new Github.Strategy(
      {
        clientID: GITID,
        clientSecret: GITSECRET,
        callbackURL: `${BASE_URL}/auth/github/callback`,
        scope: ["user:email"],
      },
      (_: any, __: any, profile: any, done: any) => {
        done(null, profile);
      }
    )
  );
}
