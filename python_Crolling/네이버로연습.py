import requests
from bs4 import BeautifulSoup

response = requests.get("https://www.naver.com/")
# get 요청을 한 html을 얻기 위해서는 response.text
html = response.text
soup = BeautifulSoup(html,'html.parser')
words = soup.find_all("a","nav")
# word = soup.select_one("#NM_set_home_btn")
for word in words:
    print(word.text)

import os
if not os.path.isdir('./{}'.format('자장면')):
    os.mkdir('/{}'.format('자장면'))