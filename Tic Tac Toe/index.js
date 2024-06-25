 
document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById('bgMusic');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('res');
    const musicToggleButton = document.getElementById('musicToggle');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let isMusicPlaying = true;

    // Function to start playing background music
    function startBackgroundMusic() {
        bgMusic.play();
        isMusicPlaying = true;
    }

    // Function to stop playing background music
    function stopBackgroundMusic() {
        bgMusic.pause();
        bgMusic.currentTime = 0; // Reset music to the beginning
        isMusicPlaying = false;
    }

    // Start playing background music when the page loads
    startBackgroundMusic();

    // Toggle background music when the music toggle button is clicked
    musicToggleButton.addEventListener('click', () => {
        if (isMusicPlaying) {
            stopBackgroundMusic();
            musicToggleButton.innerText = 'Play Music';
        } else {
            startBackgroundMusic();
            musicToggleButton.innerText = 'Stop Music';
        }
    });

    // Game logic functions
    function handleCellPlayed(clickedCell, clickedCellIndex) {
        board[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            alert(`Player ${currentPlayer} has won!`);
            gameActive = false;
            return;
        }

        let roundDraw = !board.includes('');
        if (roundDraw) {
            alert('Game ended in a draw!');
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleRestartGame() {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        cells.forEach(cell => cell.innerHTML = '');
    }

    // Winning conditions
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleRestartGame);
});

