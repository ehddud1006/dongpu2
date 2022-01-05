function nextSequence() {
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  buttonColor = ["red", "blue", "green", "yellow"];
  randomChosenColor = buttonColor[randomNumber];
  return randomChosenColor;
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function makeSound(key) {
  switch (key) {
    case "red":
      var red = new Audio(
        "C:/Users/USER/Documents/GitHub/dongpu2/simonGame/sounds/red.mp3"
      );
      red.play();
      break;

    case "blue":
      var blue = new Audio(
        "C:/Users/USER/Documents/GitHub/dongpu2/simonGame/sounds/blue.mp3"
      );
      blue.play();
      break;

    case "green":
      var green = new Audio(
        "C:/Users/USER/Documents/GitHub/dongpu2/simonGame/sounds/green.mp3"
      );
      green.play();
      break;

    case "yellow":
      var yellow = new Audio(
        "C:/Users/USER/Documents/GitHub/dongpu2/simonGame/sounds/yellow.mp3"
      );
      yellow.play();
      break;
    default:
      console.log(key);
  }
}

userChosenColor = [];
var randomChosenColor = "";
gamePattern = [];
count = 1;
go_count = 0;
press_A = false;

for (var i = 0; i < 4; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function () {
    if (press_A) {
      var color = this.id;
      var target = this;
      userChosenColor.push(color);

      target.classList.toggle("pressed");
      setTimeout(function () {
        console.log(this);
        target.classList.toggle("pressed");
      }, 100);

      makeSound(color);

      console.log(go_count + "go_count");
      console.log(gamePattern[go_count] + " a");
      console.log(userChosenColor[go_count] + " b");
      if (gamePattern[go_count] != userChosenColor[go_count]) {
        go_count = count - 1;
      }
      go_count++;

      if (go_count == count) {
        go_count = 0;
        console.log(gamePattern + "gamepattern");
        console.log(userChosenColor + "randomChosen");
        var go = true;
        for (var j = 0; j < count; j++) {
          if (gamePattern[j] != userChosenColor[j]) {
            console.log(gamePattern[j] + "gamepattern22");
            console.log(randomChosenColor[j] + "randomChosen22");
            go = false;
          }
        }
        userChosenColor = [];
        count++;
        console.log(count + " count");
        console.log(go + " go");
        if (go) {
          sleep(1000).then(
            () => (document.querySelector("h1").innerHTML = "Level " + count)
          );
          randomChosenColor = nextSequence();

          gamePattern.push(randomChosenColor);

          sleep(2000).then(() => makeSound(randomChosenColor));
          sleep(2000)
            .then(() =>
              document
                .querySelector("." + randomChosenColor)
                .classList.toggle("pressed2")
            )
            .then(() =>
              setTimeout(function () {
                document
                  .querySelector("." + randomChosenColor)
                  .classList.toggle("pressed2");
              }, 100)
            );
        } else {
          var wrong = new Audio(
            "C:/Users/USER/Documents/GitHub/dongpu2/simonGame/sounds/wrong.mp3"
          );
          document.querySelector("body").classList.add("game-over");
          document.querySelector("h1").innerHTML = "Game Over";
          wrong.play();
          sleep(3000).then(
            () =>
              (document.querySelector("h1").innerHTML = "Retry? Press ctrl+F5")
          );
        }
      }
    }
  });
}

document.addEventListener("keydown", function (event) {
  var Key = event.key;
  if (Key == "a" || Key == "A") {
    press_A = true;
    document.querySelector("h1").innerHTML = "Ready to Game";

    sleep(1000).then(
      () => (document.querySelector("h1").innerHTML = "Level 1")
    );
    randomChosenColor = nextSequence();

    console.log(randomChosenColor + " keydown");
    gamePattern.push(randomChosenColor);
    console.log(gamePattern + " keydown");

    sleep(2000).then(() => makeSound(randomChosenColor));
    sleep(2000)
      .then(() =>
        document
          .querySelector("." + randomChosenColor)
          .classList.toggle("pressed2")
      )
      .then(() =>
        setTimeout(function () {
          document
            .querySelector("." + randomChosenColor)
            .classList.toggle("pressed2");
        }, 100)
      );

    // door = true;
    // var i = 1;
    // while (door) {
    //   document.querySelector("h1").innerHTML = "Level " + i;
    // }
  }
});
