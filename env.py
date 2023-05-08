import os
import io

# from dotenv import load_dotenv, dotenv_values
# load_dotenv()

# config = dotenv_values('.env')
# config = dict(config)

root = './static/js'

config = os.environ

def find_between(s, start, end):
    return (s.split(start))[1].split(end)[0]

for chunk in os.listdir(root):
    with io.open(root + '/' + chunk, 'r+', encoding='utf-8') as file: 
        lines = file.readlines()
        newlines = []
        temp = ''
        newline = ''
        for index, line in enumerate(lines):
            newline = line
            while '<[REACT_APP' in newline:
                key = find_between(newline, '<[', ']>')
                print(key)
                newline = newline.replace('<[' + key + ']>', config[key])
                print('change success')
            newlines.append(newline)
            print('add success')
    with io.open(root + '/' + chunk, 'wb') as file:
                for line in newlines:
                    file.write(line.encode('utf-8'))

# os.system('nginx -g \"daemon off;\"')