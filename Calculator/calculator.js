const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// HTML 양식에서 가져운 데이터를 분석할때 사용

app.listen(3000, function () {
  console.log("Server Start 3000 port");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  //   console.log(__dirname);
  //   C:\Users\USER\Documents\GitHub\dongpu2\Calculator
  // 현재 디렉토리의 경로가 출력됨을 알 수 있다.
});

app.get("/bmiCalculator", function (req, res) {
  //   res.send("<h1>BMI Calculator</h1>");
  res.sendFile(__dirname + "/bmiCalculator.html");
  //   console.log(__dirname);
  //   C:\Users\USER\Documents\GitHub\dongpu2\Calculator
  // 현재 디렉토리의 경로가 출력됨을 알 수 있다.
});

app.post("/bmiCalculator", function (req, res) {
  var feet = parseFloat(req.body.feet) / 100;
  var weight = parseFloat(req.body.weight);

  var result = weight / Math.pow(feet, 2);
  res.send("Your BMI is " + result);
});

app.post("/", function (req, res) {
  //   console.log(req.body);
  //{ num1: '2', num2: '3', submit: '' }
  // 여기서 각각의 num1 num2 이름은
  // html 파일의
  // <input type="text" name="num1" placeholder="First Number" />
  // <input type="text" name="num2" placeholder="Second Number" />
  // name에서 생성된 것이다.

  //   console.log(req.body.num1);
  //   // 2 가 출력됨을 알 수 있다.

  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  var result = num1 + num2;

  res.send("The result of the calculation is " + result);
  //   index.html에서 post를 받으면 화면에 Thanks for posting that! 출력한다.
  // 그런데 우리는 num1 과 num2를 사용하고 싶은데 어떻게 해야할까?

  // npm install body-parser 를 설치해준다.
  //   2번줄의 const bodyParser = require("body-parser"); 코드를 작성한다.
  // 6번줄의 app.use(bodyParser.urlencoded({extended: true}));
  // 21번줄에 req.body에 어떤 정보가 담겨있는지 살펴보자.
  // 29번줄 req.body.num1 만 정보를 가져와보자.

  //   //   32 ~ 37 줄의 과정을 보자
  //   어떤 문제가 생겼나? num1과 num2 가 문자열이여서 덧셈이 되지않고
  //   문자열이 합쳐져 23 이렇게 출력이 되었다.

  // listen -> get -> html -> data -> post -> send  대충이런 과정을 거친다.
});
