import os
import json

from attr import attr

metadata_files = os.listdir("../final_files/output/json/")

try:
    metadata_files.remove("_metadata.json")
except:
    print()

description_slug = "Remember to replace this description"
ipfsuri_slug = "NewUriToReplace"

legends = []

ipfs_uri = "bafybeiceaiae7ptzku6lpw4rhs5q6sd35ukpkhktz6ehwc67gytkzrtywm"

_metadatas = []
  
for file in metadata_files:
    with open("../final_files/output/json/"+file, "r", encoding="utf8") as _file:
      _content = _file.read()
    _json = json.loads(_content)
    print(file)
    _ext = ".gif" if os.path.exists('../final_files/output/images/%s.gif' % str(_json["edition"])) else ".png"
    assert os.path.exists("../final_files/output/images/%s%s" % (str(_json["edition"]), _ext))

    for attribute in _json["attributes"]:
        if attribute["trait_type"] == "Bgs":
            attribute["trait_type"] = "Background"

        if attribute["trait_type"] == "Eggs":
            attribute["trait_type"] = "Egg"

    _json["image"] = "ipfs://%s/%s%s" % (ipfs_uri, str(_json["edition"]), _ext)
    with open("../final_files/output/json/"+file, "w") as _file:
        _file.write(json.dumps(_json))
    print(_json["image"].split(ipfs_uri+"/")[1])
    _metadatas.append(_json)

with open("../final_files/output/json/_metadata.json", "w") as _file:
    _file.write(json.dumps(_metadatas))