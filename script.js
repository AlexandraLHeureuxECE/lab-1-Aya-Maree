const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let board = Array(9).fill(null);
let gameOver = false;

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winCombo = checkWin();
  if (winCombo) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    winCombo.forEach(i => cells[i].classList.add("win"));
    gameOver = true;
    return;
  }

  if (!board.includes(null)) {
    statusText.textContent = "Draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  for (const combo of winningCombos) {
    if (combo.every(i => board[i] === currentPlayer)) {
      return combo;
    }
  }
  return null;
}

restartBtn.addEventListener("click", () => {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = "Player X's turn";
});

cells.forEach(cell => cell.addEventListener("click", handleClick));
