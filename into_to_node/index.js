const superheroes = require("superheroes");

superheroes.all;
//=> ['3-D Man', 'A-Bomb', …]

var mySuperheroName = superheroes.random();
//=> 'Spider-Ham'

console.log(mySuperheroName);

const supervillains = require("supervillains");

supervillains.all;
//=> ['Abattoir', 'Able Crown', …]

var villains = supervillains.random();
//=> 'Mud Pack'

console.log(villains);
