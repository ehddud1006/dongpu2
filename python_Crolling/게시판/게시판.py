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

num = 2
site_url = 'https://www.kocca.kr/cop/noticevent/list.do?menuNo=200827&searchTxt=&searchCondition=&cate=&pageIndex=1'
tr_xpath = '//*[@id="frm"]/div[2]/div'
a = '//*[@id="frm"]/div[3]/a'

# site_url = pyautogui.prompt("사이트를 입력하세요")
# tr_xpath = pyautogui.prompt("tr태그의 xpath를 입력하세요")
# a = pyautogui.prompt("a태그의 xpath를 입력하세요")



# 웹페이지 해당 주소 이동
driver.get(site_url)
# 로딩이 끝날때 까지 10초 기다림, 10초전에 로딩이 끝나면 빨리 끝난다.
driver.maximize_window()
driver.implicitly_wait(10) 



posts = driver.find_elements_by_xpath(tr_xpath)
count = 0
for post in posts :
    count+=1
    print(f'count :{count} post')

# button =  driver.find_element_by_xpath('//*[@id="page"]/div[2]/form/div[2]/p/span/a[2]')
# button.click()


count = 0
while count < 1000 :
    buttons = driver.find_elements_by_xpath(a)
    print(buttons)
    key = False
    for button in buttons :
        # print(button.text)
        print(f'key: {key}')
        print(str(num))
        text = ''
        try :
            text = button.text
        except :
            text = ''
        print(text)
        if text == str(num) :
            print(num)
            # u = button.get_attribute('href')
            # print(u)
            # driver.get(u)
            button.click()
            driver.implicitly_wait(2) 
            num+=1
        elif num % 10 == 1 :
            print(f'a: {text}')
            if key :
                button.click()
                driver.implicitly_wait(2) 
                num+=1
                key=False
            if text.isdigit() and int(text) % 10 == 0 :
                key = True
                
    count +=1

# driver.get('https://www.naver.com')
# while True :
#     driver.find_element_by_xpath(f'//*[@id="page"]/div[2]/form/div[2]/p/span/a[{num}]').click()
#     num+=1
# for button in buttons :
    # print(button.find_elements_by_tag_name('a'))//*[@id="page"]/div[2]/form/div[2]/p/span/a[3]
    # if button.text == str(num) :
    #     button.click()
    #     driver.implicitly_wait(2) 
    # print(button.text == str(num))

# posting.click()
# driver.implicitly_wait(2)

# restaurant_info = driver.find_element_by_xpath('//*[@id="info"]/div[2]/div').text
# print(restaurant_info)

time.sleep(100)