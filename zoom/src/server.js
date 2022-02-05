
import http from "http";
import express from "express";
import SocketIO from "socket.io";

const app = express();


app.set("view engine", "pug");
// view 엔진으로 퍼그를 사용한다.
app.set("views", __dirname + "/views");
// pug 파일을 views 폴더에 존재한다.
app.use("/public", express.static(__dirname + "/public"));
// 유저가 public으로 가게되면 __dirname +"/public"폴더를 보여준다.

app.get("/", (req, res) => res.render("home"));
//request, response 하고 home.pug 파일에 render 한다.
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);


wsServer.on("connection", (socket) => {
  

   socket.on("enter_room", (roomName, done) => {  
      
    socket.join(roomName);     
    done();
    socket.to(roomName).emit("welcome", "낯선 사람이 입장하셨습니다.");
  });
  socket.on("disconnecting", () => {
    
    socket.rooms.forEach((room) => socket.to(room).emit("bye","낯선사람이 퇴장하셨습니다."));
  });
  socket.on("new_message", (msg, room , done) => {
    socket.to(room).emit("new_message",msg);
    done(msg);
  });



});

 const handleListen = () => console.log(`Listening on http://localhost:3000`);

httpServer.listen(3000, handleListen);



/*

const wss = new WebSocket.Server({ server });

const sockets = [];


wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon"; // 익명으로 접속하는 사람을 위함.
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log("Disconnected from the Browser ❌"));
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) =>
                aSocket.send(`${socket.nickname}: ${message.payload}`),
                console.log(`${socket.nickname}: ${message.payload}`)
                );
            case "nickname":
                socket["nickname"] = message.payload;
    }
  });
});
*/
