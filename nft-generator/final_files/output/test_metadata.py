import os
import json
import sys

for metadata_file in os.listdir('./json'):
    metadata = None
    with open("./json/%s" % metadata_file, "r") as _metadata_file:
        _metadata = _metadata_file.read()
        metadata = json.loads(_metadata)

    _edition = str(metadata["edition"])
    print("Testing Edition: " + str(_edition))
    _image = "%s.gif" % _edition if os.path.exists('./images/%s.gif' %_edition) else "%s.png" % _edition

    # try:
    assert str(_edition) == os.path.splitext(metadata_file)[0]
    assert os.path.exists('./images/%s' % _image)
    print(metadata["image"])
    print("/%s" % _image)
    assert "/%s" % _image in metadata["image"]
    # except:
    #     print(sys.exc_info()[0])
    #     print(metadata_file)