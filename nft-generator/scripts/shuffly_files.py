import os
import random
import shutil
import json


image_dir = "../final_files/images/"
json_dir = "../final_files/json/"

output_image_dir = "../final_files/output/images/"
output_json_dir = "../final_files/output/json/"


description_slug = "Remember to replace this description"
ipfsuri_slug = "NewUriToReplace"

description = "Just a nounish !egg. ⌐◨-◨"
ipfs_uri = "bafybeih32pdbe2ngk4ypo4mjxtxd6cady7xyqrqx32prg5eh5vcehztuda"

nfts = os.listdir(image_dir)
nfts_backup = nfts
supply = len(nfts)


for file in os.listdir(output_image_dir):
    os.remove(output_image_dir+file)

for file in os.listdir(output_json_dir):
    os.remove(output_json_dir+file)

count = 0
for n in range(1, supply):
    count += 1
    print(n)
    nft = random.choice(nfts)
    nfts.remove(nft)
    shutil.copyfile(image_dir+nft, output_image_dir+str(n)+os.path.splitext(nft)[1])

    number = os.path.splitext(nft)[0]
    print(nft)
    with open(json_dir+os.path.splitext(nft)[0]+'.json', 'r', encoding="UTF8") as _file:
      _content = _file.read()
    _json = json.loads(_content)
    _name = _json["name"]
    _image_uri = _json["image"]
    _json["name"] = _name.replace(str(number), str(n))
    _json["description"] = description
    _json["image"] = (_image_uri.replace("NewUriToReplace", ipfs_uri)).replace(str(number), str(n))
    _json["edition"] = n

    with open(output_json_dir+str(n)+'.json', "w") as _file:
      _file.write(json.dumps(_json))