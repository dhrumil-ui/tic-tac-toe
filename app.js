// app.js
console.log("Hello World - TicTacToe");

let board;           // array of 9: 'X', 'O' or null
let currentPlayer;   // 'X' or 'O'
let gameOver;
let winner;
let scores = { X: 0, O: 0, Draw: 0 };

// winning combinations (indices)
const wins = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diagonals
];

function initializeGame(){
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  winner = null;
  // remove win classes if any
  for(let i=0;i<9;i++){
    const el = document.getElementById('cell-'+i);
    if(el) el.classList.remove('win');
  }
  renderBoard();
}

function renderBoard(){
  for(let i=0;i<9;i++){
    const el = document.getElementById('cell-'+i);
    if(!el) continue;
    const val = board[i];
    if(val === 'X') el.innerText = '❌';
    else if(val === 'O') el.innerText = '⭕';
    else el.innerText = '';
  }

  const statusEl = document.getElementById('status');
  if(gameOver){
    if(winner === 'Draw'){
      statusEl.innerText = "It's a draw!";
    } else {
      statusEl.innerText = `Winner: ${winner} ${winner === 'X' ? '❌' : '⭕'}`;
    }
  } else {
    statusEl.innerText = `Turn: ${currentPlayer} ${currentPlayer === 'X' ? '❌' : '⭕'}`;
  }

  // update scores display
  document.getElementById('scoreX').innerText = scores.X;
  document.getElementById('scoreO').innerText = scores.O;
  document.getElementById('scoreDraw').innerText = scores.Draw;
}

function checkWinner(){
  for(const combo of wins){
    const [a,b,c] = combo;
    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      winner = board[a];
      gameOver = true;
      // animate winning cells
      document.getElementById('cell-'+a).classList.add('win');
      document.getElementById('cell-'+b).classList.add('win');
      document.getElementById('cell-'+c).classList.add('win');
      return winner;
    }
  }
  // check for draw
  if(board.every(cell => cell !== null)){
    winner = 'Draw';
    gameOver = true;
    return 'Draw';
  }
  return null;
}

function cellClicked(index){
  if(gameOver) return;
  if(board[index] !== null) return; // already filled

  board[index] = currentPlayer;
  const res = checkWinner();
  if(res){
    // update scores
    if(res === 'Draw') scores.Draw++;
    else scores[res]++;
  } else {
    // switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
  renderBoard();
}

// optional: reset scores only
function resetScores(){
  scores = { X:0, O:0, Draw:0 };
  renderBoard();
}

// start
initializeGame();
