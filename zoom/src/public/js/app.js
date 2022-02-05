const socket = io();


const room = document.getElementById("room");
const name1 = document.getElementById("name");

let roomName ;



function handleMessageSubmit(event) {
 
  
  event.preventDefault();
  const input = room.querySelector("#msg input");
  console.log(input.value);

  socket.emit("new_message", input.value, roomName, (hh) => {
    var go1 = $('<div class="message-row message-row--own">');
    var go3 = $('<div class="message-row__content ">');
    var go4 = $('<div class="message__info">');
    var go5 = $('<div class="message__bubble">');
    console.log(hh);
    go5.append(hh)
    go4.append(go5);
    go3.append(go4);
    go1.append(go3);
    $('#daejang').append(go1);
  });

  
  input.value = "";
}


function addMessage(message){
  console.log(message);
  var go1 = $('<div class="message-row">');
  //var go2 = $('<img src="https://user-images.githubusercontent.com/62373865/139782717-de3295c8-cd4a-4fff-a900-58e0369ddff2.png" >');
  var go3 = $('<div class="message-row__content">');
  var go4 = $('<div class="message__info">');
  var go5 = $('<div class="message__bubble">');
  go5.append(message)
  go4.append(go5);
  go3.append(go4);
  //go1.append(go2);
  go1.append(go3);
  $('#daejang').append(go1);
}

function showRoom(){
  name1.hidden = true;
  const h =  document.getElementById("Rooo");

  h.innerText = `${roomName}`;
 
}


function handleRoomSubmit(event) {
  event.preventDefault();
  const input = name1.querySelector("input");
  socket.emit("enter_room", input.value, showRoom); 
  roomName = input.value;
  input.value = "";
}

  name1.addEventListener("submit", handleRoomSubmit );

  room.addEventListener("submit",  handleMessageSubmit);

  socket.on("new_message",(user) => {
    addMessage(user);
  })

  socket.on("welcome", (user) => {
    addMessage(user);
  })
  
  socket.on("bye",   (user) => {
    addMessage(user);
  });
 
  