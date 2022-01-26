//test.js

const mongoose = require('mongoose')

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
  age: Number
})

const People = mongoose.model("People", peopleSchema)
const Fruit = mongoose.model("Fruit", fruitSchema)

// const people = new People({
//   name: "John",
//   age: 37

// })

// people.save()


// 여러개의 data를 입력하는 방법
const kiwi = new Fruit({
  name: "kiwi",
  rating: 9,
  review: "The best fruits!"
})

kiwi.save()
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


// find
Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err)
  }
  else {
    // mongoose.connection.close()

    let fruitName = new Set();
    fruits.forEach(element => {
      fruitName.add(element.name)
    })
    fruitName.forEach(e => {
      console.log(e)
    })

  }
})