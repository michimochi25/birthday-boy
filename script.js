// Player movement logic
const gameContainer = document.getElementById("game-container");

const TOP_Y_LIMIT = -194;
const BOTTOM_Y_LIMIT = -54;
const LEFT_X_LIMIT = -152;
const RIGHT_X_LIMIT = 105;

function canMoveTo(x, y) {
  console.log(`Checking position: x=${x}, y=${y}`);
  return (
    y > TOP_Y_LIMIT && // Assuming player height is 50px
    y < BOTTOM_Y_LIMIT &&
    x > LEFT_X_LIMIT && // Assuming player width is 50px
    x < RIGHT_X_LIMIT
  );
}

const player = document.getElementsByClassName("player")[0];
document.addEventListener("keydown", (event) => {
  event.preventDefault();

  const key = event.key;
  player.classList = "player"; // Reset player classes

  if (key === "ArrowUp") {
    player.classList.add("moving-up");
    if (canMoveTo(player.offsetLeft, player.offsetTop - 2)) {
      player.style.top = `${player.offsetTop - 2}px`;
    }
  } else if (key === "ArrowDown") {
    player.classList.add("moving-down");
    if (canMoveTo(player.offsetLeft, player.offsetTop + 2)) {
      player.style.top = `${player.offsetTop + 2}px`;
    }
  } else if (key === "ArrowLeft") {
    player.classList.add("moving-left");
    if (canMoveTo(player.offsetLeft - 2, player.offsetTop)) {
      player.style.left = `${player.offsetLeft - 2}px`;
    }
  } else if (key === "ArrowRight") {
    player.classList.add("moving-right");
    if (canMoveTo(player.offsetLeft + 2, player.offsetTop)) {
      player.style.left = `${player.offsetLeft + 2}px`;
    }
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
