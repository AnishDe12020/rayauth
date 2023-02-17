import { prop } from "typegoose";

export class Key {
  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  key: string;

  @prop({ required: true })
  pubkey: string;
}
