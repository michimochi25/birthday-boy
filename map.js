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

document.addEventListener("DOMContentLoaded", () => {
  const rows = document.getElementsByClassName("game-row");

  for (let i = 0; i < 10; i++) {
    rows[0].appendChild(generateWall());
    if (i === 1) rows[0].appendChild(createClock());
    if (i === 2) rows[0].appendChild(createDoor());
    rows[1].appendChild(generateWall());
    rows[2].appendChild(generateWall());
    rows[3].appendChild(generateFloor());
    rows[4].appendChild(generateFloor());
    rows[5].appendChild(generateFloor());
    rows[6].appendChild(generateFloor());
    rows[7].appendChild(generateFloor());
    if (i === 9) rows[7].appendChild(createBed());
  }
});
