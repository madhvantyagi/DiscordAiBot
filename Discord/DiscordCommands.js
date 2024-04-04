import { REST, Routes, SlashCommandBuilder } from "discord.js";

import { config } from "dotenv";
config({ path: "../.env" });
// const commands = [
//   {
//     name: "ask",
//     description:
//       "Artifical Intelligence that answers your Professor questions ",
//   },
// ];

const commands = new SlashCommandBuilder()
  .setName("danielleavit")
  .setDescription("find the questions you want to Know")
  .addStringOption((options) =>
    options
      .setName("aidaniel")
      .setDescription("helps you to find questions")
      .setRequired(true)
  );

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

const commandResgister = async () => {
  try {
    console.log("commandRegistering");
    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: [commands.toJSON()],
    });
    console.log("commandRegistered successfully");
  } catch (err) {
    console.error(err);
  }
};

export { commandResgister };
