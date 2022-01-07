const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log(req.body.cityName);
  // body-parser를 사용해서 html input의 정보를 얻는다.
  console.log("Post request received.");

  const query = req.body.cityName;
  // input에서 얻어온 도시명을 넣어준다. 그도시의 날씨를 검색하기 위해서.
  const apiKey = "744ed5277a2014db73dd5dcdff3e6e3b";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);
    // get 안에 api url을 넣는다.
    // 200(OK)

    response.on("data", function (data) {
      //   console.log(data);
      // 200
      // <Buffer 7b 22 63 6f 6f 72 64 22 3a 7b 22 6c 6f 6e 22 3a
      // 2d 30 2e 31 32 35 37 2c 22 6c 61 74 22 3a 35 31 2e 35 30 38 35 7d 2c 22 77 65 61 74 68 65 72 22 3a 5b ... 425 more bytes>
      // 16진수 코드가 data로 받아져왔다.
      // 16진법을 문자열로 바꾸면 {"coord":{"lon":-0.1257,"lat":51.5085},"weather":[
      // 이런식으로 바꿔진다.

      const weatherData = JSON.parse(data);
      //   데이터를 javascript 객체로 변환
      //   console.log(weatherData);
      //   {
      //     coord: { lon: -0.1257, lat: 51.5085 },
      //     weather: [
      //       {
      //         id: 804,
      //         main: 'Clouds',
      //         description: 'overcast clouds',
      //         icon: '04n'
      //       }
      //     ],
      //     base: 'stations',
      //     main: {
      //       temp: 277.08,
      //       feels_like: 272.84,
      //       temp_min: 275.76,
      //       temp_max: 278.15,
      //       pressure: 1010,
      //       humidity: 84
      //     },
      //     visibility: 10000,
      //     wind: { speed: 5.66, deg: 230 },
      //     clouds: { all: 98 },
      //     dt: 1641532877,
      //     sys: {
      //       type: 2,
      //       id: 2019646,
      //       country: 'GB',
      //       sunrise: 1641542673,
      //       sunset: 1641571708
      //     },
      //     timezone: 0,
      //     id: 2643743,
      //     name: 'London',
      //     cod: 200
      //   }

      //   const object = {
      //     name: "Angela",
      //     favouriteFood: "Ramen",
      //   };
      //   console.log(JSON.stringify(object));
      //   //   자바스크립트 객체를 문자열로 변경
      // //   {"name":"Angela","favouriteFood":"Ramen"}

      const temp = weatherData.main.temp;
      //   위 코드는 38줄 main의 temp를 얻기위한 과정이다.
      console.log(temp);
      const description = weatherData.weather[0].description;
      // 위 코드는 33줄의 description을 얻기위함이다.
      // chrome 확장 프로그램에서 JSON Viewer pro 를 사용하면
      //   JSON path를 아주 쉽게 얻을 수 있었다.
      console.log(description);

      const icon = weatherData.weather[0].icon;
      console.log(icon);

      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      // imageURL 을 만드는 방법은 API 홈페이지를 참고하고 , 이 홈페이지에서
      //   각 날씨별 사진을 제공한다.
      res.write("<p>The weather is currently " + description + "</p>");
      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          "degrees Celcius.</h1>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
      //   res.send 는 두번할 수 없다. 그러므로 현재 84번째 줄과 89~
      //   send 두개가 있기때문에 오류가 발생한다.

      // 84, 85의 res.write() 를 통해 버퍼에 저장해놓는다는 개념?
      //   저장 해놓고 한번에 send 왜? send는 한번밖에 할 수 없음.
    });
  });

  //   res.send("Server is up and running.");
});
