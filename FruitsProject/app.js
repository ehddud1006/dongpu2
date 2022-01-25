//test.js

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//assert는 Node.js 내부에서 테스트를 해보기 위한 모듈이다.

// 연결할 url
const url = 'mongodb://localhost:27017';

// DB 이름
const dbName = 'fruitsDB';

// MongoClient를 생성
const client = new MongoClient(url, { useNewUrlParser: true });

// 서버에 연결하기 위한 connect 메소드
client.connect(function (err) {
  assert.equal(null, err); //equal은 err가 null일 때 넘겨준다
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  findDocuments(db, function () {
    client.close();
  })

});

const insertDocuments = function (db, callback) {
  // 넣을 컬렉션 가져오기
  const collection = db.collection('fruits');
  // 시험삼아 몇 개 넣어보자
  collection.insertMany([
    {
      name: "Apple",
      score: 8,
      review: "Great fruit"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda sour"
    },
    {
      name: "Banana",
      score: 9,
      review: "Great stuff!"
    }
  ], function (err, result) {
    assert.equal(err, null);
    // assert.equal(3, result.result.n);
    // //3개를 insert했으므로 실제 결과가 3이 아니면 Exception
    // assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

//해당 컬렉션의 모든 Document 찾기
const findDocuments = function (db, callback) {
  // 컬렉션 선택
  const collection = db.collection('fruits');
  // 모든 Document를 Find 해보자
  collection.find({}).toArray(function (err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}