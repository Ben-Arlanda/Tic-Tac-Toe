// Cells are empty then X will go first and then click the sqaure with X, then O will click. If X or O get three in a row they win. There will be multiple conditions in the 9 sqaures. When they win they can press new game which will reset the game. 


// variable to store array of players 
const players = ['X', 'O'];
// declaring currentplayer with array index 
let currentPlayer = players[0];
let xScore = 0;
let oScore = 0;

// store cell class into cellElements 
const cellElements = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('.reset');
const resultElem = document.querySelector('#results');

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
    const clickedCellElem = event.target;

    // if else condition checking if cell is empty then inputting current play and switching between X and O     
    if (clickedCellElem.textContent === '') {
        clickedCellElem.textContent = currentPlayer;

        // calling checkWin function after each move 
        if (checkWin()) {
            resultElem.textContent = (`${currentPlayer} wins!`);
        // disable cell if win
            disableCell();
        } else if (checkDraw()) {
            disableCell();
            resultElem.textContent = (`It's a draw!`);
        }

        // if else condition to switch between the current player array index 
        if (currentPlayer === players[0]) {
            currentPlayer = players[1];
        } else {
            currentPlayer = players[0];
        }
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

    // extracts individual elements into three separate variables to store the index of winnings combinations array 
        const [cellIndex1, cellIndex2, cellIndex3] = winningMove;
    // DOM grabbing html cell ID content of cells which corresponds to each winning combination index in array
        const cell1Content = document.getElementById(`cell-${cellIndex1}`).textContent;
        const cell2Content = document.getElementById(`cell-${cellIndex2}`).textContent;
        const cell3Content = document.getElementById(`cell-${cellIndex3}`).textContent;
    
        // condition to compare each 3 cells are the same to declare winner 
        if (cell1Content !== '' && cell1Content === cell2Content && cell2Content === cell3Content) {
            //increments player score 
            if (currentPlayer === players[0]) {
                xScore++;
                // displays the score getting DOM id element 
                document.getElementById("X-score").textContent = `[X] ${xScore}`;
            } else {
                oScore++;
                document.getElementById("O-score").textContent = `[O] ${oScore}`;
            }

            return true;
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