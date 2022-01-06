const express = require("express"); // 익스프레스를 요구

const app = express();

app.get("/", function (request, response) {
  response.send("<h1>Hello, world!</h1>");
});
// 브라우저가 서버에 접속하여 get 요청을 한다.
// 첫번째 파라미터는 get 요청의 위치이다
// 현재는 localhost:3000이다.

// 콜백함수에는 요청과 응답 두가지 파라미터가 있다.
// 콜백함수는 해당요청이 발생하면 서버에 무엇을 해야하는지 알려준다.

// console.log(request);
// 브라우저가 서버에 요청하는 여러가지 정보를 얻을 수 있다.

// response.send("Hello");
// 웹페이지에 Hello 라고 출력된다.

// response.send("<h1>Hello, world!</h1>");
// h1태그로 둘러쌓여진 Hello, world!가 출력된다.

app.listen(3000, function () {
  console.log("Server Started on port 3000");
});
// 우리 서버로 전송되는 모든 HTTP 요청에 대해
// 특정포트에서 수신대기하도록 지시한다.
// 콜백함수는 서버가 잘 작동하는지 확인하기 위함이다.
