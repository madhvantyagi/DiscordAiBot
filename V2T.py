import os
from moviepy.editor import VideoFileClip

# Specify the directory path of the folder containing mp4 video files
folder_path = './Videos'

# Use os.listdir to get a list of all files and directories in the folder
file_list = os.listdir(folder_path)
file_list.sort()
arr=[]
file_arr = []
for file_name in file_list:
    list=file_name.split('class')
    list=list[-1].strip()
    arr.append(list[0:2]) 
    file_arr.append(file_name)
print(arr, file_arr)

# for file_name, num in zip(temp,arr):

    
from openai import OpenAI

# Create an OpenAI instance with your API key
client = OpenAI(api_key="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")
for file, num  in zip(file_arr,  arr):
    file_num=f"class{num}.txt"
    file_name=file_num
    audio_file = open(f"./Videos/{file}", "rb")
    transcript = client.audio.transcriptions.create(
    model="whisper-1", 
    file=audio_file, 
    response_format="text"
    )
    with open(file_name, "w", encoding="utf-8") as file:
        file.write(transcript)

    
print(transcript[1:100])
