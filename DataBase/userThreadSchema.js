import mongoose from "mongoose";

const userThreadSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  threadID: [{ type: String, required: true }],
});

const UserThread = mongoose.model("UserThread", userThreadSchema);
export { UserThread };
