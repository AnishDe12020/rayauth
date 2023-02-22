import { KeyModel } from "../interfaces/key";
import { connect } from "mongoose";
import { DB1, DB2, DB3 } from "../constant";
import { combineKey } from "./slice";

const getMongoKeyOne = async ( email: string):Promise<string> => {
  const mongo1 = await connect(DB1);
  const share = await KeyModel.findOne({email: email})
  await mongo1.disconnect();
  return share.key
};

const getMongoKeyTwo = async ( email: string):Promise<string> => {
  const mongo2 = await connect(DB2);
  const share = await KeyModel.findOne({email: email})
  await mongo2.disconnect();
  return share.key
};

const getMongoKeyThree = async ( email: string):Promise<string> => {
  const mongo3 = await connect(DB3);
  const share = await KeyModel.findOne({email: email})
  await mongo3.disconnect();
  return share.key
};


export const getCombinedKey = async(email:string):Promise<string> => {
    const key1 = await getMongoKeyOne(email)
    const key2 = await getMongoKeyTwo(email)
    const key3 = await getMongoKeyThree(email)
    const keys = [key1,key2,key3]
    const authShare = combineKey(keys)
    return authShare
}