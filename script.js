let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
const winningMessage = () => `بازیکن ${currentPlayer} برنده شد!`;
const drawMessage = () => `بازی مساوی شد!`;
const currentPlayerTurn = () => `نوبت بازیکن ${currentPlayer}`;

const cells = document.querySelectorAll(".cell");
const messageElement = document.getElementById("message");
const resetButton = document.getElementById("resetButton");

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

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (board[clickedCellIndex] !== "" || !isGameActive || currentPlayer !== "X") {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    validateResult();
    if (isGameActive) {
        handleAIMove();
    }
}

function handleAIMove() {
    const emptyCells = board.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = "O";
    cells[randomIndex].textContent = "O";
    validateResult();
}

function validateResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageElement.textContent = winningMessage();
        isGameActive = false;
        return;
    }

    let roundDraw = !board.includes("");
    if (roundDraw) {
        messageElement.textContent = drawMessage();
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageElement.textContent = currentPlayerTurn();
}

function handleRestartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    messageElement.textContent = currentPlayerTurn();
    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", handleRestartGame);

messageElement.textContent = currentPlayerTurn();