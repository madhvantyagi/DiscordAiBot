import re
from typing import List
from openai import OpenAI
import time
import logging

def tokenize(text: str) -> List[str]:
    return re.findall(r'\w+|[^\w\s]', text)

def chunk_text(text: str, chunk_size: int = 2000) -> List[str]:
    tokens = tokenize(text)
    chunks = []
    current_chunk = []
    current_chunk_size = 0

    for token in tokens:
        current_chunk.append(token)
        current_chunk_size += 1

        if current_chunk_size >= chunk_size:
            chunks.append(' '.join(current_chunk))
            current_chunk = []
            current_chunk_size = 0

    if current_chunk:
        chunks.append(' '.join(current_chunk))

    return chunks

# Example usage
with open('Text/class10.txt', 'r') as file:
    text = file.read()

chunks = chunk_text(text)
for index,chunk in enumerate(chunks):
    print("\n \n \n CHUNK NUMBER " +  str(index) + "\n")
    print(chunk)
print(f"Number of chunks: {len(chunks)}")



client = OpenAI(
    api_key='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'
)

thread = client.beta.threads.create(
  messages=[
    {
      "role": "user",
      "content": chunks[0]
    }
  ]
)


run = client.beta.threads.runs.create(
  thread_id=thread.id,
  assistant_id="asst_Gzl6IseEg0shv8QhM1vuUNBD"
)


def wait_for_run_completion(client, thread_id, run_id, sleep_interval=5):
    """

    Waits for a run to complete and prints the elapsed time.:param client: The OpenAI client object.
    :param thread_id: The ID of the thread.
    :param run_id: The ID of the run.
    :param sleep_interval: Time in seconds to wait between checks.
    """
    while True:
        try:
            run = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run_id)
            if run.completed_at:
                elapsed_time = run.completed_at - run.created_at
                formatted_elapsed_time = time.strftime(
                    "%H:%M:%S", time.gmtime(elapsed_time)
                ) 
                print(f"Run completed in {formatted_elapsed_time}")
                logging.info(f"Run completed in {formatted_elapsed_time}")
                # Get messages here once Run is completed!
                messages = client.beta.threads.messages.list(thread_id=thread_id)
                last_message = messages.data[0]
                response = last_message.content[0].text.value
                print(f"Assistant Response: {response}")
                break
        except Exception as e:
            logging.error(f"An error occurred while retrieving the run: {e}")
            break
        logging.info("Waiting for run to complete...")
        time.sleep(sleep_interval)


# === Run ===
wait_for_run_completion(client=client, thread_id=thread.id, run_id=run.id)