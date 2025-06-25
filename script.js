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

document.addEventListener("DOMContentLoaded", () => {
  const rows = document.getElementsByClassName("game-row");

  for (let i = 0; i < 10; i++) {
    rows[0].appendChild(generateWall());
    rows[1].appendChild(generateWall());
    rows[2].appendChild(generateWall());
    rows[3].appendChild(generateFloor());
    rows[4].appendChild(generateFloor());
    rows[5].appendChild(generateFloor());
    rows[6].appendChild(generateFloor());
    rows[7].appendChild(generateFloor());
  }
});

// Player movement logic
const player = document.getElementsByClassName("player")[0];
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const currentRow = player.parentElement;
  let nextCell;

  player.classList = "player"; // Reset player classes

  if (key === "ArrowUp") {
    player.classList.add("moving-up");
  } else if (key === "ArrowDown") {
    player.classList.add("moving-down");
  } else if (key === "ArrowLeft") {
    player.classList.add("moving-left");
  } else if (key === "ArrowRight") {
    player.classList.add("moving-right");
  }

  player.addEventListener("animationend", (e) => {
    if (e.animationName === "moveDown") {
      player.classList.remove("moving-down");
      player.classList.add("idle-down");
    } else if (e.animationName === "moveUp") {
      player.classList.remove("moving-up");
      player.classList.add("idle-up");
    } else if (e.animationName === "moveLeft") {
      player.classList.remove("moving-left");
      player.classList.add("idle-left");
    } else if (e.animationName === "moveRight") {
      player.classList.remove("moving-right");
      player.classList.add("idle-right");
    }
  });
});
