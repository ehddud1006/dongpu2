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
keywords = ['1인분 주문','프랜차이즈','치킨','피자/양식','중국집','한식','일식/돈까스','족발/보쌈','야식','분식','카페/디저트','편의점/마트']
keyword= '중국집'
# 웹페이지 해당 주소 이동
driver.get("https://www.yogiyo.co.kr/mobile/#/")
# 로딩이 끝날때 까지 10초 기다림, 10초전에 로딩이 끝나면 빨리 끝난다.
driver.implicitly_wait(10) 

duplicate = ['롯데리아-부산전포점']

# 메뉴 탐색 
for keyword in keywords :
    keyword = '치킨'
    if os.path.exists(f'요기요/{keyword}') :
        pass
    else:
        os.mkdir(f'요기요/{keyword}')
    time.sleep(2)    
    menuss = driver.find_elements_by_css_selector(".category-title")
    for menu in menuss :
        print(menu.text)
        # 탐색한 메뉴와 일치할 경우 클릭
        if menu.text == keyword :
            menu.click()
            break
    time.sleep(1)
    
    #무한 스크롤
    Scroll()

    # 상품 정보 div 
    items = driver.find_elements_by_css_selector(".item.clearfix")
    restaurant_names = []
    for item in items :
            name = item.find_element_by_css_selector(".restaurant-name ").text
            # stars = item.find_element_by_css_selector(".ico-star1").text
            # try :
            #     stars = float(stars[1:])
            # except:
            #     stars = 0
            # print(name,stars)
            restaurant_names.append(name)

    visit = [True]*len(restaurant_names)
    index = 0


    while True :
        print(f'index: {index}')
        Scroll()

        if index == len(restaurant_names):
            break
        items = driver.find_elements_by_css_selector(".item.clearfix")
        for item in items :
            # if item.find_element_by_css_selector(".restaurant-name").text in duplicate :
            #     print(item.find_element_by_css_selector(".restaurant-name").text)
            #     continue
            if item.find_element_by_css_selector(".restaurant-name").text == restaurant_names[index] and visit[index]:
                print(f'+++++++++++++++++++++++++{restaurant_names[index]}+++++++++++++++++++++++')
                if os.path.exists(f'요기요/{keyword}/{restaurant_names[index]}') :
                    # 기존 pass에서 폴더가 존재한다면 이미 크롤링을 하였으므로 coninue를 한다.
                    index+=1
                    continue
                else:
                    os.mkdir(f'요기요/{keyword}/{restaurant_names[index]}')
                time.sleep(1)
                visit[index]=False
                imgUrl =  item.find_element_by_css_selector(".logo").get_attribute("style")
                parsingImgUrl = imgUrl[22:]
                realImgUrl = ""
                for w in parsingImgUrl :
                    if w == ')' :
                        break
                    else :
                        realImgUrl += w
             
                plz = urllib.parse.quote(realImgUrl[1:-1])
                # 지옥 같던 오류를 극복하기위해서
                plz = plz.replace("%3A",":")
                urllib.request.urlretrieve(plz,f'요기요/{keyword}/{restaurant_names[index]}/{restaurant_names[index]}로고.png')
                time.sleep(1)
                print(f'{location}\\{keyword}\\{restaurant_names[index]}\\{restaurant_names[index]}로고.png')
                r_name = restaurant_names[index]
                stars = item.find_element_by_css_selector(".ico-star1").text
                minimum_cost = item.find_element_by_css_selector(".min-price").text
                print(minimum_cost)
                minimum_cost = fee(minimum_cost)
                try :
                    stars = float(stars[1:])
                except:
                    stars = 0 
                item.find_element_by_css_selector(".restaurant-name").click()
                time.sleep(1)
                delivery_fee = driver.find_element_by_css_selector(".list-group-item.clearfix.text-right.ng-binding").text
                print(delivery_fee)
                delivery_fee = fee(delivery_fee)
                print(r_name,stars,minimum_cost,delivery_fee)
                sql = "insert into RESTAURANT_MAIN (RESTAURANT_NAME, STARS, IMAGE, MINIMUM_COST, DELIVERY_FEE) values(%s, %s, %s, %s, %s)"
                
                print(f'HAPPY: {restaurant_names[index]}')
                img = InsertBlob(location+ '\\' + keyword + '\\' + restaurant_names[index] + '\\' + restaurant_names[index]+'로고.png' )
                # 5. SQL 구문 실행하기
                cursor.execute(sql,(r_name,stars,img,minimum_cost,delivery_fee))
                
                # 6. DB에 Complete 하기
                db.commit()

                

                opener = urllib.request.build_opener()
                opener.addheaders = [('User-Agent','Mozila/5.0')]
                urllib.request.install_opener(opener)
                toggles = driver.find_elements_by_css_selector(".icon-arr-down")
                for toggle in toggles :
                    try :
                        toggle.click()
                    except:
                        continue
                    time.sleep(1)
                foods = driver.find_elements_by_css_selector(".photo-menu") 
                for food in foods:
                    name = food.find_element_by_css_selector(".menu-name").text
                    name = clean_text(name)  
                    price = food.find_element_by_css_selector(".menu-price").text 
                    if name == "" and price == "":
                        continue
                    price = fee(price)
                    try :
                        photo = food.find_element_by_css_selector(".photo").get_attribute("style")
                        parsingPhoto = photo[22:]
                        # print(parsingPhoto)
                        
                        realPhoto = ""
                        for w in parsingPhoto :
                            if w == '?' : 
                                break
                            else :
                                realPhoto += w
                        plz = urllib.parse.quote(realPhoto[1:])
                        # 지옥 같던 오류를 극복하기위해서
                        plz = plz.replace("%3A",":")
                        plz = plz.replace("25","")
                        urllib.request.urlretrieve(plz,f'요기요/{keyword}/{restaurant_names[index]}/{name}.png')
                        time.sleep(1)
                    except :
                        urllib.request.urlretrieve("https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif",f'요기요/{keyword}/{restaurant_names[index]}/{name}.png')
                        time.sleep(1)
                    
                    sql = "SELECT ID FROM RESTAURANT_MAIN WHERE RESTAURANT_NAME LIKE %s"
                    cursor.execute(sql,r_name)
                    result = cursor.fetchone()
                    id = int(result[0])
                    print(id)
                    print(f'{name} {price} {id}') 
                    sql2 = "insert into RESTAURANT_DETAIL (MENU_NAME, PRICE, IMAGE, ID) values(%s, %s, %s, %s)"
                    
                    img = InsertBlob(location+ '\\' + keyword + '\\' + restaurant_names[index] + '\\' +name+'.png' )
               
                    # 5. SQL 구문 실행하기
                    cursor.execute(sql2,(name,price,img,id))
                    
                    # 6. DB에 Complete 하기
                    db.commit()
                break
        index +=1    
        driver.back()
        time.sleep(2)


    break    
time.sleep(10000) 
