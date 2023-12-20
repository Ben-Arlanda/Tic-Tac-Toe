// X will go first and then click the sqaure with X then O will click. If X or O get three in a row they win. There will be multiple conditions in the 9 sqaures. When they win they can press new game which will reset the game. 


// 1. Declare variable for current player
// 2. Variable for cell elements 
// 3. Set up event listener for each cell 
// 2. Declare variable for reset/new game btn 
// 3. Write function for if else condition in each sqaure 
// 4. Function for new game 
// 5. function for game counter 

// variable to store X in current player 
let currentPlayer = 'X';

// store cell class into cellElements 
const cellElements = document.querySelectorAll('.cell');

// array of possible win combinations  
const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 8],
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
        alert(`Player ${currentPlayer} won!`);
        }
        if (currentPlayer === 'X') {
        currentPlayer = 'O';
        } else {
        currentPlayer = 'X';
        }
}
}
// function to execute when player wins by having 3 cells with X or O
function checkWin() {
    // loops through each element in winning combinations 
    for (const winningMove of winningMoves) {

    // extracts individual elements into three separate variables to store the index of winnings combinations array 0,1,2 
        const [cellIndex1, cellIndex2, cellIndex3] = winningMove;
    // DOM grabbing html cell ID content of cells which corresponds to each winning combination index in array
        const cell1Content = document.getElementById(`cell-${cellIndex1}`).textContent;
        const cell2Content = document.getElementById(`cell-${cellIndex2}`).textContent;
        const cell3Content = document.getElementById(`cell-${cellIndex3}`).textContent;
    // condition to compare each 3 cells are the same to declare winner 
        if (cell1Content !== '' && cell1Content === cell2Content && cell2Content === cell3Content) {
            // alert(`Player ${currentPlayer} won!`);
            return true;
        }
    }

    return false;
}



