const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("Server Started on port 3000");
});

app.get("/", function (request, response) {
  response.send("<h1>Hello, world!</h1>");
});
