document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusMessage = document.getElementById('status-message');
    const restartButton = document.getElementById('restart-btn');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    const checkWin = () => {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                return gameState[a];
            }
        }
        return null;
    };

    const handleCellClick = (index) => {
        if (!gameActive || gameState[index] !== '') return;

        gameState[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        const winner = checkWin();
        if (winner) {
            gameActive = false;
            statusMessage.textContent = `${winner} wins!`;
            return;
        }

        if (!gameState.includes('')) {
            gameActive = false;
            statusMessage.textContent = `It's a tie!`;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    };

    const handleRestart = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = '';
        });
    };

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const cellIndex = parseInt(cell.getAttribute('data-index'));
            handleCellClick(cellIndex);
        });
    });

    restartButton.addEventListener('click', handleRestart);
});
