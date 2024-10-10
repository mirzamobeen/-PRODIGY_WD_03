const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
const boardState = Array(9).fill(null); // Track cell states

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Initialize the game
const startGame = () => {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    updateStatusMessage(`${currentPlayer}'s turn`);
}

// Handle cell click
const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = [...cells].indexOf(cell);

    if (gameActive && !boardState[cellIndex]) {
        boardState[cellIndex] = currentPlayer;
        cell.classList.add(currentPlayer);
        checkGameResult();
    }
}

// Check for a win or draw
const checkGameResult = () => {
    const isWin = winningCombinations.some(combination => {
        return combination.every(index => boardState[index] === currentPlayer);
    });

    if (isWin) {
        updateStatusMessage(`${currentPlayer} wins! 🎉`);
        gameActive = false;
        endGame();
    } else if (isDraw()) {
        updateStatusMessage(`It's a draw! 🤝`);
        gameActive = false;
    } else {
        switchPlayer();
    }
}

// Check if the game is a draw
const isDraw = () => {
    return boardState.every(cell => cell !== null);
}

// Switch between players
const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatusMessage(`${currentPlayer}'s turn`);
}

// Update the game status message
const updateStatusMessage = (message) => {
    statusMessage.textContent = message;
}

// End the game
const endGame = () => {
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

// Restart the game
restartButton.addEventListener('click', () => {
    boardState.fill(null);
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.classList.remove('X', 'O');
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    updateStatusMessage(`${currentPlayer}'s turn`);
});

// Start the game on page load
startGame();
