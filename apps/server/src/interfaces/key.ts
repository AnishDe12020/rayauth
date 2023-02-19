import mongoose from "mongoose";

export const Key = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export const KeyModel = mongoose.models.Key || mongoose.model("Key", Key);
