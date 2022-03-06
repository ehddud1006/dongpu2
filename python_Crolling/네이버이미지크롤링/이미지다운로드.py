# 무한스크롤 하면서 icon-arr-down이면 모두클릭
# ng-scope photo-menu 
# menu-name ng-binding
# ng-binding
import time
import pyautogui
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
driver.get("https://search.naver.com/search.naver?where=image&sm=tab_jum&query=%EC%A7%80%EC%88%98")
# 로딩이 끝날때 까지 10초 기다림, 10초전에 로딩이 끝나면 빨리 끝난다.
driver.implicitly_wait(10) 
# 브라우저 최대화
driver.maximize_window()

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

time.sleep(2)
# 이미지 태그 추출
imgs = driver.find_elements_by_css_selector("._image._listImage")

i = 1
print(imgs)
for i,img in enumerate(imgs,1) :
    # 각 이미지 태그의 주속
    img_src = img.get_attribute("src")
    print(i,img_src)
    i = i+1