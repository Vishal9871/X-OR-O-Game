document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    board.addEventListener("click", handleCellClick);

    function handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = clickedCell.dataset.index;

        if (gameBoard[cellIndex] === "" && !checkWinner()) {
            gameBoard[cellIndex] = currentPlayer;
            clickedCell.textContent = currentPlayer;

            if (checkWinner()) {
                const winnerMessage = `${currentPlayer === 'X' ? 'Player X' : 'Computer'} wins!`;
                message.textContent = winnerMessage;
                const winningPattern = getWinningPattern();
                highlightWinnerCells(winningPattern);
            } else if (gameBoard.every(cell => cell !== "")) {
                message.textContent = "It's a tie!";
            } else {
                currentPlayer = "O";
                message.textContent = "Computer's turn";
                setTimeout(makeComputerMove, 1000); // Simulating a delay before the computer makes a move
            }
        }
    }

    function makeComputerMove() {
        const emptyCells = gameBoard.reduce((acc, cell, index) => {
            if (cell === "") {
                acc.push(index);
            }
            return acc;
        }, []);

        let computerMove;

        // Check for a winning move
        for (const index of emptyCells) {
            const tempBoard = [...gameBoard];
            tempBoard[index] = "O";
            if (checkWinner(tempBoard, "O")) {
                computerMove = index;
                break;
            }
        }

        // If no winning move, check for a blocking move
        if (!computerMove) {
            for (const index of emptyCells) {
                const tempBoard = [...gameBoard];
                tempBoard[index] = "X";
                if (checkWinner(tempBoard, "X")) {
                    computerMove = index;
                    break;
                }
            }
        }

        // If neither winning nor blocking move, take the center or a random empty cell
        if (!computerMove) {
            const corners = emptyCells.filter(cell => [0, 2, 6, 8].includes(cell));
            computerMove = corners.length > 0 ? corners[0] : emptyCells[0];
        }

        gameBoard[computerMove] = "O";
        board.children[computerMove].textContent = "O";

        if (checkWinner()) {
            message.textContent = "Computer wins!";
            highlightWinnerCells(getWinningPattern());
        } else if (gameBoard.every(cell => cell !== "")) {
            message.textContent = "It's a tie!";
        } else {
            currentPlayer = "X";
            message.textContent = "Player X's turn";
        }
    }

    function checkWinner(boardState = gameBoard, player = currentPlayer) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] === player && boardState[b] === player && boardState[c] === player) {
                return true;
            }
        }
        return false;
    }

    function getWinningPattern() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer) {
                return pattern;
            }
        }
        return null;
    }

    function highlightWinnerCells(pattern) {
        if (pattern) {
            for (const index of pattern) {
                board.children[index].style.backgroundColor = "#9effa0";
            }
        }
    }
});
