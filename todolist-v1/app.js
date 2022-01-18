const express = require("express");

const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");

var newItem = "";
var items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = []

app.get("/", function (req, res) {
  // res.sendFile(__dirname + "/index.html");
  var today = new Date();
  // var currentDay = today.getDay();


  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);
  // Date 객체의 날짜 부분을 지역의 언어에 맞는 문자열 표현으로 반환한다.


  // if (currentDay == 6) {
  //   // 6은 토요일 0은 일요일을 뜻한다.
  //   // res.send("weekend")
  //   day = "Saturday";
  // }
  // else if (currentDay == 0) {
  //   // res.send("working day")
  //   // res.write("<p>It is not the weekend.</p>");
  //   // res.write("<h1>YOu Work");
  //   // res.send()

  //   // 다시한번 상기시키자 res.write()는 버퍼에 쓰고
  //   // send를 통해 전부 보낸다.
  //   day = "Sunday"
  // }
  // else if (currentDay == 1) {
  //   day = "Monday"
  // }
  // else if (currentDay == 2) {
  //   day = "Tuesday"
  // }
  // else if (currentDay == 3) {
  //   day = "Wednesday"
  // }
  // else if (currentDay == 4) {
  //   day = "Thursday"
  // }
  // else if (currentDay == 5) {
  //   day = "Friday"
  // }
  res.render("list", { listTitle: day, newListItems: items })




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
  var newItem = req.body.newItem;



  console.log(req.body)
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

  if (req.body.list === "Work") {
    workItems.push(newItem)
    res.redirect("/work")
  }
  else {
    items.push(newItem)
    res.redirect("/")
  }
  // redirect을 하면 app.get 으로 가네..




  // render을 한번만 할 수 있어서 redirect를 해주고,
  // 거기에 newItem을 보낸다.
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems })
})

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item)
  res.redirect("/work")
})