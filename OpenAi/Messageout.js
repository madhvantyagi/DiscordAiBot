import { OpenAI } from "openai";
import { config } from "dotenv";
import fs from "fs";
config({ path: "../.env" });
import { threadCreate } from "./OpenAi.js";
import { userDatabase } from "./TempDatabase.js";

const assistant_id = process.env.ASSISTANT_ID;
const api_id = process.env.API_KEY;
console.log(api_id, assistant_id);
const openai = new OpenAI({
  apiKey: api_id,
});

let thread;

const extractDatabase = async (authorID, message, command) => {
  const dbValue = userDatabase.authorID;
  if (dbValue === undefined) {
    const newthread = await threadCreate();
    userDatabase[authorID] = [newthread];
    console.log(userDatabase);
    thread = newthread;
    console.log("first thread created");
  } else if (command === "/newThread") {
    // creating new thread they
    const newthread2 = await threadCreate();
    userDatabase[authorID].push(newthread2);
    console.log(userDatabase);

    thread = newthread2;
    console.log("user wanna new thread created");
  } else {
    // taking the last thread they created
    const arr = userDatabase.authorID;
    console.log(userDatabase);

    thread = arr[arr.length - 1];
    console.log("retriving last thread existed");
  }

  const response = await threadOutput(message);
  return response;
};

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

export { threadOutput, extractDatabase };
