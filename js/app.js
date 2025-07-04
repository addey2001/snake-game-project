//constants 
const columns = 20
const rows = 20
const cellCount = columns * rows
const playButton = document.querySelector('#playButton')
const cellElements = []
const scoreDisplay = document.getElementById('score')
const TimeDisplay = document.getElementById('time')
const board = document.getElementById('board')
const startPosition = [188, 189, 190]
const finalScore = document.getElementById('final-score');
const finalTime = document.getElementById('final-time');
const gameOverElement = document.getElementById('game-over');

//variables 
let snakeLength = 1
let snakespeed = 1000; // ms per move 
let foodPosition = null;
let gameOver = false;
let time = 0;
let score = 0;
let snake = [...startPosition]
let intervalId = null;
let timeIntervalId = null;
let direction = 1; // 1 for right, -1 for left, columns for up, -columns for down


//function
function addSnake() {
    snake.forEach(idx => cellElements[idx].classList.add('snake')) //iteratiing over array calling it 'snake' adding its classList to the cell

}



function createBoard() {
    for (let i = 0; i < cellCount; i++) { // used a loop 
        const cell = document.createElement('div'); // created a new div for cells
        cell.dataset.index = i;// could have used id as well but dataset provides more information
        cell.style.width = `${100 / columns}%`; // for the columns 
        cell.style.height = `${100 / rows}%`;// 
        cell.classList.add('cell');
        cellElements.push(cell);
        board.appendChild(cell
        );
    }
}
;


function removeSnake() {
    cellElements.forEach(cell => cell.classList.remove('snake')) // this removes the snake from the board by iterating over each cell and removing the 'snake' class
    // this is done to ensure that the snake is not drawn over itself when it moves
}

function addFood() {
    cellElements.forEach(cell => cell.classList.remove('food')); // remove any existing food from the board
    if (foodPosition !== null) {
        cellElements[foodPosition].classList.add('food'); // add the food class to the cell at the foodPosition
    }
}

function placefoodRdm() {
    let idx
    do { idx = Math.floor(Math.random() * cellCount) }// allows a random index to be found and this random index is used to determine where the food is placed

    while (snake.includes(idx))// this checks whether the snake contains the idx value, it returns true if it is found and false otherwise
    foodPosition = idx;
    addFood()

}




function updateBoard() {
    addSnake()
    removeSnake()
    placefoodRdm()
}



function init() {
    createBoard();
    addSnake();
    placefoodRdm();
    updateBoard();
}
function changeDirection(event) {
    const keyPressed = event.key; // remove the snake from the board before moving it

    if (keyPressed === 'ArrowUp' && direction !== columns) {
        direction = -columns; // move up
    }
    else if (keyPressed === 'ArrowDown' && direction !== -columns) {
        direction = columns; // move down
    }
    else if (keyPressed === 'ArrowLeft' && direction !== 1) {
        direction = -1; // move left

    } else if (keyPressed === 'ArrowRight' && direction !== -1) {
        direction = 1; // move right
    }
    else {
        // Default movement to the right if no event is provided
        console.log('INVALID KEY PRESSED')
    }


}




function moveSnake() {
    let head = snake[snake.length - 1]; // get the last element of the snake array
    let newHead = head + direction; // initialize newHead to the current head position
    // Determine direction based on key pressed
    checkCollisions(newHead, head)
    console.log(gameOver)
    removeSnake();
    snake.push(newHead)
    snake.shift()
    addSnake()



}





document.addEventListener('keydown', changeDirection); // listen for keydown events to move the snake




















function endGame() {

    if (gameOver === true) {
        clearInterval(intervalId)
        clearInterval(timeIntervalId)
        playButton.disabled = false; // enable the play button again
        cellElements.forEach(cell => cell.classList.remove('snake', 'food')); // remove the snake and food from the board
        snake = [...startPosition]; // reset the snake to the starting position
        finalScore.textContent = score; // update the final score display
        finalTime.textContent = time; // update the final time display
        gameOverElement.classList.remove('hidden'); // show the game over element
        gameOverElement.style.display = 'block'; // make sure the game over element is visible


        console.log('Game Over bro! Your score is: ' + score + ' and time is: ' + time);


        console.log(playButton)

    }
}


function updateScore() {
    scoreDisplay.textContent = ` score: ${score}`;
}

function updateTime() {
    TimeDisplay.textContent = `Time: ${time}s`;

}
function speedIncrease() {
    snakespeed = Math.max(50, snakespeed - 100); // increase the speed of the snake by decreasing the interval time
    clearInterval(intervalId); // clear the previous interval
    intervalId = setInterval(moveSnake, snakespeed); // set a new interval with the
}








// Check for collisions with walls or self and also with food
function checkCollisions(newHead, head) {
    if (
        newHead < 0 ||
        newHead >= cellCount ||
        (newHead % columns === 0 && head % columns === columns - 1) ||
        (newHead % columns === columns - 1 && head % columns === 0) ||
        snake.includes(newHead)
    ) {
        gameOver = true
        endGame()

    }
    if (
        newHead === foodPosition) {
        score += 10; // increase the score by 10
        updateScore(); // update the score display
        snakeLength++; // increase the length of the snake
        snake.unshift(newHead); // add the new head to the snake array
        placefoodRdm(); // place food at a random position
        speedIncrease(); // increase the speed of the snake

    }
}


function startGame() {
    clearInterval(intervalId)
    clearInterval(timeIntervalId)
    gameOverElement.classList.add('hidden'); // hide the game over element if the game is not over
    gameOverElement.style.display = 'none'; // ensure the game over element is not visible


    snake = [...startPosition]
    score = 0
    time = 0;
    gameOver = false;
    snakespeed = 1000
    timeIntervalId = setInterval(() => {
        time++;
        updateTime();
    }, 1000); // update the time every second

    intervalId = setInterval(() => {
        moveSnake()
    }, snakespeed);
    placefoodRdm()
    updateTime()
    playButton.disabled = true;


}





// Event Listeners
playButton.addEventListener('click', startGame)


console.log(playButton)


//on page load 
init();
