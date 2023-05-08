import io
import sys
import shutil
import os
import json

env = sys.argv[1]

config = os.environ

def find_between(s, start, end):
    return (s.split(start))[1].split(end)[0]

# change index.html in bundle
with io.open('./index.html', 'r+', encoding='utf-8') as file:
    lines = file.readlines()
    newlines = []
    temp = ''
    newline = ''
    for index, line in enumerate(lines):
        newline = line
        while '~[' in newline:
            key = find_between(newline, '~[', ']~')
            newline = newline.replace('~[' + key + ']~', config[key])
        newlines.append(newline)
with io.open('./index.html', 'wb') as file:
            for line in newlines:
                file.write(line.encode('utf-8'))

logo_root = './static/media'
asset_root = './config/' + env


# change another asset in bundle
shutil.copytree('config/' + env, './', dirs_exist_ok=True)

# change manifest in bundle
manifest_file = open('./manifest.json', 'r')
manifest_json = json.load(manifest_file)
manifest_file.close()

manifest_json["short_name"] = config["SHORT_NAME"]
manifest_json["name"] = config["NAME"]

manifest_file = open('./manifest.json', 'w')
json.dump(manifest_json, manifest_file, indent = 4,)
manifest_file.close()

# call another function
os.system('python env.py && nginx -g \"daemon off;\"')