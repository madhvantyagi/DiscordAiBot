import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { commandResgister } from "./DiscordCommands.js";
import { threadOutput } from "../OpenAi/Messageout.js";
import { imageTotext } from "../ImageExtraction/ImageExtraction.js";
import { insertUserThread, findThread } from "../DataBase/DataConnect.js";
import { setTimeout } from "node:timers/promises";

const wait = setTimeout;

config();
commandResgister();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

//command to start reading after user text messsage;
let bool = false;
const commandBoolTrue = () => {
  bool = true;
};

//command to stop reading after user text messsage;

const commandBoolFalse = () => {
  bool = false;
};

client.on("messageCreate", async (userMessage) => {
  console.log(userMessage.author.id);
  const message = userMessage.content;
  const userID = userMessage.author.id;
  const command = message.split(" ")[0];
  console.log(command);

  const userAsk = message.substr(9);

  console.log(userAsk);
  try {
    if (Object.is(command, "/runHelp")) {
      const user = await findThread(userID);

      if (user) {
        const replynewMessage = await userMessage.reply("Data getting updated");
        const threads = user.threadID;
        const lastUsedThread = threads[threads.length - 1];
        const userQuestion = await threadOutput(userAsk, lastUsedThread);
        await wait(10000);
        await replynewMessage.edit(userQuestion);
      } else {
        const replynewMessage = await userMessage.reply("Data getting updated");
        await insertUserThread(userID);
        const newUser = await findThread(userID);
        console.log(newUser);
        const threads = await newUser.threadID;
        const lastUsedThread = await threads[threads.length - 1];
        const userQuestion = await threadOutput(userAsk, lastUsedThread);
        await wait(10000);
        await replynewMessage.edit(userQuestion);
      }
    }
  } catch (e) {
    console.log("this is working");
    console.error(e);
  }

  if (Object.is(command, "/creatThread")) {
  }

  if (Object.is(command, "/showThread")) {
  }
  // const response = await extractDatabase(userID, message, command);

  // return response;

  // if (userMessage.attachments > 0) {
  //   const url = userMessage.attachments.values().next().value.url;
  //   const text = await imageTotext(url);
  //   const res = await extractDatabase(userID, text, command);
  //   console.log(res);
  //   // return res;
  // }
});

client.on("interactionCreate", async (interaction) => {
  //   console.log(interaction);
  console.log(interaction.options.data[0].value);
  const data = interaction.options.data[0].value;
  if (!interaction.isChatInputCommand()) return;
  try {
    // Send an initial response acknowledging the command
    if (interaction.commandName === "danielleavit") {
      await interaction.reply(" it's working on data wait for response.... ");
    }
    // const userQuestion = await threadOutput(data);

    await wait(10000);
    await interaction.editReply("Modified Message");
  } catch (e) {
    console.error(e);
  }

  //   await wait(4_000);
  //   await interaction.editReply("Updated response");

  // Delay sending the final response using setTimeout
});

client.login(process.env.DISCORD_BOT_TOKEN);
