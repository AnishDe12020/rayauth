import typegoose from "@typegoose/typegoose";
import { Key } from "../interfaces/key";
import { connect } from "mongoose";
import { DB1 } from "../constant";

export function saveToMongoKeyOne(key: string, email: string) {
  connect(DB1).then((m) => {
    const keySchema = typegoose.getModelForClass(Key);
    const newKey = new keySchema({ email, key });
    newKey.save();
    m.disconnect();
  });
}


export async function saveKeys(keys : string[], email: string) {
 await saveToMongoKeyOne(keys[0], email)
 //implement
}