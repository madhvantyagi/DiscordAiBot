import { insertUserThread, findThread } from "../DataBase/DataConnect.js";
import { imageTotext } from "../ImageExtraction/ImageExtraction.js";
import { threadOutput } from "../OpenAi/Messageout.js";
import { readFile } from "fs";
const Command = class {
  userID;
  Message;
  userMessage;
  constructor(userID, Message, userMessage) {
    this.userID = userID;
    this.Message = Message;
    this.userMessage = userMessage;
  }

  async runAns() {
    try {
      const user = await findThread(this.userID);

      if (user) {
        const replynewMessage = await this.userMessage.reply(
          "Data getting processed....."
        );
        const threads = user.threadID;
        const lastUsedThread = threads[threads.length - 1];
        const userQuestion = await threadOutput(this.Message, lastUsedThread);
        await wait(10000);
        await replynewMessage.edit(userQuestion);
      } else {
        await this.userMessage.reply("Registering you in our database....");
        const replynewMessage = await this.userMessage.reply(
          "Data getting processed....."
        );
        await insertUserThread(this.userID);
        const newUser = await findThread(this.userID);
        console.log(newUser);
        const threads = await newUser.threadID;
        const lastUsedThread = await threads[threads.length - 1];
        const userQuestion = await threadOutput(this.Message, lastUsedThread);
        await wait(10000);
        await replynewMessage.edit(userQuestion);
      }
    } catch (e) {
      await this.userMessage("Some Errror Occured");
      console.error(e);
    }
  }

  async runImage() {
    try {
      const user = findThread(this.userID);

      if (user) {
        const replyMessage = await this.userMessage.reply(
          "Image getting processed...."
        );
        const threads = user.threadID;
        const lastUsedThread = threads[threads.length - 1];
        const userAsk = await imageTotext(imageUrl);
        const AiResponse = await threadOutput(userAsk, lastUsedThread);
        await wait(10000);
        await replyMessage.edit(AiResponse);
      } else {
        await this.userMessage.reply("Registering you in our database....");
        const replynewMessage = await this.userMessage.reply(
          "Data getting processed....."
        );
        await insertUserThread(this.userID);
        const newUser = await findThread(this.userID);
        const threads = newUser.threadID;
        const lastUsedThread = threads[threads.length - 1];
        const userAsk = await imageTotext(imageURL);
        const AiResponse = await threadOutput(userAsk, lastUsedThread);
        await wait(10000);
        await replynewMessage.edit(AiResponse);
      }
    } catch (e) {
      console.log(`ImageERROR: ${e.message}`);
    }
  }

  async runHelp() {
    try {
      const commands = await readFile("command.txt");
      const data = await commands.toString();
      await this.userMessage.reply(data);
    } catch (e) {
      await this.userMessage.reply(
        "Error Occur , If you wanna know commands contact Madhav "
      );
      console.error(e.message);
    }
  }

  async userInfo() {
    try {
      const user = await findThread(this.userID);
      if (user) {
        let threads = user.threadID;
        for (const thread of threads.reverse())
          await this.userMessage.reply(thread);
      } else {
        await this.userMessage.reply(
          "you haven't created thread yet, use our /runAns method to create thread"
        );
      }
    } catch (e) {
      await this.userMessage.reply(
        "Error Occur , If you wanna know commands contact Madhav OR Moshe "
      );
      console.error(e);
    }
  }
};

export { Command };
