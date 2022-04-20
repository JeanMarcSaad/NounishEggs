import os
import shutil

image_files = os.listdir('../final_files/images')

for image in image_files:
    name = os.path.splitext(image)[0]
    shutil.move(f'../build/json/{name}.json', f'../final_files/json/{name}.json')