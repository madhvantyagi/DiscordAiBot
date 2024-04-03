import { OpenAI } from "openai";
import { config } from "dotenv";
import fs from "fs";
config();
import readline from "readline";

const assistant_id = process.env.ASSISTANT_ID;
const api_id = process.env.API_KEY;

const openai = new OpenAI({
  apiKey: api_id,
});

const threadCreate = async () => {
  const assistant = await openai.beta.assistants.retrieve(assistant_id);
  const thread = await openai.beta.threads.create();
  const data = thread.id + "%" + assistant.id;
  console.log(thread);
  return thread.id;
};

export { threadCreate };
//what professor said about transaction and concurrency