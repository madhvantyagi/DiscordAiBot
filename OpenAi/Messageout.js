import { OpenAI } from "openai";
import { config } from "dotenv";
import fs from "fs";
config({ path: "../.env" });
import { threadCreate } from "./OpenAi.js";

const assistant_id = process.env.ASSISTANT_ID;
const api_id = process.env.API_KEY;
console.log(api_id, assistant_id);
const openai = new OpenAI({
  apiKey: api_id,
});

const thread = await threadCreate();
const threadOutput = async (UserMessage) => {
  //This line passing message to that specific thread (thread is nothing but just a queue of chat for a user)
  const messagess = await openai.beta.threads.messages.create(thread, {
    role: "user",
    content: UserMessage,
  });

  // This thread is getting processed by GPT 3.5
  const run = await openai.beta.threads.runs.create(thread, {
    assistant_id: assistant_id,
    model: "gpt-3.5-turbo-1106",
    tools: [{ type: "retrieval" }],
  });

  // This function just check the status of our thread , reason we have to run a loop is because it waits and we can't wait asynchronously it has to be synchronous
  async function waitCompleteion(threadId, runId) {
    let status = "queued";
    while (status === "queued" || status === "in_progress") {
      const run2 = await openai.beta.threads.runs.retrieve(threadId, runId);
      status = run2.status;
      console.log(status);
      if (status === "completed") {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
    }
  }
  await waitCompleteion(thread, run.id);

  const messages = await openai.beta.threads.messages.list(thread);

  console.log(messages.body.data[0].content[0].text.value);
  return messages.body.data[0].content[0].text.value;
};
// threadOutput("what is relation algebra");

export { threadOutput };
