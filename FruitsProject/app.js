//test.js

const mongoose = require('mongoose');
const { Db } = require('mongoose/node_modules/mongodb');

// console.log("HH")
//mongodb에 연결하고 fruitsDB를 생성하는 코드
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

// insert
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    // 필수 항목
    // https://mongoosejs.com/docs/validation.html#built-in-validators
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    // 유효성 검사
    min: 1,
    max: 10
  },
  review: String
})

const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
})

const People = mongoose.model("People", peopleSchema)
const Fruit = mongoose.model("Fruit", fruitSchema)

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great fruit."
})

// pineapple.save()

// db.peoples.find()
// { "_id" : ObjectId("61f1232961167bab0e20d34e"), "name" 
// : "Amy", "age" : 12, "favouriteFruit" : { "name" : "Pineapple", "review" : "Great fruit.",
//  "_id" : ObjectId("61f1232961167bab0e20d34d") }, "__v" : 0 }

// db.fruits.find()
// { "_id" : ObjectId("61f1232961167bab0e20d34d"), "name" 
// : "Pineapple", "review" : "Great fruit.", "__v" : 0 } 
// 추가된 pineapple의 아이디가 동일한 것을 알 수 있다.
// const people = new People({
//   name: "Amy",
//   age: 12,
//   favouriteFruit: pineapple
// })

// people.save()


const people = new People({
  name: "John",
  age: 37

})

people.save()


// 여러개의 data를 입력하는 방법
// const kiwi = new Fruit({
//   name: "kiwi",
//   rating: 9,
//   review: "The best fruits!"
// })

// kiwi.save()
// const orange = new Fruit({
//   name: "Orange",
//   score: 4,
//   review: "Too sour for me"
// })

// const banana = new Fruit({
//   name: "Banana",
//   score: 3,
//   review: "Weird texture"
// })

// // Fruit.insertMany([kiwi, orange, banana], function (err) {
// //   if (err) {
//     console.log(err)
//   }
//   else {
//     console.log("Succesfully saved all the fruits to fruitsDB")
//   }
// })

// console.log("WW")

// const peach = new Fruit({
//   name: "peach",
//   rating: 9,
//   review: "The best fruits!"
// })

// peach.save()

// find
Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err)
  }
  else {
    let fruitName = new Set();
    fruits.forEach(element => {
      fruitName.add(element.name)
    })
    fruitName.forEach(e => {
      console.log(e)
    })

  }
})

// mongoose.connection.close()


// update
// { "_id" : ObjectId("61f1182b975d6849db1e5c8c"), "name" 
// : "peach", "rating" : 9, "review" : "The best fruits!", "__v" : 0 }
// Fruit.updateOne({ _id: "61f1182b975d6849db1e5c8c" }, { name: "Mango" }, function (err) {
//   if (err) {
//     console.log(err)
//   }
//   else {
//     console.log("Successfully updated the document.")
//   }
// })
People.updateOne({ _id: "61f125bfe08e371640a19e74" }, { favouriteFruit: pineapple }, function (err) {
  if (err) {
    console.log(err)
  }
  else {
    console.log("Successfully updated the document.")
  }
})

// { "_id" : ObjectId("61f1182b975d6849db1e5c8c"), "name"
// : "Mango", "rating" : 9, "review" : "The best fruits!", "__v" : 0 }
// 이름이 망고로 바뀐것을 확인할 수 있다.


// delete
// mongoose 문서 https://mongoosejs.com/docs/models.html#deleting
// Fruit.deleteOne({ _id: "61f11a4b8f6b73ef4842e5f0" }, function (err) {
//   if (err) return handleError(err);
//   // deleted at most one tank document
//   else {
//     console.log("Successfully deleted the document.")
//   }
// });

// People.deleteMany({ name: "John" }, function (err) {
//   if (err) {
//     console.log(err)
//   }
//   else {
//     console.log("Successfully deleted111 the document.")
//   }
// });