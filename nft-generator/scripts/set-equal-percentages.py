import os

layers = [
    "Bgs",
    "Eggs",
    "Glasses",
    "Extra",
    "Mouth"
]

for layer in layers:
    files = os.listdir(f'./../layers/{layer}')
    number_of_files = len(files)
    percentage = int(100/number_of_files)
    for file in files:
        file_basename = os.path.basename(f'./../layers/{layer}/{file}').replace('.png', '').replace('-', '')
        print(file_basename)
        new_name = file_basename.split("#")[0] + f"#{str(percentage)}.png"
        print(new_name)
        os.rename(f'./../layers/{layer}/{file}', f'./../layers/{layer}/{new_name}')