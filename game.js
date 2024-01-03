// Cells are empty then X will go first and then click the sqaure with X, then O will click. If X or O get three in a row they win. There will be multiple conditions in the 9 sqaures. When they win they can press new game which will reset the game. 


let currentPlayer = 'X'
let xScore = 0;
let oScore = 0;

// store cell class into cellElements 
const cellElements = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('.reset');
const resultElem = document.querySelector('#results');
const xScoreElem = document.querySelector('#X-score');
const oScoreElem = document.querySelector('#O-score');
const playerTurn = document.querySelector('.player-turn');

// array of possible win combinations  
const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]   
];

// for of loop to loop through each cell and add event listener 
for (const cellElem of cellElements) {
    cellElem.addEventListener('click', handleClick);
}

// function to execute click in each cell 
function handleClick(event) {
    
    const clickedCellelem = event.target;

    // if else condition checking if cell is empty then inputting current play and switching between X and O     
    if (clickedCellelem.textContent === '') {
        clickedCellelem.textContent = currentPlayer;
        playerTurn.textContent = currentPlayer === 'X' ? 'Player O turn' : 'Player X turn'
    
        // calling checkWin function after each move 
        if (checkWin()) {
        highlightWinCells();
        resultElem.textContent = (`${currentPlayer} wins!`);
       
        updateScore();    
            
        // disable cell if win
            disableCell();
        } else if (checkDraw()) {
            disableCell();
            resultElem.textContent = (`It's a draw!`);
        }
         currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    }
}

// check for a draw after no winning combinations 
function checkDraw(){
    for (const cellElem of cellElements)
    if (cellElem.textContent === '') {
        return false
    }
    return true
}

// function to execute when player wins by having 3 cells in a row with X or O
function checkWin() {
    // loops through each element in winning combinations 
    for (const winningMove of winningMoves) {
        const [a, b, c] = winningMove;
    if (cellElements[a].textContent !== '' && cellElements[a].textContent === cellElements[b].textContent && cellElements[a].textContent === cellElements[c].textContent) 
    { 
        
    // if (currentPlayer === 'X') {
    // xScore++;
    // xScoreElem.textContent = (`Player X: ${xScore}`);
    //     } else {
    //         oScore++;
    //         oScoreElem.textContent = (`Player O: ${oScore}`);
    //             }
          return [a,b,c];
        }
         
    }
    return false;
}

// function to reset the game
function resetGame() {
    //loop through cell elements 
    for (const cellElem of cellElements) {
        //reset the cells to empty string 
        cellElem.textContent = '';
        cellElem.style.backgroundColor = 'black'
    
        // add event listener again after cell disabled 
        cellElem.addEventListener('click', handleClick);
    }
    // reset result message 
    resultElem.textContent = '';
}
// Attach the resetGame function to resetBtn
resetBtn.addEventListener('click', resetGame);

//function to disbable the cells after win 
function disableCell() {
    for (const cellElem of cellElements) {
        cellElem.removeEventListener('click', handleClick);
    }
}

function highlightWinCells() {
    const winningCells = checkWin()
        if (winningCells) {
            for (const index of winningCells) {
            cellElements[index].style.backgroundColor = 'orange'
        }
    }
}

function updateScore() {
       if (currentPlayer === 'X') {
        xScore++;
        xScoreElem.textContent = (`Player X: ${xScore}`);
        } else {
        oScore++;
        oScoreElem.textContent = (`Player O: ${oScore}`);
    }
}