var i = 0;
var randomNumber1 = Math.random();
randomNumber1 *= 6;
randomNumber1 = Math.floor(randomNumber1 + 1);

var randomNumber2 = Math.random();
randomNumber2 *= 6;
randomNumber2 = Math.floor(randomNumber2 + 1);

document
  .querySelectorAll("img")[0]
  .setAttribute(
    "src",
    "../Dicee Challenge/images/dice" + randomNumber1 + ".png"
  );

document
  .querySelectorAll("img")[1]
  .setAttribute(
    "src",
    "../Dicee Challenge/images/dice" + randomNumber2 + ".png"
  );

if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").innerHTML = "Player 1 Wins!";
} else if (randomNumber1 < randomNumber2) {
  document.querySelector("h1").innerHTML = "Player 2 Wins!";
} else {
  document.querySelector("h1").innerHTML = "Draw!";
}
