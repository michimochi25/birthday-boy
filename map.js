import texts from "./texts.js";
import state from "./script.js";
import pages from "./pages.js";

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

let txt = texts.opening[0];
const box = document.getElementById("textbox");
let i = 0;
function typewriter() {
  if (i < txt.length) {
    box.innerText += txt.charAt(i);
    i++;
    setTimeout(typewriter, 50);
  }
}

function callTypewriter() {
  i = 0;
  box.innerText = "";
  typewriter();
}

const sound = document.getElementById("sound");
const music = new Audio("./assets/Blue_Hour.mp3");
const clickSound = new Audio("./assets/click_trimmed.mp3");
music.volume = 1;
clickSound.volume = 0.8;
music.loop = true;

const container = document.getElementById("game-container");
container.addEventListener("click", (e) => {
  e.preventDefault();
  if (sound.classList.contains("on")) {
    music.play();
  }
  randomiseText();
});

sound.addEventListener("click", (e) => {
  e.preventDefault();
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

function createPickUpBtn() {
  const btn = document.createElement("button");
  btn.id = "pick-up-btn";
  btn.classList.add("option");
  btn.innerText = "Pick up";
  return btn;
}

function createCloseBtn() {
  const btn = document.createElement("button");
  btn.id = "close-btn";
  btn.classList.add("option");
  btn.innerText = "X Close";
  return btn;
}

function randomiseText() {
  const txtArray = texts[state.collides];
  txt = txtArray[Math.floor(Math.random() * txtArray.length)];
  callTypewriter();
}

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  const key = event.key;
  switch (key) {
    case "Enter":
      const collision = state.collides;
      const dialogue = document.getElementById("dialogue");
      const options = document.getElementsByClassName("option");
      if (collision.localeCompare("wardrobe") === 0) {
        const btn = createPickUpBtn();
        if (options.length === 0) {
          dialogue.appendChild(btn);
        }

        const bd = document.getElementById("backdrop");
        const book = document.getElementById("book");
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          bd.classList.remove("hidden");
          book.classList.remove("hidden");
          state.collides = "book";
          randomiseText();
          btn.remove();

          // build next options
          const closeBtn = createCloseBtn();
          dialogue.appendChild(closeBtn);
          closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            bd.classList.add("hidden");
            book.classList.add("hidden");
            closeBtn.remove();
            txt = texts.opening[0];
          });
        });
      } else {
        const pickUpBtn = document.getElementById("pick-up-btn");
        if (pickUpBtn) {
          // if element exists, destroy it
          pickUpBtn.remove();
        }
      }

      if (collision.localeCompare("cake") === 0) {
        const player = document.getElementsByClassName("player")[0];
        const head = player.offsetTop + 20;
        const hat = document.createElement("div");
        hat.className = "hat";
        player.appendChild(hat);
        const hornSound = new Audio("./assets/party_horn_trimmed.mp3");
        hornSound.play();
      }

      randomiseText();
      break;
  }
});

const buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    clickSound.play();
  });
}

// navigate pages
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");
const pagePic = document.getElementById("page-pic");
const pageText = document.getElementById("page-text");
let currentPage = 0;

function updatePage() {
  console.log("Updating page to:", currentPage);
  pagePic.src = pages[currentPage].pic;
  pageText.innerText = pages[currentPage].text;
}

leftArrow.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentPage > 0) {
    currentPage--;
    updatePage();
  }
});

rightArrow.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentPage < pages.length - 1) {
    currentPage++;
    updatePage();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the first page
  if (pages.length > 0) {
    updatePage();
  }
});
