# 무한스크롤 하면서 icon-arr-down이면 모두클릭
# ng-scope photo-menu 
# menu-name ng-binding
# ng-binding
import time
import pyautogui
import urllib
import urllib.parse
import os 
import re

from urllib.request import urlopen, urlretrieve

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
# https://wookidocs.tistory.com/127
# chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])
# chrome_options.add_argument("--incognito")
# chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-setuid-sandbox")
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])

# browser = webdriver.Chrome('chromedriver', chrome_options=chrome_options)
service = Service(executable_path=ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

location = os.path.dirname(os.path.realpath(__file__))
print(location)

#특수문자 제거
def clean_text(inputString):
  text_rmv = re.sub('[-=+,#/\?:^.@*\"※~ㆍ!』><‘|\(\)\[\]`\'…》\”\“\’·]', ' ', inputString)
  return text_rmv

# 요금 추출 
def fee(strr):
    print(f'strr:{strr}')
    money = ''
    key = True
    for w in strr :
        if w.isdigit() :
            key = False
            money += w
        elif w == ",":
            continue
        else :
            if not key :
                break
    print(f'money:{money}') 
    if money == "":
        return 0
    else:       
        return int(money)

# 이미지파일 저장
def InsertBlob(FilePath):
    with open(FilePath, "rb") as File:
        BinaryData = File.read()
    # SQLStatement = "INSERT INTO RESTAURANT_MAIN (IMAGE) VALUES (%s)"
    # print(SQLStatement)
    # cursor.execute(SQLStatement,(BinaryData, ))
    # db.commit()
    return BinaryData


#이미지 파일 읽기 
def RetrieveBlob(ID):
    SQLStatement2 = "SELECT * FROM Images WHERE id = '{0}'"
    cursor.execute(SQLStatement2.format(str(ID)))
    MyResult = cursor.fetchone()[1]
    StoreFilePath = location+ '\\'+"ImageOutputs/img{0}.jpg".format(str(ID))
    print(MyResult)
    with open(StoreFilePath, "wb" ) as File :
        File.write(MyResult)
        File.close()

def Scroll() :
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

    time.sleep(1)

import pymysql

# 2. 접속하기
# db = pymysql.connect(host='localhost', port=3306, user='root', passwd='ehdrnajd55!', db='yogiyo', charset='utf8')
db = pymysql.connect(host='15.165.173.28', port=3306, user='kdy', passwd='rlaehdDUD@#34', db='kdy', charset='utf8')
# 3. 커서 가져오기
cursor = db.cursor()

# keyword = pyautogui.prompt("검색어를 입력하세요")
# keywords = ['1인분 주문','프랜차이즈','치킨','피자/양식','중국집','한식','일식/돈까스','족발/보쌈','야식','분식','카페/디저트','편의점/마트']
# keyword= '중국집'
# 웹페이지 해당 주소 이동
driver.get("https://www.museum.go.kr/site/main/archive/post/article_18228")
# 로딩이 끝날때 까지 10초 기다림, 10초전에 로딩이 끝나면 빨리 끝난다.
driver.implicitly_wait(10) 

posting = driver.find_element_by_xpath('//*[@id="contents"]/div[2]/div/div/div[1]/div[2]/div[1]')
# posting.click()
driver.implicitly_wait(2)
print(posting.text)
# restaurant_info = driver.find_element_by_xpath('//*[@id="info"]/div[2]/div').text
# print(restaurant_info)
# business_hours = driver.find_element_by_xpath('//*[@id="info"]/div[2]/p[1]/span').text
# telephone_number = driver.find_element_by_xpath('//*[@id="info"]/div[2]/p[2]/span').text
# address = driver.find_element_by_xpath('//*[@id="info"]/div[2]/p[3]/span').text
# min_cost = driver.find_element_by_xpath('//*[@id="info"]/div[3]/p[1]/span').text
# payment_method = driver.find_element_by_xpath('//*[@id="info"]/div[3]/p[2]/span').text
# company_name = driver.find_element_by_xpath('//*[@id="info"]/div[4]/p[1]/span').text
# business_number = driver.find_element_by_xpath('//*[@id="info"]/div[4]/p[2]/span').text
# food_origin = driver.find_element_by_xpath('//*[@id="info"]/div[5]/pre').text

# print(business_hours)
# print(telephone_number)
# print(address)
# print(min_cost)
# print(payment_method)
# print(company_name)
# print(business_number)
# print(food_origin)

time.sleep(10)