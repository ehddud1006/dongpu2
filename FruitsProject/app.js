//test.js

const mongoose = require('mongoose')

console.log("HH")
//mongodb에 연결하고 fruitsDB를 생성하는 코드
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

// insert
const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
})

const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number
})

const People = mongoose.model("People", peopleSchema)
const Fruit = mongoose.model("Fruit", fruitSchema)

const people = new People({
  name: "John",
  age: 37

})

people.save()

const kiwi = new Fruit({
  name: "kiwi",
  score: 10,
  review: "The best fruits!"
})

const orange = new Fruit({
  name: "Orange",
  score: 4,
  review: "Too sour for me"
})

const banana = new Fruit({
  name: "Banana",
  score: 3,
  review: "Weird texture"
})

Fruit.insertMany([kiwi, orange, banana], function (err) {
  if (err) {
    console.log(err)
  }
  else {
    console.log("Succesfully saved all the fruits to fruitsDB")
  }
})

console.log("WW")


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