# 1. 라이브러리 가져오기
import pymysql
import os
# print(os.path.realpath(__file__))
# print(os.getcwd())
# print(os.path.dirname(os.path.realpath(__file__)) )
location = os.path.dirname(os.path.realpath(__file__))
# 2. 접속하기
db = pymysql.connect(host='localhost', port=3306, user='root', passwd='ehdrnajd55!', db='yogiyo', charset='utf8')
cursor = db.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS Images (id INTEGER(45) NOT NULL AUTO_INCREMENT PRIMARY KEY, Photo LONGBLOB NOT NULL)")

def InsertBlob(FilePath):
    with open(FilePath, "rb") as File:
        BinaryData = File.read()
    SQLStatement = "INSERT INTO Images (Photo) VALUES (%s)"
    cursor.execute(SQLStatement,(BinaryData, ))
    db.commit()

def RetrieveBlob(ID):
    SQLStatement2 = "SELECT * FROM Images WHERE id = '{0}'"
    cursor.execute(SQLStatement2.format(str(ID)))
    MyResult = cursor.fetchone()[1]
    StoreFilePath = location+ '\\'+"ImageOutputs/img{0}.jpg".format(str(ID))
    print(MyResult)
    with open(StoreFilePath, "wb" ) as File :
        File.write(MyResult)
        File.close()

print("1. Insert Image\n2. Read Image")
MenuInput = input()
if int(MenuInput) == 1 :
    UserFilePath = input("Enter File Path:")
    print(location + '\\' + UserFilePath)
    InsertBlob(location + '\\' + UserFilePath)
elif int(MenuInput) == 2:
    UserIDChoice = input("Enter ID:")
    RetrieveBlob(UserIDChoice)

db.close()