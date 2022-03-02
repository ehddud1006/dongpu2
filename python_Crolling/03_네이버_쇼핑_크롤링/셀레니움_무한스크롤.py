import time
from selenium import webdriver

from selenium.webdriver.chrome.service import Service

from selenium.webdriver.chrome.options import Options

from selenium.webdriver.common.keys import Keys


# 크롬 드라이버 자동 업데이트

from webdriver_manager.chrome import ChromeDriverManager



# 브라우저 꺼짐 방지

chrome_options = Options()

chrome_options.add_experimental_option("detach", True)



# 불필요한 에러 메시지 없애기

chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])



service = Service(executable_path=ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)



# 웹페이지 해당 주소 이동
driver.get("https://www.naver.com")
# 로딩이 끝날때 까지 10초 기다림, 10초전에 로딩이 끝나면 빨리 끝난다.
driver.implicitly_wait(10) 

# 쇼핑 메뉴 클릭
driver.find_element_by_css_selector('a.nav.shop').click()
time.sleep(2)

# 검색창 클릭
search = driver.find_element_by_css_selector('.co_srh_input._input')
search.click()

# 검색어 입력 
search.send_keys('아이폰 13')
search.send_keys(Keys.ENTER)

# 스크롤 전 높이
# execute_script는 자바스크립트를 실행할 수 있다.
before_h = driver.execute_script("return window.scrollY")

# 무한 스크롤 
while True :
    # 맨 아래로 스크롤을 내린다.
    driver.find_element_by_css_selector("body").send_keys(Keys.END)

    # 스크롤 사이 페이지 로딩 기간
    time.sleep(1)

    # 스크롤 후 높이
    after_h = driver.execute_script("return window.scrollY")

    if after_h == before_h :
        break

    before_h = after_h

# 상품 정보 div 
items = driver.find_elements_by_css_selector(".basicList_info_area__17Xyo")

for item in items :
    name = item.find_element_by_css_selector(".basicList_title__3P9Q7").text
    try :
        price = item.find_element_by_css_selector(".price_num__2WUXn").text
    except :
        price = "판매중단"
    link = item.find_element_by_css_selector(".basicList_title__3P9Q7 > a").get_attribute('href')
    print(name,price,link)
time.sleep(10000) 
