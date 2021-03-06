const express = require("express");
const bodyParser = require("body-parser");
// console.log(__dirname)
const mongoose = require("mongoose");
const e = require("express");
const _ = require("lodash")
// const date = require(__dirname + "/views/date.js")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");

// var newItem = "";
// var items = ["Buy Food", "Cook Food", "Eat Food"];
// let workItems = []

mongoose.connect("mongodb://localhost:27017/todolistDB")

const todolistSchema = new mongoose.Schema({
  name: String
})

const Item = mongoose.model("Item", todolistSchema)

const item1 = new Item({
  name: "Welcome to your todoList!"
})

const item2 = new Item({
  name: "Hit the + button to add a item."
})

const item3 = new Item({
  name: "<-- Hit this to delete an item."
})

const defaultItems = [item1, item2, item3]

const listSchema = new mongoose.Schema({
  name: String,
  items: [todolistSchema]
})

const List = mongoose.model("List", listSchema)


app.get("/", function (req, res) {
  // let day = date()
  // let day = date.getDate()

  Item.find(function (err, items) {
    if (err) {
      console.log(err)
    }
    else {
      if (items.length == 0) {
        Item.insertMany(defaultItems, function (err) {
          if (err) {
            console.log(err)
          }
          else {
            console.log("Insert Success!")
          }
        })
        // items가 빈 배열이라고 하면, db에 데이터를 추가하고 ,
        // 다시 redirect 하여 데이터가 입력된 items 를 다시 find 하기위함이다.
        res.redirect("/")

      }
      // console.log(items)
      res.render("list", { listTitle: "Today", newListItems: items })
    }
  })


});

app.listen(3000, function () {
  console.log("Server Started on port 3000");
});

// ========================  EJS Start  ===========================
// npm i ejs
// ejs 모듈을 설치하자

// app.set("view engine", "ejs");
// 9번째 줄에 추가한다.

// 새폴더를 만든다.
// 이 프로젝트에서는 views 폴더안에 listen.ejs 파일을 생성해주었다.

// 20번째, 32번째 day 변수를 선언해주었다.

// listen.ejs 파일에  <h1>It's a <%= kindOfDay %>!</h1>
// <%= %> ejs 태그를 사용해서 변수명을 입력해준다.

// res.render("list", {kindOfDay:day})
// list.ejs 와 연결시킨다.



app.post("/", function (req, res) {

  let itemName = req.body.newItem;
  let listName = req.body.list
  let item = new Item({
    name: itemName
  })

  if (listName === "Today") {
    item.save()
    // db를 생성하고 반영된 db 정보를 다시 redirect한다.
    res.redirect("/")
  }
  else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item)
      foundList.save()
      res.redirect("/" + listName)
    })
  }


  // console.log(req.body)
  // <button type="submit" name="button" value="a value">+</button>
  // { newItem: 'happy', button: 'a value' }
  // req.body에 value값을 입력하면 button 태그의 값이 정해지게 된다.

  // <button type="submit" name="button" value=<%=listTitle %>>+</button>
  // { newItem: 'gggg', button: 'Work' }
  // button value에 <%= listTitle %> 값을 주었는데 계속 Work가 나와서 
  // 어디서 나온건지 헤맸다 
  // res.render("list", { listTitle: "Work List", newListItems: workItems })
  // 그 이유는 /work 에서  listTitle로 "Work List"를 보내는데
  // 이때 띄어쓰기는 적용이 안되는것 같았다. Work_List로 보내보니
  // { newItem: 'dadavxv', button: 'Work_List' } 
  // 이런 식으로 잘 오게 되었다.

  // if (req.body.list === "Work") {
  //   workItems.push(newItem)
  //   res.redirect("/work")
  // }
  // else {
  //   items.push(newItem)
  //   res.redirect("/")
  // }
  // redirect을 하면 app.get 으로 가네..




  // render을 한번만 할 수 있어서 redirect를 해주고,
  // 거기에 newItem을 보낸다.
});


// app.get("/work", function (req, res) {
//   res.render("list", { listTitle: "Work List", newListItems: workItems })
// })

// app.post("/work", function (req, res) {
//   let item = req.body.newItem;
//   workItems.push(item)
//   res.redirect("/work")
// })

// app.get("/about", function (req, res) {
//   res.render("about")
// })

app.get("/:postName", function (req, res) {
  // console.log(req.params.postName)
  let target = _.capitalize(req.params.postName)

  List.findOne({ name: target }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        //Create a new list
        const list = new List({
          name: target,
          items: defaultItems
        })

        list.save()
        res.redirect("/" + target)
      }
      else {
        // Show an existing list
        res.render("list", { listTitle: foundList.name, newListItems: foundList.items })
      }
    }
  })


})

app.post("/delete", function (req, res) {
  // console.log("HH")
  let checkItemId = req.body.checkbox
  let listName = req.body.listName

  if (listName === "Today") {
    Item.deleteOne({ _id: checkItemId }, function (err) {
      if (err) return handleError(err);
      // deleted at most one tank document
      else {
        console.log("Successfully deleted the document.")
      }
    });
    res.redirect("/")
  }
  else {
    List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkItemId } } }, function (err, foundList) {
      if (!err) {
        res.redirect("/" + listName)
      }
    })
  }
})
// npm i

// npm i mongoose

// const mongoose = require("mongoose")

// mongoose.connect("mongodb://localhost:27017/todolistDB")

// const todolistSchema = new mongoose.Schema({
//   name: String
// })

// const Item = mongoose.model("Item", todolistSchema)

// npm i lodash