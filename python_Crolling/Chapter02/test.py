import requests
from bs4 import BeautifulSoup

response = requests.get("https://www.naver.com/")
# get 요청을 한 html을 얻기 위해서는 response.text
html = response.text
soup = BeautifulSoup(html,'html.parser')
word = soup.select_one("#NM_set_home_btn")
print(word)