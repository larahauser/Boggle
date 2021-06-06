const cubes = [
  ["N", "E", "I", "U", "S", "E"],
  ["L", "R", "H", "Z", "N", "N"],
  ["E", "T", "T", "R", "Y", "L"],
  ["F", "K", "A", "P", "F", "S"],
  ["Y", "I", "D", "S", "T", "T"],
  ["Qu", "I", "M", "N", "H", "U"],
  ["S", "T", "O", "S", "I", "E"],
  ["S", "O", "A", "C", "P", "H"],
  ["A", "E", "A", "G", "E", "N"],
  ["H", "E", "E", "N", "W", "G"],
  ["W", "O", "O", "T", "A", "T"],
  ["R", "E", "V", "L", "D", "Y"],
  ["T", "H", "R", "V", "E", "W"],
  ["R", "E", "I", "L", "X", "D"],
  ["O", "U", "M", "C", "I", "T"],
  ["J", "O", "O", "B", "B", "A"],
];
const rack = [
  ["R", "N", "E", "I"],
  ["C", "D", "H", "A"],
  ["E", "E", "O", "A"],
  ["Y", "S", "E", "P"],
];
const visited = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
];
let found = [];
const ctx = document.getElementById("canvas").getContext("2d");

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
      drawCube(letter, x, y, cube);
      x += cube + gap;
    });
    y += cube + gap;
    x = gap;
  });
}

// pass in degrees and get radians (canvas works in radians)
function degreesToRadians(d) {
  return d * Math.PI / 180;
}

function drawCube(letter, x, y, cube) {
  // rotate cube text in a random orientation
  ctx.save();
  switch (randomInt(4)) {
    case 0:
      // no rotation
      ctx.translate(x, y);
      ctx.rotate(degreesToRadians(getSlightJiggle()));
      break;
    case 1:
      // 90 degress tilt left
      ctx.translate(x, y + cube);
      ctx.rotate(degreesToRadians(-90 + getSlightJiggle()));
      break;
    case 2:
      // upside down
      ctx.translate(x + cube, y + cube);
      ctx.rotate(degreesToRadians(180 + getSlightJiggle()));
      break;
    case 3:
      // 90 degress tilt right
      ctx.translate(x + cube, y);
      ctx.rotate(degreesToRadians(90 + getSlightJiggle()));
      break;
  }
  ctx.strokeStyle = "white";
  ctx.fillStyle = "#E0E0E0";
  roundRect(ctx, 0, 0, cube, cube, 5, true, false);
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(25, 25, 24, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = "black";
  let yoffset = cube - 10;
  if (letter === "Qu") {
    ctx.font = "bold 30px helvetica";
    yoffset = cube - 15;
  } else {
    ctx.font = "bold 40px helvetica";
  }
  const xoffset = (cube - ctx.measureText(letter).width) / 2;
  ctx.fillText(letter, xoffset, yoffset);
  switch (letter) {
    case 'M':
    case 'W':
    case 'Z':
      ctx.fillRect(15, 43, 20, 4);
      break;
  }
  ctx.restore();
}

function getSlightJiggle() {
  switch (randomInt(5)) {
    case 0:
      return -2;
    case 1:
      return -1;
    case 2:
      return 0;
    case 3:
      return 1;
    case 4:
      return 2;
  }
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

// Shuffle the cubes and place on rack
function shake() {
  shuffle(cubes);
  for (let i = 0; i < rack.length; i++) {
    for (let j = 0; j < rack.length; j++) {
      rack[i][j] = cubes[i * 4 + j][randomInt(6)];
    }
  }
  document.getElementById("answers").innerHTML = "";
}

// http://js-bits.blogspot.com/2010/07/canvas-rounded-corner-rectangles.html
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined") {
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
  document.getElementById("answers").innerHTML = found.join("<br>");
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
  const s = (prefix + rack[i][j]).toUpperCase();
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
// console.log(words.length);
// console.log(`isWord(AARDVARK) ${isWord('AARDVARK')})`)
// console.log(`isWord(ARDVARK) ${isWord('ARDVARK')})`)
// console.log(`isWord(AARDVARK) ${isWord('AARDVARK')})`)
// console.log(`isWord(AARDVARK) ${isWord('AARDVARK')})`)
// console.log(`isWord(AARDVARK) ${isWord('AARDVARK')})`)
