import requests
from bs4 import BeautifulSoup

response = requests.get("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90")
# get 요청을 한 html을 얻기 위해서는 response.text
html = response.text
soup = BeautifulSoup(html,'html.parser')
# select_one 이 아닌 select를 사용하게 되면 list에 담겨서 정보가 넘어온다.
links = soup.select(".news_tit")
# print(links)
# 리스트에서 하나씩 꺼내어서 title을 뽑아낸다.
for link in links :
    title = link.text
    # href의 속성값을 가져온다.
    url = link.attrs['href']
    print(title,url)
    # print(title)