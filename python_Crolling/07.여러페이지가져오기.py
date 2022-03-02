import requests
from bs4 import BeautifulSoup
import pyautogui

keyword = pyautogui.prompt("검색어를 입력하세요")
lastpage = pyautogui.prompt("마지막 페이지번호를 입력해주세요")
pageNum = 1
for i in range(1,int(lastpage)*10,10):
    print(f"&&&&&&&&&&&&&&&&&{pageNum}페이지 입니다 ================")
    response = requests.get(f"https://search.naver.com/search.naver?where=news&sm=tab_pge&query={keyword}&sort=0&photo=0&field=0&pd=0&ds=&de=&cluster_rank=189&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:all,a:all&start={i}")
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
    pageNum = pageNum + 1 

