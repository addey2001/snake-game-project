//constants 
const columns = 20
const rows = 20
const cellCount = columns * rows 
const playButton = document.querySelector('#playButton')
const cellElements = []
const scoreDisplay = document.getElementById('score')
const TimeDisplay = document.getElementById('time')
const board = document.getElementById('board')
const startPosition = [188,189,190]

//variables 
let currentPosition = startPosition
let snakeLength = 1 
let snakespeed = 1; // ms per move 
let foodPosition = null;
let gameOver = false;
let time = 0;
let score = 0;
let snake = [...startPosition]
let intervalId = null;
let timeIntervalId = null


//function
function addSnake() {
   const cell = cellElements[currentPosition]
   cell.classList.add('snake') // this adds the class 'snake' to the cell that is currently being used by the snake})
}
function createBoard () {
    for( let i = 0; i < cellCount; i++) { // used a loop 
    const cell = document.createElement('div'); // created a new div for cells
    cell.innerText = i;
    cell.dataset.index = i;// could have used id as well but dataset provides more information
    cell.style.width = `${100 / columns}%`; // for the columns 
    cell.style.height =`${100 / rows}%`;// 
    cell.classList.add('cell');
    cellElements.push(cell);
    board.appendChild(cell
    );
 }}
;

function placefoodRdm() {
   let idx
    idx = Math.floor(Math.random() * cellCount) // allows a random index to be found and this random index is used to determine where the food is placed
    snake.includes(idx)// this checks whether the snake contains the idx value, it returns true if it is found and false otherwise
        foodPosition = idx;
        updateBoard;

    }


function updateBoard() {
    cellElements.forEach(cell => cell.className = 'cell') // this resets each cell className to cell, and makes sure its in a default state removing any other classes that may have been there previously
snake.forEach(idx => cellElements[idx].classList.add('snake')) //iteratiing over array calling it 'snake' adding its classList to the cell
if (typeof foodPosition === 'number') {
    cellElements[foodPosition].classList.add('food')// this adds the name 'food' to each area where the food is randomly place onn the game board 
}

}

function moveSnake(event) {
    if (gameOver) return; // if the game is over, do not move the snake

    let head = startPosition[startPosition.length - 1]; // get the last element of the snake array
    let newHead = head; // initialize newHead to the current head position
    // Determine direction based on key pressed
    let currentPosition = [...snake]; // make a copy of the current snake position
    
    
    if (event) {
        switch (event.key) {
            case 'ArrowUp':
                currentPosition -= columns; // move up
                break;
            case 'ArrowDown':
                currentPosition += columns; // move down
                break;
            case 'ArrowLeft':
                currentPosition -= 1; // move left
                break;
            case 'ArrowRight':
                currentPosition += 1; // move right
                break;
        }
    } else {
        // Default movement to the right if no event is provided
        newHead += 1;
    }

    // Check for collisions with walls or self
    if (
        newHead < 0 || 
        newHead >= cellCount || 
        (newHead % columns === 0 && head % columns === columns - 1) || 
        (newHead % columns === columns - 1 && head % columns === 0) ||
        snake.includes(newHead) // check if the new head collides with the snake itself
    ) {
        gameOver = true;
        clearInterval(intervalId);
        clearInterval(timeIntervalId);
        alert('Game Over! Your score: ' + score);
        return;
    }

    // Add new head to the snake
    currentPosition.push(newHead);
    snake.push(newHead);

    // Check for food consumption
    if (newHead === foodPosition) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        snakeLength++;
        placefoodRdm(); // Place new food after eating
    } else {
        // Remove tail if not eating food
        const tail = currentPosition.shift();
        const tailIndex = snake.indexOf(tail);
        if (tailIndex > -1) {
            snake.splice(tailIndex, 1);
        }
    }

    updateBoard(); // Update the board after moving the snake
    currentPosition = [...snake]; // Update currentPosition to the new snake array

}
function startGame() {
    if
}



// Event Listeners
playButton.addEventListener('click',)


console.log(playButton)

// on page load 
createBoard()
moveSnake() 
placefoodRdm() 
updateBoard() 
