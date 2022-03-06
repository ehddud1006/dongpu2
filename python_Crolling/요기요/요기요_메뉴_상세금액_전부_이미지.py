# 무한스크롤 하면서 icon-arr-down이면 모두클릭
# ng-scope photo-menu 
# menu-name ng-binding
# ng-binding
import time
from urllib.request import urlopen, urlretrieve
import pyautogui
from selenium import webdriver

from selenium.webdriver.chrome.service import Service

from selenium.webdriver.chrome.options import Options

from selenium.webdriver.common.keys import Keys
import urllib
import urllib.parse
import os 


# 크롬 드라이버 자동 업데이트

from webdriver_manager.chrome import ChromeDriverManager



# 브라우저 꺼짐 방지

chrome_options = Options()

chrome_options.add_experimental_option("detach", True)



# 불필요한 에러 메시지 없애기

chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])



service = Service(executable_path=ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)




# keyword = pyautogui.prompt("검색어를 입력하세요")
keyword= '야식'
# 웹페이지 해당 주소 이동
driver.get("https://www.yogiyo.co.kr/mobile/#/")
# 로딩이 끝날때 까지 10초 기다림, 10초전에 로딩이 끝나면 빨리 끝난다.
driver.implicitly_wait(10) 

# 메뉴 탐색 
menuss = driver.find_elements_by_css_selector(".category-title")
for menu in menuss :
    print(menu.text)
    # 탐색한 메뉴와 일치할 경우 클릭
    if menu.text == keyword :
        menu.click()

time.sleep(2)
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
# 상품 정보 div 
items = driver.find_elements_by_css_selector(".item.clearfix")
restaurant_names = []
for item in items :
        name = item.find_element_by_css_selector(".restaurant-name ").text
        restaurant_names.append(name)

print(len(restaurant_names))
visit = [True]*len(restaurant_names)
# print(items)
# time.sleep(10000)
index = 0



# opener = urllib.request.build_opener()
# opener.addheaders = [('User-Agent','Mozila/5.0')]
# urllib.request.install_opener(opener)


while True :
    if index == len(restaurant_names):
        break
    items = driver.find_elements_by_css_selector(".item.clearfix")
    for item in items :
        if item.find_element_by_css_selector(".restaurant-name").text == restaurant_names[index] and visit[index]:
            print(f'+++++++++++++++++++++++++{restaurant_names[index]}+++++++++++++++++++++++')
            if os.path.exists(f'요기요/{restaurant_names[index]}') :
                pass
            else:
                os.mkdir(f'요기요/{restaurant_names[index]}')
            visit[index]=False
            imgUrl =  item.find_element_by_css_selector(".logo").get_attribute("style")
            parsingImgUrl = imgUrl[22:]
            realImgUrl = ""
            for w in parsingImgUrl :
                if w == ')' :
                    break
                else :
                    realImgUrl += w
            # print(imgUrl[22:-2])
            # print(urllib.parse.quote(realImgUrl[1:-1]))
            plz = urllib.parse.quote(realImgUrl[1:-1])
            # 지옥 같던 오류를 극복하기위해서
            plz = plz.replace("%3A",":")
            # print(plz)
            # print(realImgUrl[1:-1])
            # print("https://rev-static.yogiyo.co.kr/franchise_logos/%EC%B2%98%EA%B0%93%EC%A7%91%EC%B9%98%ED%82%A8_20151228_Franchise%EC%9D%B4%EB%AF%B8%EC%A7%80%EC%95%BD%EC%A0%95%EC%84%9C_crop_200x200_ZaH9UvS.jpg")
            urllib.request.urlretrieve(plz,f'요기요/{restaurant_names[index]}/{restaurant_names[index]}로고.png')
            # urlretrieve(urllib.parse.quote(realImgUrl[1:-1]),'.test.jpg')
            time.sleep(1)
            item.find_element_by_css_selector(".restaurant-name").click()
            time.sleep(1)
            opener = urllib.request.build_opener()
            opener.addheaders = [('User-Agent','Mozila/5.0')]
            urllib.request.install_opener(opener)
            toggles = driver.find_elements_by_css_selector(".icon-arr-down")
            for toggle in toggles :
                toggle.click()
            foods = driver.find_elements_by_css_selector(".photo-menu") 
            for food in foods:
                name = food.find_element_by_css_selector(".menu-name").text  
                price = food.find_element_by_css_selector(".menu-price").text 
                if name == "" and price == "":
                    continue
                try :
                    photo = food.find_element_by_css_selector(".photo").get_attribute("style")
                    parsingPhoto = photo[22:]
                    print(parsingPhoto)
                    
                    realPhoto = ""
                    for w in parsingPhoto :
                        if w == '?' : 
                            break
                        else :
                            realPhoto += w
                    print(realPhoto[1:])
                    plz = urllib.parse.quote(realPhoto[1:])
                    # plz = realPhoto[1:-1]
                    print(plz)
                    # 지옥 같던 오류를 극복하기위해서
                    plz = plz.replace("%3A",":")
                    plz = plz.replace("25","")
                    print(plz)
                    # time.sleep(100)
                    urllib.request.urlretrieve(plz,f'요기요/{restaurant_names[index]}/{name}.png')
                    time.sleep(1)
                except :
                    urllib.request.urlretrieve("https://3.bp.blogspot.com/-ZKBbW7TmQD4/U6P_DTbE2MI/AAAAAAAADjg/wdhBRyLv5e8/s1600/noimg.gif",f'요기요/{restaurant_names[index]}/{name}.png')
                    time.sleep(1)
                print(f'{name} {price}') 
            break
    driver.back()
    time.sleep(2)
            # print(f"{restaurant_names[index]},True")
    
    index +=1

