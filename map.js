import texts from "./texts.js";

function generateFloor() {
  const cell = document.createElement("div");
  cell.className = "floor-grid";
  return cell;
}

function generateWall() {
  const cell = document.createElement("div");
  cell.className = "wall-grid";
  return cell;
}

function generateConcrete() {
  const cell = document.createElement("div");
  cell.className = "concrete-grid";
  return cell;
}

function createClock() {
  const clock = document.createElement("div");
  clock.className = "clock";
  return clock;
}

function createDoor() {
  const door = document.createElement("div");
  door.className = "door";
  return door;
}

function createBed() {
  const bed = document.createElement("div");
  bed.className = "bed";
  return bed;
}

function createShelf() {
  const shelf = document.createElement("div");
  shelf.className = "shelf";
  return shelf;
}

function createWindow() {
  const w = document.createElement("div");
  w.className = "window";
  return w;
}

function createDesk() {
  const desk = document.createElement("div");
  desk.className = "desk";
  return desk;
}

function createWardrobe() {
  const wardrobe = document.createElement("div");
  wardrobe.className = "wardrobe";
  return wardrobe;
}

function createCake() {
  const cake = document.createElement("div");
  cake.className = "cake";
  return cake;
}

document.addEventListener("DOMContentLoaded", () => {
  const rows = document.getElementsByClassName("game-row");

  for (let i = 0; i < 10; i++) {
    rows[0].appendChild(generateWall());
    if (i === 1) rows[0].appendChild(createClock());
    if (i === 2) rows[0].appendChild(createDoor());
    if (i === 3) rows[0].appendChild(createShelf());
    if (i === 3) rows[0].appendChild(createWindow());
    rows[1].appendChild(generateWall());
    rows[2].appendChild(generateWall());
    if (i === 3) rows[2].appendChild(createDesk());
    if (i === 3) rows[2].appendChild(createWardrobe());
    rows[3].appendChild(generateFloor());
    rows[4].appendChild(generateFloor());
    rows[5].appendChild(generateFloor());
    if (i === 9) rows[6].appendChild(createCake());
    rows[6].appendChild(generateFloor());
    rows[7].appendChild(generateFloor());
    if (i === 9) rows[7].appendChild(createBed());
  }
});

const txt = texts.opening;
const box = document.getElementById("dialogue");
let i = 0;
function typewriter() {
  if (i < txt.length) {
    box.innerText += txt.charAt(i);
    i++;
    setTimeout(typewriter, 50);
  } else {
    setTimeout(() => {
      i = 0;
      box.innerText = "";
    }, 900);
  }
}

const sound = document.getElementById("sound");
const music = new Audio("./assets/Blue_Hour.mp3");
const clickSound = new Audio("./assets/click_trimmed.mp3");
music.volume = 0.05;
clickSound.volume = 0.3;
music.loop = true;

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (sound.classList.contains("on")) {
    music.play();
  }
  typewriter();
});

sound.addEventListener("click", (e) => {
  e.preventDefault();
  clickSound.play();
  if (sound.classList.contains("on")) {
    sound.classList.remove("on");
    sound.classList.add("off");
    music.pause();
  } else {
    sound.classList.remove("off");
    sound.classList.add("on");
    music.play();
  }
});
