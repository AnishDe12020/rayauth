import { SECERET } from "../../constant";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { prisma } from "../../../lib/db";
import { jwtInterface } from "src/interfaces/jwt";
export function createSessionKey() {
  return async (req: Request, res: Response) => {
    const auth = req.headers.authorization?.replace("Bearer ", "");
    const {key, userId, expiresAt} = req.body
    if(!key || !userId || !expiresAt){
        res.status(404).json({
            msg: "Not a proper request"
        })
        return
    }
    if (!auth || auth == undefined) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    console.log("auth", auth);
    var data = jwt.verify(auth || "", SECERET) as jwtInterface;
    if (!data) {
      res.status(401).json("Unauthorized");
      res.end();
      return;
    }
    console.log(data);
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      res.status(404).json("No user was found through this token");
      res.end();
      return;
    }
    const sessionKey = await prisma.sessionKey.create({
        data: {
            key: key,
            user: {
                connect: {
                    id: userId
                }
            },
            userId: userId,
            expiresAt: expiresAt,
        }
    })
    res.status(200).json(sessionKey)
  };
}



export function getSessionKey() {
    return async (req: Request, res: Response) => {
      const auth = req.headers.authorization?.replace("Bearer ", "");

      if (!auth || auth == undefined) {
        res.status(401).json("Unauthorized");
        res.end();
        return;
      }
      console.log("auth", auth);
      var data = jwt.verify(auth || "", SECERET) as jwtInterface;
      if (!data) {
        res.status(401).json("Unauthorized");
        res.end();
        return;
      }
      console.log(data);
      const user = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (!user) {
        res.status(404).json("No user was found through this token");
        res.end();
        return;
      }
      
      res.status(200).json(user.SessionKey)
    };
  }
  

function updateSessionKey() {
    return async (req: Request, res: Response) => {
        const auth = req.headers.authorization?.replace("Bearer ", "");
  
        if (!auth || auth == undefined) {
          res.status(401).json("Unauthorized");
          res.end();
          return;
        }
        console.log("auth", auth);
        var data = jwt.verify(auth || "", SECERET) as jwtInterface;
        if (!data) {
          res.status(401).json("Unauthorized");
          res.end();
          return;
        }
        console.log(data);
        const user = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });
        if (!user) {
          res.status(404).json("No user was found through this token");
          res.end();
          return;
        }
        const sessionKey = await prisma.sessionKey.findUnique({
            where: {
                key: req.body.key
            }
        })
        if(!sessionKey){
            res.status(404)
            .json({
                msg: "No key found with this key id"
            })
            return
        }
        const result = await prisma.sessionKey.update({
            where: {
                key: req.body.key
            },
            data: {
                revoked: true
            }
        })
            
        
        res.status(200).json(result)
      };
}
  