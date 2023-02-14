import passport from "passport";
import google from "passport-google-oauth20";
import { Keypair } from "@solana/web3.js";
import base58 from "bs58";
import { GID, GSECRET } from "../constant";
import { combineKey, sliceKey } from "../../src/helpers";

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
        callbackURL: "http://localhost:4000/auth/google/callback",
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
      },
      async (_: any, __: any, profile: any, done: any) => {
      console.log(profile)
      const {secretKey, publicKey} = Keypair.generate()
      const key = base58.encode(secretKey)
        console.log(key)
        console.log(publicKey)

        const slice = sliceKey(key)
       console.log(slice[0])
       console.log(slice[1])
       console.log(slice[2])
      
      console.log(combineKey(slice))
       

        done(null, profile)
        
      }
      )
    );
  }
  