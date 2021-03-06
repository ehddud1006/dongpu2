//jshint esversion:6

// 이 프로젝트를 시작하기에 앞서, 현재 이 프로젝트에서 nodemodules이 다운로드 되어있지않고,
// package.json에 종속성만 가지고 있는 상태이다.
// 깃허브에서 이런 프로젝트파일을 pull하게 된다면 제일먼저 
// npm i
// 하여서 nodemodules을 다운로드한다.

// vsc에서 터미널을 사이드로 둘 수 있다.
var _ = require('lodash');

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { contentType, redirect } = require("express/lib/response");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts = []
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    homeContent: homeStartingContent,
    posts: posts
  })

});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent })
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent })
});


app.get("/compose", function (req, res) {
  res.render("compose")
});


app.post("/compose", function (req, res) {
  let post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post)
  // console.log(posts)
  res.redirect("/")
});


app.get("/posts/:postName", function (req, res) {
  // console.log(req.params.postName)
  let target = req.params.postName
  // 저장되어있는 title이 Day 2 이고
  // 내가 url에 입력한 http://localhost:3000/posts/day2 
  // day2 는 붙어있는데 이러한 붙여쓰기도 day 2로 변환되어
  // title 과 매칭이 된다. 신기하다.
  target = _.lowerCase(target);
  console.log("target: " + target)
  posts.forEach(element => {
    let title = _.lowerCase(element.title)
    console.log("title: " + title)
    if (target == title) {
      res.render("post", { postTitle: element.title, postContent: element.content })
    }
  })
})

// Lodash 사용법 
// https://ehddud100677.tistory.com/293


// http://localhost:3000/posts/Hi 을 url에 입력하면 
// console에 Hi가 출력된다.




app.listen(3000, function () {
  console.log("Server started on port 3000");
});
