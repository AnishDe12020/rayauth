import typegoose from "@typegoose/typegoose";
import { Key } from "../interfaces/key";
import { connect } from "mongoose";
import { DB1, DB2, DB3 } from "../constant";

export function saveToMongoKeyOne(key: string, email: string) {
  connect(DB1).then((m) => {
    const keySchema = typegoose.getModelForClass(Key);
    const newKey = new keySchema({ email, key });
    newKey.save();
    m.disconnect();
  });
}

export function saveToMongoKeyTwo(key: string, email: string) {
  connect(DB2).then((m) => {
    const keySchema = typegoose.getModelForClass(Key);
    const newKey = new keySchema({ email, key });
    newKey.save();
    m.disconnect();
  });
}

export function saveToMongoKeyThree(key: string, email: string) {
  connect(DB3).then((m) => {
    const keySchema = typegoose.getModelForClass(Key);
    const newKey = new keySchema({ email, key });
    newKey.save();
    m.disconnect();
  });
}

export async function saveKeys(keys : string[], email: string) {
 await saveToMongoKeyOne(keys[0], email)
 await saveToMongoKeyTwo(keys[1], email)
 await saveToMongoKeyThree(keys[2], email)
}