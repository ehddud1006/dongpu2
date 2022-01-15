const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");


const app = express();

// sol1 )
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("Server Started on port 3000");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;
  const https = require("https");
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  
  var jsonData = JSON.stringify(data);
  // data 객체를 문자열로 변환
  const url = "https://us20.api.mailchimp.com/3.0/lists/06aef8d5f1";

  const options = {
    method: "POST",
    auth: "kdy1:336d3224587b01bfa6894eb4c1796bfe-us20",
  };

  const request = https.request(url, options, function (response) {
    
    if (response.statusCode === 200){
      // request가 성공적으로 요청되었다면, 객체에 200이 담겨져 있을 것이다.
      res.sendFile(__dirname+"/success.html")
    } else {
      res.sendFile(__dirname+"/failure.html")
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});
// list Key
// 06aef8d5f1
// API KEY
// 336d3224587b01bfa6894eb4c1796bfe-us20

// 만든 signup.html파일을 nodemon app.js를 통해서 실행하려고하니 오류가 났다.
// signin.css 파일이 적용되지 않은 것이다.

// 그렇다면 어떻게 해야할까?

// sol 1) public 폴더를 생성해서 css폴더 , image폴더를 생성한다.
// 그리고 각각의 폴더에 signin.css image 파일을 넣어준다.

// <link href="./css/signin.css" rel="stylesheet" />
// 그리고 기존의 css 파일 경로를 수정해준다. 이때 public 폴더는 쓰지 않는다.
// public의 하위부터 다뤄주면 된다.
// 느낌이 왔겠지만 app.use(express.static("public")); 를 선언해주므로
// 서버에서 public 폴더를 넘겨주고 이 폴더의 데이터를 사용한다.

// sol 2)
// name 또한 사용해주어야한다.
// 그리고 body-parser를 사용할때, post 하기위해서는
// <form action="/" method="POST"> form 태그에 꼭 넣어주어야한다.
