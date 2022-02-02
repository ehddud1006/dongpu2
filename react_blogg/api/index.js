// 익스프레스 
const express = require("express");
const app = express();

// dotenv .env 파일을 사용하기 위함
const dotenv = require("dotenv")
dotenv.config()
// dotenv .env 파일을 사용하기 위함

// json 파일을 보내고 받을 수 있게한다.
app.use(express.json());

const authRoute = require("./routes/auth")
app.use("/api/auth", authRoute)

const mongoose = require("mongoose")
// mongoose.connect('mongodb://localhost:27017/test');
mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connect to MongoDB")).catch(err => console.log(err));



// app.use("/", (req, res) => {
//     console.log("hey this is main url")
// })



app.listen("5000", () => {
    console.log("Backend is running.");
});