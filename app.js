let board;
let currentPlayer;
let gameOver;
let winner;

// 🎨 Emoji for players
const playerX = "😎"; 
const playerO = "⭕";

function initializeGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = playerX;
  gameOver = false;
  winner = null;
  renderBoard();
}

function renderBoard() {
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = board[i];
  }

  const statusText = document.getElementById("statusText");
  if (gameOver) {
    if (winner) {
      statusText.innerText = `🎉 Player ${winner} Wins!`;
    } else {
      statusText.innerText = "🤝 It's a Draw!";
    }
  } else {
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a,b,c] of combos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      gameOver = true;
      return;
    }
  }

  if (!board.includes("")) {
    gameOver = true; // draw
  }
}

function cellClicked(index) {
  if (board[index] === "" && !gameOver) {
    board[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    renderBoard();
  }
}

// Start game on page load
initializeGame();
