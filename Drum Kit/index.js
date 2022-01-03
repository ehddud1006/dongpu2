var numberOfDrumButtons = document.querySelectorAll(".drum").length;

function makeSound(key) {
  switch (key) {
    case "w":
      var tom1 = new Audio("../Drum Kit/sounds/sound1.mp3");
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("../Drum Kit/sounds/sound2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio("../Drum Kit/sounds/sound3.mp3");
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio("../Drum Kit/sounds/sound4.mp3");
      tom4.play();
      break;

    case "j":
      var snare = new Audio("../Drum Kit/sounds/sound5.mp3");
      snare.play();
      break;

    case "k":
      var crash = new Audio("../Drum Kit/sounds/sound6.mp3");
      crash.play();
      break;

    case "l":
      var kick = new Audio("../Drum Kit/sounds/sound7.mp3");
      kick.play();
      break;

    case "h":
      var kick = new Audio("../Drum Kit/sounds/sound8.mp3");
      kick.play();
      break;

    default:
      console.log(buttonInnerHTML);
  }
}

for (var i = 0; i < numberOfDrumButtons; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", function () {
    var buttonInnerHTML = this.innerHTML;

    makeSound(buttonInnerHTML);

    buttonAnimation(buttonInnerHTML);
  });
}

document.addEventListener("keydown", function (event) {
  var Key = event.key;

  makeSound(Key);

  buttonAnimation(Key);
});

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  activeButton.classList.toggle("pressed");
  setTimeout(function () {
    activeButton.classList.toggle("pressed");
  }, 100);
}
