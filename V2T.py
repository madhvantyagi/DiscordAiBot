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
    list=file_name.split('Class')
    list=list[-1].strip()
    arr.append(list[0:2])
    if file_name.startswith("CS331"):
        file_arr.append(file_name)
        # print("working")
# print(arr, file_arr)
temp=file_arr[6:len(file_arr)]

# for file_name in temp:
#     print(file_name)
# COMPRESSING THE FILES
arr=arr[6:10]
print(arr)
print(temp)
# for file_name, num in zip(temp,arr):

#     print(file_name, num)
for file_name, num in zip(temp,arr):
    target_file_size_mb = 25  # Target file size in MB
    input_video_path = f"./Videos/{file_name}"
    output_video_path = f"./Videos/Compressed{num}.mp3"
    # Load the input video
    video = VideoFileClip(input_video_path)
    audio=video.audio
    # Calculate the target bitrate to achieve the desired file size
    target_bitrate = int((target_file_size_mb * 8 * 1024 * 1024) / audio.duration)
    # Compress the video by setting the video bitrate
    # compressed_video = video.set_bitrate(target_bitrate)
    # compressed video to the output file
    audio.write_audiofile(output_video_path,  bitrate=f"{target_bitrate}k")
    file_size=os.path.getsize(output_video_path)/(1024*1024)
    print(file_size)
    
from openai import OpenAI

# Create an OpenAI instance with your API key
# client = OpenAI(api_key="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")
# for file, num  in zip(file_arr,  arr):
#     file_num=f"class{num}.txt"
#     audio_file = open(f"./Videos/{file}", "rb")
#     transcript = client.audio.transcriptions.create(
#     model="whisper-1", 
#     file=audio_file, 
#     response_format="text"
#     )
#     with open(file_name, "w", encoding="utf-8") as file:
#         file.write(transcript)

    
# print(transcript)
