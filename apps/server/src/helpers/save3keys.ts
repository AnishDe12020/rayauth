import { KeyModel } from "../interfaces/key";
import { connect } from "mongoose";
import { DB1, DB2, DB3 } from "../constant";

const saveToMongoKeyOne = async (key: string, email: string) => {
  const mongo1 = await connect(DB1);
  const newKey = new KeyModel({ email, key });
  await newKey.save();
  await mongo1.disconnect();
};

const saveToMongoKeyTwo = async (key: string, email: string) => {
  const mongo2 = await connect(DB2);
  const newKey = new KeyModel({ email, key });
  await newKey.save();
  await mongo2.disconnect();
};

const saveToMongoKeyThree = async (key: string, email: string) => {
  const mongo3 = await connect(DB3);
  const newKey = new KeyModel({ email, key });
  await newKey.save();
  await mongo3.disconnect();
};

export async function saveKeys(keys: string[], email: string) {
  await saveToMongoKeyOne(keys[0], email);
  console.log("saved to mongo 1");
  await saveToMongoKeyTwo(keys[1], email);
  console.log("saved to mongo 2");
  await saveToMongoKeyThree(keys[2], email);
  console.log("saved to mongo 3");
}
