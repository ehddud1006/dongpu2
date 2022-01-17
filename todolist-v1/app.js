const express = require("express");

const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    // res.sendFile(__dirname + "/index.html");
    var today = new Date();
    var currentDay = today.getDay();

    if(currentDay== 6 || currentDay=== 0){
      // 6은 토요일 0은 일요일을 뜻한다.
      // res.send("weekend")

      res.write("<h1>Weekend!</h1>");
      res.send()
    }
    else {
      // res.send("working day")
      // res.write("<p>It is not the weekend.</p>");
      // res.write("<h1>YOu Work");
      // res.send()

      // 다시한번 상기시키자 res.write()는 버퍼에 쓰고
    // send를 통해 전부 보낸다.


      res.sendFile(__dirname + "/index.html");
    }

    
    

  });

  app.listen(3000, function () {
    console.log("Server Started on port 3000");
  });