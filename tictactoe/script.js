const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');
const modeRadios = document.querySelectorAll('input[name="mode"]');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let mode = 'friend';

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
modeRadios.forEach(radio => radio.addEventListener('change', changeMode));

function handleClick(event) {
    const index = event.target.getAttribute('data-index');

    if (board[index] === '' && !gameOver) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;
            return;
        }

        if (board.every(cell => cell !== '')) {
            status.textContent = "It's a draw!";
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;

        if (mode === 'computer' && currentPlayer === 'O') {
            computerPlay();
        }
    }
}

function computerPlay() {
    let availableMoves = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    if (availableMoves.length === 0) return;

    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[randomMove] = 'O';
    cells[randomMove].textContent = 'O';

    if (checkWinner()) {
        status.textContent = 'Player O wins!';
        gameOver = true;
        return;
    }

    if (board.every(cell => cell !== '')) {
        status.textContent = "It's a draw!";
        gameOver = true;
        return;
    }

    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
    });
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    gameOver = false;
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function changeMode() {
    mode = document.querySelector('input[name="mode"]:checked').value;
    restartGame();
}