time.sleep(10000)
for item in items :
        # print(item)
        # print(item.find_element_by_css_selector(".restaurant-name").text)
        item.find_element_by_css_selector(".restaurant-name").click()
        toggles = driver.find_elements_by_css_selector(".icon-arr-down")
        for toggle in toggles :
            toggle.click()
        foods = driver.find_elements_by_css_selector(".photo-menu") 
        for food in foods:
            name = food.find_element_by_css_selector(".menu-name").text  
            price = food.find_element_by_css_selector(".menu-price").text 
            if name == "" and price == "":
                continue
            print(f'{name} {price}') 
        driver.back()
        continue
        # time.sleep(10000)
        # try :
        #     price = item.find_element_by_css_selector(".min-price").text
        # except :
        #     price = "판매중단"
        # print(name,price)
    

# # 검색창 클릭
# search = driver.find_element_by_css_selector('.co_srh_input._input')
# search.click()

# # 검색어 입력 
# search.send_keys('아이폰 13')
# search.send_keys(Keys.ENTER)

# # 스크롤 전 높이
# # execute_script는 자바스크립트를 실행할 수 있다.
# before_h = driver.execute_script("return window.scrollY")

# # 무한 스크롤 
# while True :
#     # 맨 아래로 스크롤을 내린다.
#     driver.find_element_by_css_selector("body").send_keys(Keys.END)

#     # 스크롤 사이 페이지 로딩 기간
#     time.sleep(1)

#     # 스크롤 후 높이
#     after_h = driver.execute_script("return window.scrollY")

#     if after_h == before_h :
#         break

#     before_h = after_h

# # 상품 정보 div 
# items = driver.find_elements_by_css_selector(".basicList_info_area__17Xyo")

# for item in items :
#     name = item.find_element_by_css_selector(".basicList_title__3P9Q7").text
#     try :
#         price = item.find_element_by_css_selector(".price_num__2WUXn").text
#     except :
#         price = "판매중단"
#     link = item.find_element_by_css_selector(".basicList_title__3P9Q7 > a").get_attribute('href')
#     print(name,price,link)
time.sleep(10000) 
