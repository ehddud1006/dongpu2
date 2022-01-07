const express = require("express"); // 익스프레스를 요구

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

app.get("/", function (req, res) {
  res.send("Server is up and running.");
});
