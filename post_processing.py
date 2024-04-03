# import anthropic
# import os

# client = anthropic.Anthropic(
#      api_key="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"
# )

# with open('Text/class10.txt', 'r') as file:
#     # Read the entire contents of the file into a string
#     file_contents = file.read()


# message = client.messages.create(
#     model="claude-3-opus-20240229",
#     max_tokens=1000,
#     temperature=0.0,
#     system="As an AI assistant tutor, your task is to take notes on an entire lecture's audio transcription and generate in-depth study notes/materials without omitting any details or examples provided during the lecture. Your output should be formatted professionally, focusing solely on the relevant information from the lecture. Your objective is to produce comprehensive notes that encapsulate all the key concepts, explanations, and examples presented by the lecturer. Avoid any conversational style used by the lecturer and prioritize jotting down everything mentioned in your output.",
#     messages=[
#         {"role": "user", "content": file_contents}
#     ]
# )

# print(message.content[0].text)

#constraints  
#   - maximum file size is 512 MB and no more than 2,000,000
#   - Retrieval is priced at $0.20/GB per assistant per day.

from openai import OpenAI
client = OpenAI()

print(client.files.list())

