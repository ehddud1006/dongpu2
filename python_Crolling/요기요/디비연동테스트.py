# 1. 라이브러리 가져오기
import pymysql

# 2. 접속하기
db = pymysql.connect(host='localhost', port=21, user='kdy', passwd=' rlaehdDUD@#34', db='yogiyo', charset='utf8')

# 3. 커서 가져오기
cursor = db.cursor()

# 4. SQL 구문 만들기 (CRUD SQL 구문 등)
sql = '''
    CREATE TABLE RESTAURANT_MAIN (
        ID INT NOT NULL AUTO_INCREMENT,
        RESTAURANT_NAME VARCHAR(50) NOT NULL,
        STARS FLOAT,
        MINIMUM_COST INT,
        DELIVERY_FEE INT,
        PRIMARY KEY(ID)
    );
'''

r_name = "식당이름"
stars = 4.0
minimum_cost = 3000
delivery_fee = 3000
# sql = """INSERT INTO RESTAURANT_MAIN (
#                     RESTAURANT_NAME, STARS, MINIMUM_COST, DELIVERY_FEE) VALUES(
#                     '""" + r_name + """', """ + str(stars) + """ , """ + str(minimum_cost) + """,
#                     """ + str(delivery_fee) + """)
#                     );
#                 """
# sql = "insert into RESTAURANT_MAIN (RESTAURANT_NAME, STARS, MINIMUM_COST, DELIVERY_FEE) values(%s, %s, %s, %s)"

sql = "SELECT ID FROM RESTAURANT_MAIN WHERE RESTAURANT_NAME LIKE %s"
# 5. SQL 구문 실행하기
# cursor.execute(sql,(r_name,stars,minimum_cost,delivery_fee))
cursor.execute(sql,'요달의찜닭-부암점')
result = cursor.fetchone()
print(result)
print(result[0])
# 6. DB에 Complete 하기
db.commit()

# 7. DB 연결 닫기
db.close()