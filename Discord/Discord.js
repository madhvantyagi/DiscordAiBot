import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { commandResgister } from "./DiscordCommands.js";
import { threadOutput } from "../OpenAi/Messageout.js";
import { setTimeout } from "node:timers/promises";
const wait = setTimeout;

config();
commandResgister();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  console.log(interaction.options.data[0].value);
  const data = interaction.options.data[0].value;
  if (!interaction.isChatInputCommand()) return;
  try {
    // Send an initial response acknowledging the command
    if (interaction.commandName === "danielleavit") {
      await interaction.reply("it's working on data wait for response....");
    }
    const userQuestion = await threadOutput(data);

    await wait(10000);
    await interaction.editReply(userQuestion);
  } catch (e) {
    console.error(e);
  }

  //   await wait(4_000);
  //   await interaction.editReply("Updated response");

  // Delay sending the final response using setTimeout
});

client.login(process.env.DISCORD_BOT_TOKEN);
