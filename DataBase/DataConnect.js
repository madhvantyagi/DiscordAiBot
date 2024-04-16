import mongoose from "mongoose";
import { config } from "dotenv";
import { UserThread } from "./userThreadSchema.js";
import { threadCreate } from "../OpenAi/OpenAi.js";

config({ path: "../.env" });

const password = process.env.MONGO_DB;
const URL = `mongodb+srv://maddytyagi0102:${password}@cluster0.ohmyzvk.mongodb.net/`;

mongoose
  .connect(URL)
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => console.error(err));
console.log(password);

const insertUserThread = async (userID) => {
  let userThread = await UserThread.findOne({ userID });
  try {
    if (!userThread) {
      const threadID = await threadCreate();
      userThread = new UserThread({
        userID,
        threadID: [threadID],
      });
    } else {
      const newThreadID = await threadCreate();
      userThread.threadID.push(newThreadID);
    }
  } catch (err) {
    console.log(err);
  }
  await userThread.save();
};

const findThread = async (userID) => {
  const user = await UserThread.findOne({ userID });
  if (!user) return false;

  //   console.log(user);
  return user;
};

export { insertUserThread, findThread };
