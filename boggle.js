let cubes = [
  "NEIUSE",
  "LRHZNN",
  "ETTRYL",
  "FKAPFS",
  "YIDSTT",
  "QIMNHU",
  "STOSIE",
  "SOACPH",
  "AEAGEN",
  "HEENWG",
  "WOOTAT",
  "REVLDY",
  "THRVEW",
  "REILXD",
  "OUMCIT",
  "JOOBBA",
];
let rack = [
  ["R", "N", "E", "I"],
  ["C", "D", "H", "A"],
  ["E", "E", "O", "A"],
  ["Y", "S", "E", "P"],
];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Display rack to screen
function display() {
  const gap = 10;
  const cube = 50;
  ctx.fillStyle = "orange";
  ctx.fillRect(0, 0, gap * 5 + cube * 4, gap * 5 + cube * 4);
  ctx.fillStyle = "black";

  let x = gap;
  let y = gap;
  rack.forEach((row) => {
    row.forEach((letter) => {
      ctx.fillStyle = "white";
      ctx.fillRect(x, y, cube, cube);
      ctx.fillStyle = "black";
      ctx.font = "45px helvetica";
      ctx.fillText(letter, x + 10, y + cube - 10);
      x += cube + gap;
    });
    y += cube + gap;
    x = gap;
  });
}

// Shuffle the cubes and place on rack
function shake() {
  shuffle(cubes);
  for (let i = 0; i < rack.length; i++) {
    for (let j = 0; j < rack.length; j++) {
      rack[i][j] = cubes[i * 4 + j].charAt(
        Math.floor(Math.random() * cubes[i * 4 + j].length)
      );
    }
  }
}

// https://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function rattle() {
    shake();
    display();
}

rattle();