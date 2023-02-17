import typegoose from "@typegoose/typegoose";
import { Key } from "src/interfaces/key";
import { connect, disconnect } from "mongoose";
import { DB1, DB2, DB3 } from "src/constant";

export function saveToMongoKeyOne(key: string, email: string) {
  connect(DB1).then(() => {
    const keySchema = typegoose.getModelForClass(Key);
    const newKey = new keySchema({ email, key });
    newKey.save();
    disconnect();
  });
}

export function saveToMongoKeyTwo(key: string, email: string) {
  connect(DB2).then(() => {
    const keySchema = typegoose.getModelForClass(Key);
    const newKey = new keySchema({ email, key });
    newKey.save();
    disconnect();
  });
}

export function saveToMongoKeyThree(key: string, email: string) {
  connect(DB3).then(() => {
    const keySchema = typegoose.getModelForClass(Key);
    const newKey = new keySchema({ email, key });
    newKey.save();
    disconnect();
  });
}
