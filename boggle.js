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
let visited = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
];
let found = [];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Display rack to screen
function display() {
  const gap = 10;
  const cube = 50;
  ctx.strokeStyle = "darkorange";
  ctx.fillStyle = "darkorange";
  // ctx.fillRect(0, 0, gap * 5 + cube * 4, gap * 5 + cube * 4);
  roundRect(ctx, 0, 0, gap * 5 + cube * 4, gap * 5 + cube * 4, 10, true, false);
  ctx.fillStyle = "black";

  let x = gap;
  let y = gap;
  rack.forEach((row) => {
    row.forEach((letter) => {
      ctx.strokeStyle = "white";
      ctx.fillStyle = "white";
      // ctx.fillRect(x, y, cube, cube);
      roundRect(ctx, x, y, cube, cube, 5, true, false);
      ctx.fillStyle = "black";
      ctx.font = "bold 40px helvetica";
      ctx.fillText(letter, x + 12, y + cube - 11);
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

// http://js-bits.blogspot.com/2010/07/canvas-rounded-corner-rectangles.html
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
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
function isWord(s) {
  return words.indexOf(`\n${s}\n`) > -1;
}

function isPrefix(s) {
  return words.indexOf(`\n${s}`) > -1;
}

function solve() {
  found = [];
  for (let i = 0; i < rack.length; i++) {
    for (let j = 0; j < rack.length; j++) {
      traverse("", i, j);
    }
  }
  found = [...new Set(found)];
  found.sort((a, b) => b.length - a.length);
  let answers = document.getElementById("answers");
  answers.innerHTML = found.join("<br>");
}

function traverse(prefix, i, j) {
  // Dont go off the grid
  if (i < 0 || i > 3 || j < 0 || j > 3) {
    return;
  }
  // Cant reuse letters
  if (visited[i][j]) {
    return;
  }
  const s = prefix + rack[i][j];
  if (isWord(s) && s.length > 3) {
    found.push(s);
  }
  if (isPrefix(s)) {
    visited[i][j] = true;
    for (let x = i - 1; x <= i + 1; x++) {
      for (let y = j - 1; y <= j + 1; y++) {
        traverse(s, x, y);
      }
    }
    visited[i][j] = false;
  }
}

rattle();
console.log(words.length);
// console.log(`isWord(AARDVARK) ${isWord('AARDVARK')})`)
// console.log(`isWord(ARDVARK) ${isWord('ARDVARK')})`)
// console.log(`isWord(AARDVARK) ${isWord('AARDVARK')})`)
// console.log(`isWord(AARDVARK) ${isWord('AARDVARK')})`)
// console.log(`isWord(AARDVARK) ${isWord('AARDVARK')})`)
