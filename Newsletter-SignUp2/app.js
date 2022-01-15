const express = require("express");

const app = express();

app.listen(3000, function () {
  console.log("Server Started on port 3000");
});

app.get("/", function (request, response) {
  response.send("<h1>Hello, world!</h1>");
});
