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
                message.textContent = `${currentPlayer === 'X' ? 'Player X' : 'Computer'} wins!`;
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

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerMove = emptyCells[randomIndex];

        gameBoard[computerMove] = "O";
        board.children[computerMove].textContent = "O";

        if (checkWinner()) {
            message.textContent = "Computer wins!";
        } else if (gameBoard.every(cell => cell !== "")) {
            message.textContent = "It's a tie!";
        } else {
            currentPlayer = "X";
            message.textContent = "Player X's turn";
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                highlightWinnerCells(pattern);
                return true;
            }
        }
        return false;
    }

    function highlightWinnerCells(pattern) {
        for (const index of pattern) {
            board.children[index].style.backgroundColor = "#9effa0";
        }
    }
});
