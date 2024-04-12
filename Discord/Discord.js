import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { commandResgister } from "./DiscordCommands.js";
import { threadOutput, extractDatabase } from "../OpenAi/Messageout.js";
import { imageTotext } from "../ImageExtraction/ImageExtraction.js";
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

  if (Object.is(message, "/runHelp")) {
    commandBoolTrue();
  }
  if (Object.is(message, "/stopHelp")) commandBoolFalse();
  if (bool) {
    if (message != "" && message != "/runHelp") {
      const command = message.split(" ")[0];
      const response = await extractDatabase(userID, message, command);
      console.log(response);
      // return response;
    }

    if (userMessage.attachments > 0) {
      const url = userMessage.attachments.values().next().value.url;
      const text = await imageTotext(url);
      const res = await extractDatabase(userID, text, command);
      console.log(res);
      // return res;
    }

    console.log(message);
  }

  {
  }
  if (userMessage.author.bot) return;
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
